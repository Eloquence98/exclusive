"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email) {
      // Mock submission
      setIsSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section className="overflow-hidden bg-primary py-24 text-white md:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Overline */}
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-500">
            Newsletter
          </p>

          {/* Heading */}
          <h2 className="mb-4 text-3xl font-medium tracking-tight md:text-4xl">
            Join the club.
          </h2>

          {/* Subtitle */}
          <p className="mx-auto mb-10 max-w-md text-base leading-relaxed text-zinc-400">
            Subscribe for early access to new collections, exclusive offers, and
            styling inspiration.
          </p>

          {/* Form */}
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-3 text-emerald-400"
            >
              <CheckCircle2 className="h-5 w-5" />
              <span className="text-sm font-medium">
                Welcome to the club. Check your inbox.
              </span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="mx-auto w-full max-w-md">
              {/* Unified Pill Input Group */}
              <div className="flex items-center rounded-full border border-zinc-700 bg-zinc-800 p-1.5 transition-colors focus-within:border-zinc-500">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11 flex-1 border-0 bg-transparent px-4 text-white placeholder:text-zinc-500 focus-visible:ring-0 focus-visible:ring-offset-0"
                  aria-label="Email address"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="h-9 w-9 shrink-0 rounded-full bg-white text-primary hover:bg-zinc-200"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>

              <p className="mt-4 text-xs text-zinc-600">
                No spam, ever. Unsubscribe at any time.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
