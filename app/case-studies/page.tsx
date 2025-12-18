'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

// Dummy case study data
const caseStudies = [
  {
    id: 1,
    title: 'Luxury Fashion Brand Transformation',
    client: 'Premium Fashion House',
    category: 'Videography',
    thumbnail: '/api/placeholder/800/450',
    excerpt: 'A complete brand transformation through cinematic storytelling that elevated market presence by 300%.',
    results: ['300% increase in engagement', '2M+ video views', '50% boost in sales'],
  },
  {
    id: 2,
    title: 'Tech Product Launch Campaign',
    client: 'Innovation Tech Corp',
    category: 'Animation & CGI',
    thumbnail: '/api/placeholder/800/450',
    excerpt: 'Revolutionary product launch using cutting-edge 3D animation and visual effects that captured global attention.',
    results: ['5M+ impressions', '1M+ product views', '200% ROI'],
  },
  {
    id: 3,
    title: 'Social Media Viral Campaign',
    client: 'Lifestyle Brand',
    category: 'Reel Creation',
    thumbnail: '/api/placeholder/800/450',
    excerpt: 'Strategic reel series that went viral, generating millions of views and establishing brand as a trendsetter.',
    results: ['10M+ total views', '500K+ followers gained', 'Viral on 3 platforms'],
  },
  {
    id: 4,
    title: 'Corporate Documentary Series',
    client: 'Fortune 500 Company',
    category: 'Videography',
    thumbnail: '/api/placeholder/800/450',
    excerpt: 'In-depth documentary series showcasing company values and impact, strengthening stakeholder relationships.',
    results: ['95% positive feedback', 'Internal engagement up 150%', 'Award-winning content'],
  },
];

export default function CaseStudiesPage() {
  return (
    <div className="relative pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-4xl mx-auto px-6 lg:px-8 text-center"
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-8">
            Case <span className="text-primary-red">Studies</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
            Real results from real projects
          </p>
        </motion.div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link
                  href={`/case-studies/${study.id}`}
                  className="group block h-full"
                >
                  <div className="relative aspect-video bg-gray-100 border border-gray-200 overflow-hidden mb-6 rounded-lg">
                    {/* Placeholder for thumbnail */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-semibold uppercase tracking-wider shadow-sm rounded">
                        {study.category}
                      </span>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-primary-red/0 group-hover:bg-primary-red/20 transition-colors duration-300 flex items-center justify-center">
                      <ArrowRight className="w-12 h-12 text-gray-900 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-primary-red transition-colors">
                      {study.title}
                    </h3>
                    <p className="text-sm text-gray-900/40 mb-4 uppercase tracking-wider">
                      {study.client}
                    </p>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                      {study.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {study.results.map((result) => (
                        <span
                          key={result}
                          className="px-3 py-1 bg-gray-100 text-xs text-gray-700 rounded"
                        >
                          {result}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

