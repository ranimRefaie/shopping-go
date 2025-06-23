'use client';

import PageTitle from '@/components/PageTitle';
import SectionTitle from '@/components/SectionTitle';
import { useCart } from '@/store/CartContext';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();
  const [isCheckout, setIsCheckout] = useState(false);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = () => {
    setIsCheckout(true);
    clearCart();

    setTimeout(() => {
      setIsCheckout(false);
    }, 3000);
  };

  return (
   <>
    <PageTitle title="my cart" />
    <div className="max-w-6xl mx-auto py-10">
        <SectionTitle title="Your Cart" />

      {isCheckout && (
        <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg text-center dark:bg-green-700 dark:text-white">
          Thank you for your order!
        </div>
      )}

      {cart.length === 0 && !isCheckout ? (
        <p className="text-center text-gray-600 dark:text-gray-400">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl shadow">
              <div className="flex items-center gap-4">
                <img src={item.image || item.image} alt={item.title} className="w-16 h-16 object-cover rounded-md" />
                <div>
                  <h2 className="font-semibold dark:text-white">{item.title}</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-300">${item.price} × {item.quantity}</p>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 />
              </button>
            </div>
          ))}

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-6">
            <p className="text-xl font-bold dark:text-green-600">Total: ${total.toFixed(2)}</p>
            <div className="flex gap-3">
              <button
                onClick={clearCart}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
              >
                Clear Cart
              </button>
              <button
                onClick={handleCheckout}
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
   </>
  );
}