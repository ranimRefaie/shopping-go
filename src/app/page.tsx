'use client';
import CategorySection from '@/components/CategorySection';
import FeaturedProducts from '@/components/FeaturedProducts';
import PageTitle from '@/components/PageTitle';
import { useEffect } from 'react';


export default function HomePage() {
  useEffect(() => {
    document.title = 'Shopping Go | Home';
  }, []);
  return (  
   <>
    <PageTitle title="Home" />
    <main className="px-4 py-8 max-w-7xl mx-auto">   
      <CategorySection />
      <FeaturedProducts />
    </main>
   </>
  );
}