'use client';

import { useTheme } from 'next-themes';

export default function SectionTitle({ title }: { title: string }) {
  const { theme } = useTheme();

  const textColor = theme === 'dark' ? 'text-gray-100' : 'text-gray-800';

  return (
    <h2 className={`text-2xl font-bold mb-6 ${textColor}`}>
      {title}
    </h2>
  );
}