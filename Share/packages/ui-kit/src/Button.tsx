// shared/packages/ui-kit/src/Button.tsx

import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      className="bg-primary px-4 py-2 rounded-xl"
      {...props}
    >
      {children}
    </button>
  );
}