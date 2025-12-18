'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Video, Sparkles, Box, Palette, Film, Megaphone } from 'lucide-react';

const services = [
  {
    icon: Video,
    title: 'Videography',
    description: 'Cinematic storytelling that captures your brand\'s essence',
    href: '/services#videography',
  },
  {
    icon: Sparkles,
    title: 'Animations',
    description: 'Dynamic motion graphics that bring your vision to life',
    href: '/services#animations',
  },
  {
    icon: Box,
    title: 'CGI',
    description: 'Photorealistic 3D visuals and immersive digital experiences',
    href: '/services#cgi',
  },
  {
    icon: Palette,
    title: 'UI/UX',
    description: 'Intuitive design that elevates user experiences',
    href: '/services#uiux',
  },
  {
    icon: Film,
    title: 'Reel Creation',
    description: 'Engaging short-form content optimized for social media',
    href: '/services#reels',
  },
  {
    icon: Megaphone,
    title: 'Media & Advertising',
    description: 'Strategic campaigns that drive results and engagement',
    href: '/services#media',
  },
];

export default function ServicesPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [50, 0, 0, -50]);

  return (
    <section
      ref={ref}
      className="relative py-32 bg-white"
    >
      <motion.div
        style={{ opacity, y }}
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
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive creative solutions tailored to elevate your brand
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link
                  href={service.href}
                  className="group block h-full p-8 bg-gray-50 border border-gray-200 hover:border-primary-red/50 transition-all duration-300 hover:bg-gray-100 rounded-lg"
                >
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-primary-red/20 flex items-center justify-center group-hover:bg-primary-red transition-colors duration-300 rounded-lg">
                      <Icon className="w-8 h-8 text-primary-red group-hover:text-white transition-colors" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-primary-red transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="flex items-center text-primary-red group-hover:translate-x-2 transition-transform">
                    <span className="text-sm font-semibold uppercase tracking-wider">Learn More</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-center mt-16"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-gray-300 hover:border-primary-red text-gray-900 hover:text-primary-red transition-all font-semibold uppercase tracking-wider"
          >
            View All Services
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

