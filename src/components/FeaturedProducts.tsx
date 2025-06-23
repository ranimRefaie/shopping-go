'use client';
import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import Link from 'next/link';
import SectionTitle from './SectionTitle';
import { Product } from '@/store/CartContext'; // ✅ أضفنا النوع

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products?limit=8')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <section>
      <SectionTitle title="Best Sellers" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="text-center mt-8"> <Link href='/products' className='p-3 rounded-xl bg-pink-500'>Show more products</Link></div>
    </section>
  );
};

export default FeaturedProducts;