// shared/packages/ui-kit/src/admin/components/ChartCard.tsx
"use client";

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
}

export default function ChartCard({ title, children }: ChartCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">{title}</h3>
      {children}
    </div>
  );
}