'use client';
import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import Link from 'next/link';
import SectionTitle from './SectionTitle';
import { Product } from '@/store/CartContext';

type Props = {
  searchQuery?: string;
};

const FeaturedProducts = ({ searchQuery = '' }: Props) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products?limit=8')
      .then(res => res.json())
      .then(data => {
        const filtered = searchQuery
          ? data.filter((p: Product) =>
              p.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
          : data;

        setProducts(filtered);
      });
  }, [searchQuery]);

  return (
    <section>
      <SectionTitle title={searchQuery ? `Results for "${searchQuery}"` : 'Best Sellers'} />
      {products.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-300">No products found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {!searchQuery && (
            <div className="text-center mt-8">
              <Link href="/products" className="p-3 rounded-xl bg-pink-500 text-white hover:bg-pink-600 transition">
                Show more products
              </Link>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default FeaturedProducts;
