import { getProducts } from '@/lib/getProducts';
import ProductCard from '@/components/ProductCard';
import SectionTitle from '@/components/SectionTitle';
import PageTitle from '@/components/PageTitle';
import { Product } from '@/store/CartContext'; // ✅ أضفنا النوع

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <>
      <PageTitle title="products" />
      <div className="px-6 py-10 max-w-7xl mx-auto">
        <SectionTitle title="Explore Our Products" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}
