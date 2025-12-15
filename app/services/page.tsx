'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Video, Sparkles, Box, Palette, Film, Megaphone, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    id: 'videography',
    icon: Video,
    title: 'Videography',
    description: 'Cinematic storytelling that captures your brand\'s essence and engages your audience on an emotional level.',
    features: [
      'Commercial video production',
      'Brand documentaries',
      'Event coverage',
      'Product showcases',
      'Corporate communications',
      'Social media content',
    ],
    color: 'text-primary-red',
  },
  {
    id: 'animations',
    icon: Sparkles,
    title: 'Animations',
    description: 'Dynamic motion graphics and animated content that brings your vision to life with style and sophistication.',
    features: [
      '2D & 3D animations',
      'Motion graphics',
      'Explainer videos',
      'Animated logos',
      'Character animation',
      'Interactive animations',
    ],
    color: 'text-primary-red',
  },
  {
    id: 'cgi',
    icon: Box,
    title: 'CGI',
    description: 'Photorealistic 3D visuals and immersive digital experiences that push the boundaries of what\'s possible.',
    features: [
      '3D modeling & rendering',
      'Product visualization',
      'Architectural visualization',
      'Virtual environments',
      'VFX & compositing',
      'AR/VR experiences',
    ],
    color: 'text-primary-red',
  },
  {
    id: 'uiux',
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Intuitive, beautiful design that elevates user experiences and drives engagement across all platforms.',
    features: [
      'User interface design',
      'User experience research',
      'Prototyping & wireframing',
      'Design systems',
      'Mobile & web design',
      'Interaction design',
    ],
    color: 'text-primary-red',
  },
  {
    id: 'reels',
    icon: Film,
    title: 'Reel Creation',
    description: 'Engaging short-form content optimized for social media platforms that captures attention and drives engagement.',
    features: [
      'Instagram Reels',
      'TikTok content',
      'YouTube Shorts',
      'Social media campaigns',
      'Trend-based content',
      'Viral video production',
    ],
    color: 'text-primary-red',
  },
  {
    id: 'media',
    icon: Megaphone,
    title: 'Media & Advertising',
    description: 'Strategic campaigns that combine creative excellence with data-driven insights to deliver measurable results.',
    features: [
      'Campaign strategy',
      'Content creation',
      'Media planning',
      'Performance analytics',
      'Multi-channel campaigns',
      'Brand positioning',
    ],
    color: 'text-primary-red',
  },
];

export default function ServicesPage() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  return (
    <div className="relative pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto px-6 lg:px-8 text-center"
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-8 text-gray-900">
            Our <span className="text-primary-red">Services</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
            Comprehensive creative solutions tailored to elevate your brand
          </p>
        </motion.div>
      </section>

      {/* Services Grid */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="space-y-32">
            {services.map((service, index) => {
              const Icon = service.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={service.id}
                  id={service.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8 }}
                  className="scroll-mt-20"
                >
                  <div
                    className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${
                      !isEven ? 'lg:grid-flow-dense' : ''
                    }`}
                  >
                    <div className={!isEven ? 'lg:col-start-2' : ''}>
                      <div className="mb-8">
                        <div className="w-20 h-20 bg-primary-red/20 flex items-center justify-center mb-6">
                          <Icon className="w-10 h-10 text-primary-red" />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">{service.title}</h2>
                        <p className="text-xl text-gray-700 leading-relaxed mb-8">
                          {service.description}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        {service.features.map((feature) => (
                          <div
                            key={feature}
                            className="flex items-start gap-3 p-4 bg-gray-50 border border-gray-200"
                          >
                            <div className="w-1.5 h-1.5 bg-primary-red rounded-full mt-2 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className={!isEven ? 'lg:col-start-1 lg:row-start-1' : ''}>
                      <div className="relative aspect-video bg-gray-50 border border-gray-200">
                        {/* Placeholder for service visual */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-gray-300 text-xl">{service.title}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-b from-black to-black">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto px-6 lg:px-8 text-center"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-8 text-gray-900">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-700 mb-12">
            Let's discuss how we can bring your vision to life
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-10 py-5 bg-primary-red text-white font-semibold uppercase tracking-wider hover:bg-primary-red/90 transition-all duration-300"
          >
            Contact Us
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}

