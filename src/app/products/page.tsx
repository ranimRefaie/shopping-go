'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import SectionTitle from '@/components/SectionTitle';
import PageTitle from '@/components/PageTitle';
import { Product } from '@/store/CartContext';
import { getProducts } from '@/lib/getProducts';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const searchParams = useSearchParams();
  const search = searchParams.get('search')?.toLowerCase() || '';

  useEffect(() => {
    const fetchData = async () => {
      const all = await getProducts();
      setProducts(all);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!search) {
      setFiltered(products);
    } else {
      const result = products.filter((product) =>
        product.title.toLowerCase().includes(search)
      );
      setFiltered(result);
    }
  }, [search, products]);

  return (
    <>
      <PageTitle title="Products" />
      <div className="px-6 py-10 max-w-7xl mx-auto">
        <SectionTitle title={search ? `Results for "${search}"` : "Explore Our Products"} />
        {filtered.length === 0 ? (
          <p className="text-gray-500 mt-6">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
