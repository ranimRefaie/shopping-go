'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useCart } from '@/store/CartContext';
import PageTitle from '@/components/PageTitle';
import { ArrowLeft, Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { login } = useCart();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'test@test.com' && password === '123456') {
      login();
      router.push('/products');
    } else {
      setError('Invalid email or password');
    }
  };

  if (!mounted) return null;

  return (
    <>
      <PageTitle title="Login" />

<motion.div
  key={theme}
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.4 }}
  className="min-h-screen flex flex-col px-4"
>
  {/* Top Controls */}
  <div className="flex justify-between items-center py-4">
    <button
      onClick={() => router.push('/')}
      className="text-gray-600 dark:text-gray-300 hover:text-pink-500 transition cursor-pointer"
    >
      <ArrowLeft className="w-6 h-6" />
    </button>
    <motion.button
      key={theme}
      initial={{ rotate: -90, opacity: 0 }}
      animate={{ rotate: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className='cursor-pointer'
    >
      {theme === 'dark' ? (
        <Sun className="w-6 h-6 text-yellow-400" />
      ) : (
        <Moon className="w-6 h-6 text-gray-500" />
      )}
    </motion.button>
  </div>

  {/* Centered Form */}
  <div className="flex-1 flex items-center justify-center">
    <form
      onSubmit={handleLogin}
      className={`${theme === 'dark' ? 'bg-zinc-900 text-gray-200 border-zinc-700' : 'bg-white text-gray-800 border-zinc-300'} p-8 rounded-2xl shadow-lg w-full max-w-md border`}
    >
      <h2 className="text-3xl font-bold mb-6 text-center text-pink-600 dark:text-pink-400">
        Hello again
      </h2>

      {error && (
        <div className="mb-4 text-red-500 text-sm text-center">{error}</div>
      )}

      <div className="mb-4">
        <label className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} block mb-1 text-sm font-medium`}>
          Email
        </label>
        <input
          type="email"
          className={`${theme === 'dark' ? 'bg-zinc-700 text-white' : 'bg-gray-50 border-zinc-300'} w-full px-4 py-2 border rounded-lg  focus:outline-none focus:ring-2 focus:ring-pink-500`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="test@test.com"
          required
        />
      </div>

      <div className="mb-6">
        <label className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} block mb-1 text-sm font-medium`}>
          Password
        </label>
        <input
          type="password"
          className={`${theme === 'dark' ? 'bg-zinc-700 text-white' : 'bg-gray-50 border-zinc-300'} w-full px-4 py-2 border rounded-lg  focus:outline-none focus:ring-2 focus:ring-pink-500`}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="123456"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 rounded-lg transition"
      >
        Login
      </button>
    </form>
  </div>
</motion.div>

    </>
  );
}
