'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useTheme } from 'next-themes';
import ProductCard from '@/components/ProductCard';
import PageTitle from '@/components/PageTitle';


type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
  quantity: number;
};

export default function CategoryPage() {
  const { category } = useParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch('https://fakestoreapi.com/products');
        const data: Product[] = await res.json();
        const decodedCategory = decodeURIComponent(category as string);
        const filtered = data
          .filter((p) => p.category.toLowerCase() === decodedCategory.toLowerCase())
          .map((p) => ({ ...p, quantity: 1 }));
        setFilteredProducts(filtered);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category]);



  return (
    <>
      <PageTitle title={`${decodeURIComponent(category as string).replace(/'s/g, '’s')} Products`} />
      <div className="max-w-7xl mx-auto py-8 px-4">
        <h1
          className={`text-2xl font-bold mb-6 capitalize transition-colors duration-300 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}
        >
          {decodeURIComponent(category as string).replace(/'s/g, '’s')} Products
        </h1>
        {loading ? (
          <p className="dark:text-gray-300">Loading...</p>
        ) : filteredProducts.length === 0 ? (
          <p className="dark:text-gray-300">
            No products found for &quot;{decodeURIComponent(category as string)}&quot;
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

    </>
  );
}