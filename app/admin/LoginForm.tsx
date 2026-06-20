"use client";

import { useActionState } from "react";
import { login, type LoginState } from "./actions";

const initial: LoginState = {};

export function LoginForm() {
  const [state, action, pending] = useActionState(login, initial);

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <form action={action} className="w-full max-w-[320px]">
        <h1 className="font-display text-3xl font-light tracking-tight">
          Admin
        </h1>
        <p className="mt-2 text-sm" style={{ color: "var(--text-muted)" }}>
          Enter the passcode to continue.
        </p>
        <input
          type="password"
          name="passcode"
          autoFocus
          autoComplete="current-password"
          placeholder="Passcode"
          className="mt-6 w-full rounded-md border bg-transparent px-3 py-2.5 text-[15px] outline-none focus:border-[var(--accent)]"
          style={{ borderColor: "var(--border)" }}
        />
        {state.error && (
          <p className="mt-2 text-sm" style={{ color: "#b91c1c" }}>
            {state.error}
          </p>
        )}
        <button
          type="submit"
          disabled={pending}
          className="mt-4 w-full rounded-md px-3 py-2.5 text-[15px] font-medium text-white transition-opacity disabled:opacity-50"
          style={{ backgroundColor: "var(--accent)" }}
        >
          {pending ? "Checking…" : "Enter"}
        </button>
      </form>
    </div>
  );
}
