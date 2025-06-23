'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import SectionTitle from './SectionTitle';

const categories = [
  { name: 'Men', image: '/men.jpg', apiCategory: "men's clothing" },
  { name: 'Women', image: '/womens.jpg', apiCategory: "women's clothing" },
  { name: 'Electronics', image: '/electronics.jpg', apiCategory: 'electronics' },
  { name: 'Jewelery', image: '/jewelry.jpg', apiCategory: 'jewelery' },
];

const CategorySection = () => {
  const router = useRouter();

  return (
    <section className="mb-12">
      <SectionTitle title="Shop by Category" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.name}
            onClick={() => router.push(`/${encodeURIComponent(cat.apiCategory)}`)}
            className="relative cursor-pointer rounded-xl overflow-hidden group shadow-md hover:scale-105 transition-transform"
          >
            {/* الصورة */}
            <Image
              src={cat.image}
              alt={cat.name}
              width={300}
              height={200}
              className="object-cover w-full h-40"
            />

            {/* الطبقة الشفافة */}
            <div className="absolute inset-0 bg-[#00000088] flex items-center justify-center">
              <span className="text-white text-lg font-bold tracking-wide group-hover:scale-105 transition-transform">
                {cat.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;