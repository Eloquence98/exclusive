// "use client";

// import { cn } from "@/utils/utility";
// import { motion } from "framer-motion";
// import { ArrowUpRight } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { SectionHeader } from "./section-header";

// interface Category {
//   name: string;
//   slug: string;
//   description: string;
//   imageUrl: string;
// }

// const mockCategories: Category[] = [
//   {
//     name: "Men",
//     slug: "men",
//     description: "Tailored essentials and modern silhouettes.",
//     imageUrl:
//       "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop",
//   },
//   {
//     name: "Women",
//     slug: "women",
//     description: "Timeless elegance for every occasion.",
//     imageUrl:
//       "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1200&auto=format&fit=crop",
//   },
//   {
//     name: "Accessories",
//     slug: "accessories",
//     description: "The finishing touches. Leather goods, eyewear, and more.",
//     imageUrl:
//       "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1200&auto=format&fit=crop",
//   },
// ];

// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.1,
//     },
//   },
// };

// const itemVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
//   },
// };

// export function CategoryBentoGrid() {
//   return (
//     // Alternating background: Off-white
//     <section className="bg-zinc-50 py-16 md:py-24 lg:py-32">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <SectionHeader overline="Explore" title="Shop by Category" />

//         {/*
//           Asymmetrical Bento Grid
//           Mobile: 1 column, stacked.
//           Desktop: 3 columns, 2 rows.
//           First item (Men) spans 2 columns and 2 rows (Large Square).
//           Next two items (Women, Accessories) stack in the remaining column.
//         */}
//         <motion.div
//           className="grid auto-rows-[300px] grid-cols-1 gap-4 md:auto-rows-[250px] md:grid-cols-3 md:grid-rows-2 md:gap-6 lg:auto-rows-[300px] lg:gap-8"
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: "-100px" }}
//         >
//           {mockCategories.map((category, index) => (
//             <motion.div
//               key={category.slug}
//               variants={itemVariants}
//               className={cn(
//                 "group relative overflow-hidden rounded-2xl",
//                 // First item (Men) is the large square on desktop
//                 index === 0 && "md:col-span-2 md:row-span-2",
//               )}
//             >
//               <Link
//                 href={`/shop/${category.slug}`}
//                 className="block h-full w-full"
//               >
//                 {/* Background Image with Hover Zoom */}
//                 <Image
//                   src={category.imageUrl}
//                   alt={category.name}
//                   fill
//                   className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
//                   sizes="(max-width: 768px) 100vw, 66vw"
//                 />

//                 {/* Dark Gradient Overlay at the bottom */}
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

//                 {/* Content Container */}
//                 <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
//                   <h3 className="mb-1 text-2xl font-medium tracking-tight text-white md:text-3xl">
//                     {category.name}
//                   </h3>
//                   <p className="mb-4 line-clamp-2 max-w-xs text-sm text-white/80">
//                     {category.description}
//                   </p>

//                   {/* Action Indicator */}
//                   <div className="flex translate-y-2 items-center gap-2 text-sm font-medium text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
//                     <span>Shop Now</span>
//                     <ArrowUpRight className="h-4 w-4" />
//                   </div>
//                 </div>
//               </Link>
//             </motion.div>
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   );
// }

"use client";

import { cn } from "@/utils/utility";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "./section-header";

interface Category {
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
}

const mockCategories: Category[] = [
  {
    name: "Men",
    slug: "men",
    description: "Tailored essentials and modern silhouettes.",
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Women",
    slug: "women",
    description: "Timeless elegance for every occasion.",
    imageUrl:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Accessories",
    slug: "accessories",
    description: "The finishing touches. Leather goods, eyewear, and more.",
    imageUrl:
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1200&auto=format&fit=crop",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export function CategoryBentoGrid() {
  return (
    <section className="bg-zinc-50 py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader overline="Explore" title="Shop by Category" />

        {/* 
          Responsive Layout:
          Mobile: Horizontal snap-scroll to prevent a massive vertical stack.
          Desktop: Asymmetrical CSS Grid (1 large square, 2 stacked rectangles).
        */}
        <motion.div
          className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 scrollbar-hide md:-mx-0 md:grid md:grid-cols-2 md:grid-rows-2 md:gap-6 md:overflow-visible md:px-0 md:pb-0 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {mockCategories.map((category, index) => (
            <motion.div
              key={category.slug}
              variants={itemVariants}
              className={cn(
                "group relative overflow-hidden rounded-2xl",
                // Mobile: Fixed width for horizontal scroll, 4:3 aspect ratio (Large rounded rectangles)
                "aspect-[4/3] min-w-[80vw] snap-start",
                // Desktop: Grid placement and sizing
                "md:min-w-0",
                index === 0
                  ? "md:row-span-2 md:aspect-square" // First item: Large Square spanning 2 rows
                  : "md:aspect-auto", // Other items: Rectangles filling remaining rows
              )}
            >
              <Link
                href={`/shop/${category.slug}`}
                className="block h-full w-full"
              >
                {/* Background Image with Hover Zoom */}
                <Image
                  src={category.imageUrl}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 80vw, 50vw"
                />

                {/* Dark Gradient Overlay at the bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Content Container */}
                <div className="absolute bottom-0 left-0 right-0 flex flex-col justify-end p-6 md:p-8">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-white/70">
                    Collection
                  </p>
                  <h3 className="mb-2 text-2xl font-medium tracking-tight text-white md:text-3xl">
                    {category.name}
                  </h3>
                  <p className="mb-4 line-clamp-2 max-w-xs text-sm text-white/80">
                    {category.description}
                  </p>

                  {/* Action Indicator */}
                  <div className="flex translate-y-4 items-center gap-2 text-sm font-medium text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <span>Shop Now</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
