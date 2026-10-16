"use client";

import { useActionState } from "react";
import { login } from "@/app/admin/actions";

export function LoginForm() {
  const [state, action, pending] = useActionState(login, null);
  return (
    <form action={action} className="glass mx-auto mt-10 max-w-sm space-y-5 rounded-2xl p-8">
      <div>
        <label htmlFor="pw" className="label-mono mb-2 block text-muted">
          Password
        </label>
        <input
          id="pw"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          autoFocus
          className="w-full rounded-xl border border-line-strong bg-surface px-4 py-3 outline-none focus:border-signature"
        />
      </div>
      {state?.error && (
        <p role="alert" className="text-sm text-red-400">
          {state.error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-signature py-3 font-medium text-signature-ink disabled:opacity-60"
      >
        {pending ? "Checking…" : "Sign in"}
      </button>
    </form>
  );
}
