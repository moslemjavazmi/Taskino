// shared/packages/ui-kit/src/Card.tsx

import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
}

export function Card({ children }: CardProps) {
  return (
    <div className="bg-surface p-6 rounded-2xl shadow-xl">
      {children}
    </div>
  );
}