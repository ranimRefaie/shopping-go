'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import CategorySection from '@/components/CategorySection';
import FeaturedProducts from '@/components/FeaturedProducts';
import PageTitle from '@/components/PageTitle';

export default function HomePage() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search')?.toLowerCase() || '';

  useEffect(() => {
    document.title = 'Shopping Go | Home';
  }, []);

  return (


      <main className="px-4 py-8 max-w-7xl mx-auto">
        <PageTitle title="Home" />
        {!searchQuery && <CategorySection />}
        <FeaturedProducts searchQuery={searchQuery} />
      </main>

  );
}
