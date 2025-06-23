'use client';

import PageTitle from '@/components/PageTitle';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ArrowLeft, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      localStorage.setItem('isAdmin', 'true');
      router.push('/admin');
    } else {
      setError('Wrong password');
    }
  };

  if (!mounted) return null;

  return (
    <>
      <PageTitle title="admin-login" />
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
        <Sun className="w-6 h-6 text-yellow-400 " />
      ) : (
        <Moon className="w-6 h-6 text-gray-500" />
      )}
    </motion.button>
  </div>

  {/* Form Centered Vertically */}
  <div className="flex-1 flex items-center justify-center">
    <form
      onSubmit={handleLogin}
      className={`${theme === 'dark' ? 'bg-zinc-900 text-gray-200 border-zinc-700' : 'bg-white text-gray-800 border-zinc-300'} p-8 rounded-2xl shadow-lg w-full max-w-md border`}
    >
      <h2 className="text-3xl font-bold mb-6 text-center text-pink-600 dark:text-pink-400">
        Admin Access
      </h2>

      <input
        type="password"
        placeholder="admin123"
        className={`${theme === 'dark' ? 'border-zinc-600 bg-zinc-700 text-white' : 'border-gray-300'} w-full mb-4 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-pink-500`}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {error && (
        <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
      )}

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
