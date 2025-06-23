'use client';
import { useCart } from '@/store/CartContext';
import ProductCard from '@/components/ProductCard';
import SectionTitle from '@/components/SectionTitle';
import PageTitle from '@/components/PageTitle';

export default function FavoritesPage() {
  const { favorites } = useCart();

  return (
    <>
    <PageTitle title="my favorite" />
    <main className="max-w-6xl mx-auto px-4 py-8">
      <SectionTitle title="Your Favorite Products" />

      {favorites.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No favorite products yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {favorites.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
    </>
  );
}