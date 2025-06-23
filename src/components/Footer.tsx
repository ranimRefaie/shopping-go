import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="text-center py-4 text-sm text-gray-500 dark:text-gray-400 border-t dark:border-gray-700">
      <p>© 2025 ShoppingGo</p>
      <Link href="/admin-login" className="block mt-1 hover:underline">
        Admin Login
      </Link>
    </footer>
  );
}