'use client';

import { Product } from '@/store/CartContext';
import { useCart } from '@/store/CartContext';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart } from 'lucide-react';
import { useTheme } from 'next-themes';

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
const { addToCart, favorites, toggleFavorite } = useCart();
  const { theme } = useTheme();

const isFavorite = favorites.some((fav) => fav.id === product.id);
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-2xl  shadow-2xs shadow-gray-300 border border-zinc-300 p-4 flex flex-col justify-between`}
    >
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <div className="flex flex-col flex-grow">
        <h2 className={`${theme === 'dark' ? 'text-white' : ''} text-lg font-semibold`}>{product.title}</h2>
        <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}  mb-2 line-clamp-2`}>{product.description}</p>
        <p className="font-bold text-blue-600">${product.price}</p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={i < Math.round(product.rating.rate) ? 'text-yellow-400' : 'text-gray-300'}
            >
              ★
            </span>
          ))}
          <span className="text-sm text-gray-500 ml-1">({product.rating.rate})</span>
        </div>

        {/* Action Icons */}
        <div className="flex justify-between items-center mt-auto">
          <button
            onClick={() => addToCart(product)}
            className="text-blue-600 hover:text-blue-800 transition"
            title="Add to Cart"
          >
            <ShoppingCart className="w-6 h-6" />
          </button>
         <button
  onClick={() => toggleFavorite(product)}
  className={`transition ${isFavorite ? 'text-pink-500' : 'text-gray-400 hover:text-pink-500'}`}
  title="Add to Favorites"
>
  <Heart className="w-6 h-6" />
</button>
        </div>
      </div>
    </motion.div>
  );
}