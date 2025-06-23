'use client';

import React, { createContext, useContext, useState } from 'react';

export type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

type AdminProductContextType = {
  products: Product[];
  addProduct: (product: Product) => void;
  deleteProduct: (id: number) => void;
  updateProduct: (product: Product) => void;
};

const AdminProductContext = createContext<AdminProductContextType | undefined>(undefined);

export const AdminProductProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, title: 'Test Product', price: 99.99, image: './jewelry.jpg' },
  ]);

  const addProduct = (product: Product) => {
    setProducts((prev) => [...prev, product]);
  };

  const deleteProduct = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  return (
    <AdminProductContext.Provider value={{ products, addProduct, deleteProduct, updateProduct }}>
      {children}
    </AdminProductContext.Provider>
  );
};

export const useAdminProducts = () => {
  const context = useContext(AdminProductContext);
  if (!context) throw new Error('useAdminProducts must be used within AdminProductProvider');
  return context;
};