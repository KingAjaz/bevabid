'use client';

import { use } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Play } from 'lucide-react';

// Dummy case study data - in production, fetch from Supabase
const caseStudyData: Record<number, any> = {
  1: {
    id: 1,
    title: 'Luxury Fashion Brand Transformation',
    client: 'Premium Fashion House',
    category: 'Videography',
    year: '2024',
    overview: 'A comprehensive brand transformation project that redefined how a luxury fashion house communicates with its audience through cinematic storytelling.',
    problem: 'The brand struggled with outdated visual communication that failed to resonate with younger demographics. Their existing content lacked the emotional connection and cinematic quality needed to compete in the modern luxury market.',
    solution: 'We developed a complete visual identity overhaul, creating a series of cinematic brand films that told the brand\'s story through emotional narratives. Our approach combined high-end videography with strategic storytelling, focusing on authenticity and luxury aesthetics.',
    outcome: 'The campaign achieved unprecedented success, with engagement rates increasing by 300%, video views reaching over 2 million, and a 50% boost in sales during the campaign period. The brand successfully repositioned itself as a modern luxury leader.',
    results: [
      { metric: 'Engagement Increase', value: '300%' },
      { metric: 'Video Views', value: '2M+' },
      { metric: 'Sales Boost', value: '50%' },
      { metric: 'Brand Awareness', value: '+180%' },
    ],
    videos: [
      { title: 'Brand Film', url: '#' },
      { title: 'Behind the Scenes', url: '#' },
    ],
  },
  2: {
    id: 2,
    title: 'Tech Product Launch Campaign',
    client: 'Innovation Tech Corp',
    category: 'Animation & CGI',
    year: '2024',
    overview: 'A revolutionary product launch using cutting-edge 3D animation and visual effects that captured global attention.',
    problem: 'The client needed to explain a complex technological product in an accessible way while maintaining excitement and innovation. Traditional marketing approaches failed to communicate the product\'s revolutionary nature.',
    solution: 'We created a series of stunning 3D animations and CGI visuals that simplified complex concepts while showcasing the product\'s innovative features. The campaign used photorealistic renders and dynamic motion graphics to create an immersive experience.',
    outcome: 'The campaign generated over 5 million impressions, with 1 million product views in the first week. The ROI exceeded 200%, and the product launch became one of the most successful in the company\'s history.',
    results: [
      { metric: 'Impressions', value: '5M+' },
      { metric: 'Product Views', value: '1M+' },
      { metric: 'ROI', value: '200%' },
      { metric: 'Media Coverage', value: '150+ outlets' },
    ],
    videos: [
      { title: 'Product Launch Video', url: '#' },
      { title: 'Feature Explainer', url: '#' },
    ],
  },
  3: {
    id: 3,
    title: 'Social Media Viral Campaign',
    client: 'Lifestyle Brand',
    category: 'Reel Creation',
    year: '2024',
    overview: 'Strategic reel series that went viral, generating millions of views and establishing brand as a trendsetter.',
    problem: 'The brand needed to break through the noise on social media platforms and establish a strong presence among Gen Z and Millennial audiences. Their existing content failed to gain traction.',
    solution: 'We developed a data-driven reel strategy that combined trend analysis with authentic brand storytelling. Our team created a series of engaging short-form videos optimized for Instagram, TikTok, and YouTube Shorts.',
    outcome: 'The campaign achieved viral status with over 10 million total views across platforms. The brand gained 500,000 new followers and established itself as a trendsetter in the lifestyle space.',
    results: [
      { metric: 'Total Views', value: '10M+' },
      { metric: 'New Followers', value: '500K+' },
      { metric: 'Viral Platforms', value: '3' },
      { metric: 'Engagement Rate', value: '12%' },
    ],
    videos: [
      { title: 'Top Performing Reel', url: '#' },
      { title: 'Campaign Compilation', url: '#' },
    ],
  },
  4: {
    id: 4,
    title: 'Corporate Documentary Series',
    client: 'Fortune 500 Company',
    category: 'Videography',
    year: '2024',
    overview: 'In-depth documentary series showcasing company values and impact, strengthening stakeholder relationships.',
    problem: 'The company needed to communicate its values and social impact to stakeholders, employees, and the public. Traditional corporate communications lacked authenticity and emotional resonance.',
    solution: 'We produced a comprehensive documentary series that told the company\'s story through the voices of employees, partners, and communities impacted by their work. The series combined cinematic videography with authentic storytelling.',
    outcome: 'The documentary series received 95% positive feedback from stakeholders and increased internal engagement by 150%. The content won multiple industry awards and strengthened the company\'s reputation.',
    results: [
      { metric: 'Positive Feedback', value: '95%' },
      { metric: 'Internal Engagement', value: '+150%' },
      { metric: 'Awards Won', value: '3' },
      { metric: 'Stakeholder Views', value: '500K+' },
    ],
    videos: [
      { title: 'Documentary Trailer', url: '#' },
      { title: 'Full Series', url: '#' },
    ],
  },
};

export default function CaseStudyPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const caseStudy = caseStudyData[parseInt(resolvedParams.id)];

  if (!caseStudy) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">Case Study Not Found</h1>
          <Link href="/case-studies" className="text-primary-red hover:underline">
            Back to Case Studies
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-4xl mx-auto px-6 lg:px-8 text-center"
        >
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-red transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Case Studies
          </Link>
          <div className="mb-6">
            <span className="px-3 py-1 bg-primary-red/20 text-primary-red text-xs font-semibold uppercase tracking-wider">
              {caseStudy.category}
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900">
            {caseStudy.title}
          </h1>
          <p className="text-lg text-gray-600">
            {caseStudy.client} • {caseStudy.year}
          </p>
        </motion.div>
      </section>

      {/* Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Overview</h2>
            <p className="text-lg text-gray-700 leading-relaxed">{caseStudy.overview}</p>
          </motion.div>
        </div>
      </section>

      {/* Problem */}
      <section className="py-16 bg-gradient-to-b from-black to-black">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-primary-red">The Challenge</h2>
            <p className="text-lg text-gray-700 leading-relaxed">{caseStudy.problem}</p>
          </motion.div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Solution</h2>
            <p className="text-lg text-gray-700 leading-relaxed">{caseStudy.solution}</p>
          </motion.div>
        </div>
      </section>

      {/* Results */}
      <section className="py-16 bg-gradient-to-b from-black to-black">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold mb-6 text-primary-red">The Results</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">{caseStudy.outcome}</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {caseStudy.results.map((result: any, index: number) => (
              <motion.div
                key={result.metric}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="p-6 bg-gray-50 border border-gray-200 text-center rounded-lg"
              >
                <div className="text-3xl font-bold text-primary-red mb-2">{result.value}</div>
                <div className="text-sm text-gray-600 uppercase tracking-wider">{result.metric}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Videos */}
      {caseStudy.videos && caseStudy.videos.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-3xl font-bold mb-8 text-gray-900"
            >
              Featured Videos
            </motion.h2>
            <div className="space-y-8">
              {caseStudy.videos.map((video: any, index: number) => (
                <motion.div
                  key={video.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="relative aspect-video bg-gray-100 border border-gray-200 rounded-lg"
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Play className="w-16 h-16 text-primary-red mx-auto mb-4" />
                      <p className="text-gray-600">{video.title}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

