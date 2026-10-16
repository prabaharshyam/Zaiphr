/**
 * Shared, mutable state for the home WebGL scene.
 * Scroll code writes, the render loop reads - no React re-renders involved.
 *
 * morph: 0 = core, 1..7 = the seven service forms, 8 = core again.
 */
export const sceneState = {
  morph: 0,
  /** 0..1 - how visible the scene is (fades out after the services story). */
  opacity: 1,
  /** Extra burst applied during transitions, scaled by the shader. */
  scatter: 1.4,
  /** True while the canvas should render frames. */
  active: true,
};

export const FORM_COUNT = 9;
