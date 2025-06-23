'use client';
import { useEffect } from 'react';

type PageTitleProps = {
  title: string;
};

export default function PageTitle({ title }: PageTitleProps) {
  useEffect(() => {
    document.title = `Shopping Go | ${title}`;
  }, [title]);

  return null;
}
