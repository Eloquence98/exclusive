"use client";

import { motion, type Variants } from "motion/react";
import { RefreshCw, ShieldCheck, Truck, type LucideIcon } from "lucide-react";
import { SectionHeader } from "./section-header";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: Truck,
    title: "Complimentary Shipping",
    description:
      "Free global delivery on all orders over $100. Carefully packaged and shipped with priority.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Checkout",
    description:
      "Your data is protected with enterprise-grade encryption. Shop with complete peace of mind.",
  },
  {
    icon: RefreshCw,
    title: "Effortless Returns",
    description:
      "Not the perfect fit? Enjoy hassle-free returns within 30 days of your purchase.",
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

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export function WhyChooseUs() {
  return (
    // Alternating background: Pure white
    <section className="bg-background py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader overline="The Atelier Promise" title="Why Choose Us" />

        <motion.div
          className="mt-12 grid grid-cols-1 gap-12 md:mt-16 md:grid-cols-3 md:gap-8 lg:gap-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="flex flex-col"
            >
              {/* Icon Container */}
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-secondary bg-muted text-foreground">
                <feature.icon className="h-6 w-6" strokeWidth={1.5} />
              </div>

              {/* Text Content */}
              <h3 className="mb-3 text-lg font-medium tracking-tight text-foreground">
                {feature.title}
              </h3>
              <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
