'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center px-6"
      >
        <h1 className="text-8xl md:text-9xl font-bold mb-4 text-gray-900">404</h1>
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
          Page Not <span className="text-primary-red">Found</span>
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-primary-red text-white font-semibold uppercase tracking-wider hover:bg-primary-red/90 transition-all duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}

