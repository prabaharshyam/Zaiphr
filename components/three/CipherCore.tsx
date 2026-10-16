"use client";
/* eslint-disable react-hooks/immutability -- three.js uniforms/attributes are mutated per frame by design */

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { sceneState } from "@/lib/scene-store";
import { FORM_COUNT, formLibrary } from "./forms";

const vertex = /* glsl */ `
  uniform float uTime;
  uniform float uMix;
  uniform float uScatter;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform float uScale;
  uniform vec3 uMouse;
  uniform float uMouseForce;
  uniform float uIntro;
  attribute vec3 aFrom;
  attribute vec3 aTo;
  attribute float aRand;
  varying float vAlpha;
  varying float vAccent;
  varying float vDepth;

  vec3 hash3(float n) {
    return fract(sin(vec3(n, n + 1.7, n + 3.1)) * vec3(43758.5453, 22578.1459, 19642.3490)) - 0.5;
  }

  void main() {
    // Staggered per-particle morph: each point leaves at a slightly different time.
    float t = clamp((uMix - aRand * 0.4) / 0.6, 0.0, 1.0);
    t = t * t * (3.0 - 2.0 * t);
    vec3 p = mix(aFrom, aTo, t);

    // Burst outward mid-transition, then re-form.
    float burst = sin(t * 3.14159265);
    vec3 dir = normalize(hash3(aRand * 917.0) + 1e-4);
    p += dir * burst * uScatter * (0.35 + aRand * 0.9);
    // Swirl during the burst
    float ang = burst * (aRand - 0.5) * 2.2;
    p.xz = mat2(cos(ang), -sin(ang), sin(ang), cos(ang)) * p.xz;

    // Intro: condense from a wide cloud into the form.
    p = mix(dir * (3.5 + aRand * 6.0), p, uIntro);

    // Breathing idle drift
    float ph = aRand * 60.0;
    p += 0.022 * vec3(sin(uTime * 0.9 + ph), cos(uTime * 0.7 + ph * 1.3), sin(uTime * 0.6 + ph * 0.7));

    // Cursor repulsion (model space)
    vec3 d = p - uMouse;
    float dist = length(d);
    p += normalize(d + 1e-4) * uMouseForce * smoothstep(1.1, 0.0, dist) * 0.55;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    // uScale shrinks points with the form on small screens, so they don't blur into each other.
    float size = uSize * uScale * (0.55 + aRand * 0.9) * (1.0 + burst * 0.6);
    gl_PointSize = size * uPixelRatio / -mv.z;

    vAccent = step(0.9, aRand);
    vAlpha = 0.6 + 0.4 * sin(uTime * 1.6 + ph);
    vDepth = clamp((-mv.z - 6.0) / 6.0, 0.0, 1.0);
  }
`;

const fragment = /* glsl */ `
  uniform float uOpacity;
  uniform float uScale;
  uniform vec3 uBase;
  uniform vec3 uAccent;
  varying float vAlpha;
  varying float vAccent;
  varying float vDepth;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float r = length(c);
    if (r > 0.5) discard;
    float core = smoothstep(0.5, 0.0, r);
    float glow = pow(core, 1.8);
    vec3 col = mix(uBase, uAccent, vAccent);
    // Smaller points on phones carry less light; lift them so the form stays as bright as desktop.
    float boost = 1.0 + (1.0 - uScale) * 0.9;
    float a = glow * vAlpha * uOpacity * boost * mix(1.0, 0.45, vDepth) * (vAccent > 0.5 ? 1.0 : 0.62);
    gl_FragColor = vec4(col * (1.0 + vAccent * 0.6), a);
  }
`;

const tmpV = new THREE.Vector3();
const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
const ray = new THREE.Raycaster();

export function CipherCore({ count }: { count: number }) {
  const points = useRef<THREE.Points>(null);
  const group = useRef<THREE.Group>(null);
  const { gl, size, camera } = useThree();
  const pointer = useRef({ x: 0, y: 0, active: false });
  const segment = useRef(-1);
  const smoothMorph = useRef(sceneState.morph);
  const intro = useRef(0);

  const lib = useMemo(() => formLibrary(count), [count]);

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(count * 3), 3));
    // Filled on the first frame with the forms actually in view.
    g.setAttribute("aFrom", new THREE.BufferAttribute(new Float32Array(count * 3), 3));
    g.setAttribute("aTo", new THREE.BufferAttribute(new Float32Array(count * 3), 3));
    g.setAttribute("aRand", new THREE.BufferAttribute(lib.rand, 1));
    g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 6);
    return g;
  }, [lib, count]);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: vertex,
        fragmentShader: fragment,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uTime: { value: 0 },
          uMix: { value: 0 },
          uScatter: { value: 0 },
          uSize: { value: 26 },
          uPixelRatio: { value: gl.getPixelRatio() },
          uScale: { value: 1 },
          uMouse: { value: new THREE.Vector3(99, 99, 0) },
          uMouseForce: { value: 0 },
          uIntro: { value: 0 },
          uOpacity: { value: 0 },
          uBase: { value: new THREE.Color("#dfe4f2") },
          uAccent: { value: new THREE.Color("#c8ff2e") },
        },
      }),
    [gl],
  );

  useEffect(() => () => {
    geometry.dispose();
    material.dispose();
  }, [geometry, material]);

  // Build the remaining forms one per idle slice, so scrolling never waits on them.
  useEffect(() => {
    let cancelled = false;
    let handle = 0;
    const idle = (cb: () => void) =>
      typeof window.requestIdleCallback === "function" ? window.requestIdleCallback(cb, { timeout: 2000 }) : window.setTimeout(cb, 120);
    const step = () => {
      if (cancelled) return;
      const next = Array.from({ length: FORM_COUNT }, (_, i) => i).find((i) => !lib.has(i));
      if (next === undefined) return;
      lib.get(next);
      handle = idle(step);
    };
    handle = window.setTimeout(() => (handle = idle(step)), 1500); // after the intro has started
    return () => {
      cancelled = true;
      window.clearTimeout(handle);
      if (typeof window.cancelIdleCallback === "function") window.cancelIdleCallback(handle);
    };
  }, [lib]);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
      pointer.current.active = e.pointerType === "mouse";
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const dt = Math.min(delta, 1 / 20);
    const u = material.uniforms;
    u.uTime.value += dt;

    // Intro: particles condense from a cloud into the core.
    intro.current = Math.min(1, intro.current + dt / 2.6);
    const introEase = 1 - Math.pow(1 - intro.current, 3);

    // Morph target, smoothed so scroll scrubbing never jitters.
    smoothMorph.current += (sceneState.morph - smoothMorph.current) * Math.min(1, dt * 6);
    const m = Math.max(0, Math.min(FORM_COUNT - 1.0001, smoothMorph.current));
    const seg = Math.floor(m);
    if (seg !== segment.current) {
      segment.current = seg;
      (geometry.getAttribute("aFrom") as THREE.BufferAttribute).copyArray(lib.get(seg)).needsUpdate = true;
      (geometry.getAttribute("aTo") as THREE.BufferAttribute).copyArray(lib.get(seg + 1)).needsUpdate = true;
    }
    u.uMix.value = m - seg;
    u.uScatter.value = sceneState.scatter;
    u.uIntro.value = introEase;
    u.uOpacity.value += (sceneState.opacity * introEase - u.uOpacity.value) * Math.min(1, dt * 5);

    // Layout: right of the copy on desktop, above it on mobile.
    const aspect = size.width / size.height;
    const desktop = aspect > 1.1;
    // Hero sits further right (clear of the headline); services pull it in a little.
    const heroMix = Math.min(1, Math.max(0, smoothMorph.current));
    const targetX = desktop ? Math.min(3.1, aspect * (1.6 - 0.3 * heroMix)) : 0;
    const targetY = desktop ? 0.15 : 1.05;
    g.position.x += (targetX - g.position.x) * Math.min(1, dt * 3);
    g.position.y += (targetY - g.position.y) * Math.min(1, dt * 3);
    const scale = groupScale(size);
    g.scale.setScalar(scale);
    u.uScale.value = scale;
    // Keep point sizes in step with the live pixel ratio (the performance monitor can change it).
    u.uPixelRatio.value = state.gl.getPixelRatio();

    // Pointer tilt + slow auto-rotation (bounded so flat forms never go edge-on).
    const t = state.clock.elapsedTime;
    const px = pointer.current.x;
    const py = pointer.current.y;
    g.rotation.y += (Math.sin(t * 0.25) * 0.35 + px * 0.35 - g.rotation.y) * Math.min(1, dt * 2);
    g.rotation.x += (Math.cos(t * 0.2) * 0.08 - py * 0.2 - g.rotation.x) * Math.min(1, dt * 2);

    // Cursor → model-space point on the z=0 plane
    if (pointer.current.active) {
      ray.setFromCamera(new THREE.Vector2(px, py), camera);
      if (ray.ray.intersectPlane(plane, tmpV)) {
        g.worldToLocal(tmpV);
        (u.uMouse.value as THREE.Vector3).lerp(tmpV, Math.min(1, dt * 8));
      }
      u.uMouseForce.value += (1 - u.uMouseForce.value) * Math.min(1, dt * 3);
    } else {
      u.uMouseForce.value *= 0.95;
    }
  });

  return (
    <group ref={group}>
      <points ref={points} geometry={geometry} material={material} frustumCulled={false} />
    </group>
  );
}

function groupScale(size: { width: number; height: number }) {
  const aspect = size.width / size.height;
  if (aspect > 1.1) return 1;
  return Math.max(0.5, Math.min(0.85, aspect * 1.3));
}
