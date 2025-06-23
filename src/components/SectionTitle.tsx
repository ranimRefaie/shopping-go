'use client';

import { useTheme } from 'next-themes';

export default function SectionTitle({ title }: { title: string }) {
  const { theme } = useTheme();

  return (
    <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
      {title}
    </h2>
  );
}