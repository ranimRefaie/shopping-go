'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useRef, useState } from 'react';
import { useCart } from '@/store/CartContext';
import {
  Heart,
  ShoppingCart,
  LogIn,
  LogOut,
  Moon,
  Sun,
  Menu,
  Search,
  X,
} from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';



const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const { cart, favorites, isLoggedIn, logout } = useCart();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setSearchOpen] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    setMounted(true);

    const handleClickOutside = (e: MouseEvent) => {
      if (
        sidebarRef.current &&
        !(sidebarRef.current as HTMLElement).contains(e.target as Node)
      ) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/');
    setSidebarOpen(false);
  };
const allowedPaths = [
    '/',
    '/products',
    '/jewelery',
    "/men's clothing",
    "/women's clothing",
    '/electronics',
  ];


  const decodedPath = decodeURIComponent(pathname || '');
  const showSearch = allowedPaths.includes(decodedPath);

  if (!mounted) return null;

  return (
    <header className={`shadow-md py-4 px-6 sticky top-0 z-50 transition-colors ${theme === 'dark' ? 'bg-zinc-900 text-gray-200' : 'bg-white text-gray-800'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        {!isSearchOpen && (
          <Link
            href="/"
            className="text-2xl font-bold text-pink-600 dark:text-pink-400"
          >
            ShoppingGo
          </Link>
        )}

         {/* Search input */}
        {isSearchOpen && showSearch ? (
  <input
    type="text"
    placeholder="Search products..."
    className="w-full px-4 py-2 rounded-lg focus:outline-none bg-gray-200 text-gray-600 placeholder:text-gray-400"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === 'Enter') {
        router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
        setSearchOpen(false);
        setSearchQuery('');
      }
    }}
  />
) : (
  <div className="hidden md:block w-1/3">
    {showSearch && (
      <input
        type="text"
        placeholder="Search products..."
        className="w-full px-4 py-2 rounded-lg focus:outline-none bg-gray-200 text-gray-600 placeholder:text-gray-400"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
            setSearchQuery('');
          }
        }}
      />
    )}
  </div>
)}


        {/* Right side */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Search button for small screens */}
          {showSearch && (
            <button
              className="md:hidden"
              onClick={() => setSearchOpen((prev) => !prev)}
            >
              {isSearchOpen ? (
                <X className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} w-6 h-6`} />
              ) : (
                <Search className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} w-6 h-6`} />
              )}
            </button>
          )}

           {/* Sidebar toggle for small screens */}
          {!isSearchOpen && (
            <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} w-6 h-6`} />
            </button>
          )}

          {/* Desktop icons */}
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn && (
              <>
                <div className="relative">
                  <Link href="/favorites" title="Favorites">
                    <Heart className="w-6 h-6 text-gray-600 dark:text-gray-300 hover:text-pink-500 transition" />
                    {favorites.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {favorites.length}
                      </span>
                    )}
                  </Link>
                </div>
                <div className="relative">
                  <Link href="/cart" title="Cart">
                    <ShoppingCart className="w-6 h-6 text-gray-600 dark:text-gray-300 hover:text-blue-500 transition" />
                    {cart.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                        {cart.length}
                      </span>
                    )}
                  </Link>
                </div>
              </>
            )}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="cursor-pointer"
            >
              {theme === 'dark' ? (
                <Sun className="w-6 h-6 text-yellow-400" />
              ) : (
                <Moon className="w-6 h-6 text-gray-600" />
              )}
            </button>
            {!isLoggedIn ? (
              <Link href="/login" title="Login">
                <LogIn className="w-6 h-6 text-gray-600 dark:text-gray-300 hover:text-green-500 transition" />
              </Link>
            ) : (
              <button onClick={handleLogout} title="Logout">
                <LogOut className="w-6 h-6 text-gray-600 dark:text-gray-300 hover:text-red-500 transition" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar for mobile */}
      {/* Sidebar for mobile */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside
            ref={sidebarRef}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3 }}
            className={`fixed top-0 right-0 w-64 h-full shadow-lg z-50 p-6 transition-colors
        ${theme === 'dark' ? 'bg-zinc-900 text-gray-300' : 'bg-white text-gray-700'}`}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold"></h3>
              <button onClick={() => setSidebarOpen(false)}>
                <X className="w-6 h-6 text-pink-500" />
              </button>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="flex items-center gap-3 mb-4 hover:text-pink-500 transition"
            >
              {theme === 'dark' ? <Sun /> : <Moon />}
              Toggle Theme
            </button>

            <hr className="my-4 border-gray-300 dark:border-zinc-700" />

            {/* Favorites and Cart - only if logged in */}
            {isLoggedIn && (
              <>
                <Link
                  href="/favorites"
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-3 mb-4 hover:text-pink-500 transition"
                >
                  <div className="relative mb-4">
                    <Link
                      href="/favorites"
                      onClick={() => setSidebarOpen(false)}
                      className="flex items-center gap-3 hover:text-pink-500 transition relative"
                    >
                      <div className="relative">
                        <Heart className="w-6 h-6" />
                        {favorites.length > 0 && (
                          <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {favorites.length}
                          </span>
                        )}
                      </div>
                      <span>Favorites</span>
                    </Link>
                  </div>


                </Link>

                <Link
                  href="/cart"
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-3 mb-4 hover:text-blue-500 transition"
                >
                  <div className="relative mb-4">
                    <Link
                      href="/cart"
                      onClick={() => setSidebarOpen(false)}
                      className="flex items-center gap-3 hover:text-blue-500 transition relative"
                    >
                      <div className="relative">
                        <ShoppingCart className="w-6 h-6" />
                        {cart.length > 0 && (
                          <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {cart.length}
                          </span>
                        )}
                      </div>
                      <span>Cart</span>
                    </Link>
                  </div>


                </Link>

                <hr className="my-4 border-gray-300 dark:border-zinc-700" />
              </>
            )}

            {/* Logout if logged in */}
            {/* تسجيل دخول / خروج */}
            {!isLoggedIn ? (
              <Link
                href="/login"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 hover:text-green-500 transition"
              >
                <LogIn />
                Login
              </Link>
            ) : (
              <button
                onClick={() => {
                  handleLogout();
                  setSidebarOpen(false);
                }}
                className="flex items-center gap-3 hover:text-red-500 transition"
              >
                <LogOut />
                Logout
              </button>
            )}

          </motion.aside>
        )}
      </AnimatePresence>

    </header>
  );
};
export default Navbar
