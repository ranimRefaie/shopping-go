'use client';

import { useAdminProducts } from '@/store/AdminProductContext';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { ArrowLeft, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';



export default function AdminDashboard() {
  const { products, addProduct, deleteProduct, updateProduct } = useAdminProducts();
  const [newTitle, setNewTitle] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newImage, setNewImage] = useState('');
  const [mounted, setMounted] = useState(false);

  const { theme, setTheme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAdd = () => {
    if (!newTitle || !newPrice) return;
    addProduct({
      id: Date.now(),
      title: newTitle,
      price: parseFloat(newPrice),
      image: newImage || 'https://via.placeholder.com/100',
    });
    setNewTitle('');
    setNewPrice('');
    setNewImage('');
  };

  const handleEdit = async (product: typeof products[0]) => {
    const { value: formValues } = await Swal.fire({
      title: 'Edit Product',
      html: `
    <input id="swal-input-title" class="swal2-input" placeholder="Title" value="${product.title}" />
    <input id="swal-input-price" class="swal2-input" placeholder="Price" type="number" value="${product.price}" />
    <input id="swal-input-image" class="swal2-input" placeholder="Image URL" value="${product.image}" />
  `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Save',
      cancelButtonText: 'Cancel',
      buttonsStyling: false,
      customClass: {
        confirmButton: 'bg-pink-600 hover:bg-pink-700 text-white font-semibold px-4 py-2 rounded mx-2',
        cancelButton: 'bg-gray-300 hover:bg-gray-400 text-black font-medium px-4 py-2 rounded mx-2',
      },
      preConfirm: () => {
        const title = (document.getElementById('swal-input-title') as HTMLInputElement).value;
        const price = parseFloat((document.getElementById('swal-input-price') as HTMLInputElement).value);
        const image = (document.getElementById('swal-input-image') as HTMLInputElement).value;

        if (!title || isNaN(price)) {
          Swal.showValidationMessage('Please enter valid title and price.');
          return;
        }

        return { title, price, image };
      },
    });


    if (formValues) {
      updateProduct({ ...product, ...formValues });
      Swal.fire('Updated!', 'Product updated successfully.', 'success');
    }
  };

  const handleDelete = (id: number) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This will remove the product.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(id);
        Swal.fire('Deleted!', 'Product removed.', 'success');
      }
    });
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen px-4 py-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
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

      <h2 className="text-2xl font-bold text-pink-600 dark:text-pink-400 text-center">
        Admin Dashboard
      </h2>

      {/* Add product section */}
      <div className="flex gap-2 flex-wrap justify-center">
        <input
          className="border p-2 rounded dark:bg-zinc-700 dark:text-white dark:border-zinc-600"
          placeholder="Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <input
          type="number"
          inputMode="decimal"
          step="any"
          className="appearance-none border p-2 rounded dark:bg-zinc-700 dark:text-white dark:border-zinc-600"
          placeholder="Price"
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          className="border p-2 rounded dark:bg-zinc-700 dark:text-white dark:border-zinc-600"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const imageUrl = URL.createObjectURL(file);
              setNewImage(imageUrl);
            }
          }}
        />

        <button
          onClick={handleAdd}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Add Product
        </button>
      </div>

      {/* Product list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-4 shadow-md hover:shadow-lg transition-shadow"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-40 object-cover rounded-xl mb-4"
            />
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-zinc-800 dark:text-white">
                {product.title}
              </h3>
              <p className="text-pink-600 dark:text-pink-400 font-medium">
                ${product.price.toFixed(2)}
              </p>
            </div>
            <div className="mt-4 flex gap-3">
              <button
                onClick={() => handleEdit(product)}
                className="flex-1 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-xl text-sm transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="flex-1 bg-zinc-300 hover:bg-zinc-400 text-zinc-800 px-4 py-2 rounded-xl text-sm transition dark:bg-zinc-600 dark:hover:bg-zinc-500 dark:text-white"
              >
                Delete
              </button>
            </div>
          </motion.div>

        ))}
      </div>
    </div>
  );
}
