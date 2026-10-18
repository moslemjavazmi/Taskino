// shared/packages/ui-kit/src/Input.tsx

import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input(props: InputProps) {
  return (
    <input
      className="w-full px-4 py-3 rounded-xl bg-surface"
      {...props}
    />
  );
}