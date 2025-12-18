'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { Play, ArrowRight } from 'lucide-react';

// Dummy video data - replace with Supabase data later
const featuredVideos = [
  {
    id: 1,
    title: 'Luxury Brand Campaign',
    category: 'Videography',
    thumbnail: '/api/placeholder/800/450',
    videoUrl: '#',
  },
  {
    id: 2,
    title: 'Product Launch Animation',
    category: 'Animation',
    thumbnail: '/api/placeholder/800/450',
    videoUrl: '#',
  },
  {
    id: 3,
    title: 'Architectural CGI',
    category: 'CGI',
    thumbnail: '/api/placeholder/800/450',
    videoUrl: '#',
  },
];

export default function FeaturedShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      ref={ref}
      className="relative py-32 bg-gradient-to-b from-white via-gray-50 to-white"
    >
      <motion.div
        style={{ opacity }}
        className="max-w-7xl mx-auto px-6 lg:px-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.4 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
            Featured Work
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A glimpse into our creative excellence
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredVideos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="group relative overflow-hidden cursor-pointer"
            >
              <div className="relative aspect-video bg-gray-100 overflow-hidden rounded-lg">
                {/* Placeholder for video thumbnail */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300" />
                
                {/* Play Button Overlay */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: hoveredIndex === index ? 1 : 0,
                    scale: hoveredIndex === index ? 1 : 0.8,
                  }}
                  className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm"
                >
                  <div className="w-20 h-20 rounded-full bg-primary-red flex items-center justify-center">
                    <Play className="w-8 h-8 text-white ml-1" fill="white" />
                  </div>
                </motion.div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-semibold uppercase tracking-wider shadow-sm rounded">
                    {video.category}
                  </span>
                </div>
              </div>

              {/* Title */}
              <div className="mt-6">
                <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-primary-red transition-colors">
                  {video.title}
                </h3>
                <div className="flex items-center text-primary-red opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm font-semibold uppercase tracking-wider">Watch</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-center mt-16"
        >
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-gray-300 hover:border-primary-red text-gray-900 hover:text-primary-red transition-all font-semibold uppercase tracking-wider"
          >
            View Full Portfolio
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

