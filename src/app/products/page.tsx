'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import PageTitle from '@/components/PageTitle';
import ProductCard from '@/components/ProductCard';
import SectionTitle from '@/components/SectionTitle';
import { Product } from '@/store/CartContext';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search')?.toLowerCase() || '';

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('https://fakestoreapi.com/products');
      const data = await res.json();
      const filtered = searchQuery
        ? data.filter((p: Product) =>
            p.title.toLowerCase().includes(searchQuery)
          )
        : data;
      setProducts(filtered);
    };
    fetchData();
  }, [searchQuery]);

  return (
    <>
      <PageTitle title="Products" />
      <div className="px-6 py-10 max-w-7xl mx-auto">
        <SectionTitle
          title={
            searchQuery ? `Results for "${searchQuery}"` : 'Explore Our Products'
          }
        />
        {products.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-300">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
