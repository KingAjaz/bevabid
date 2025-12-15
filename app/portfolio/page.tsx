'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Filter } from 'lucide-react';
import VideoModal from '@/components/VideoModal';
import { supabase } from '@/lib/supabase';

const categories = ['All', 'Videography', 'Animation', 'CGI', 'Reels', 'UI/UX'];

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  thumbnail: string | null;
  videoUrl: string;
  description: string | null;
}

export default function PortfolioPage() {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedVideo, setSelectedVideo] = useState<PortfolioItem | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Fetch videos from Supabase
  useEffect(() => {
    async function fetchVideos() {
      try {
        const { data, error } = await supabase
          .from('videos')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching videos:', error);
          return;
        }

        // Transform Supabase data to match portfolio item structure
        const transformedData: PortfolioItem[] = (data || []).map((video) => ({
          id: video.id,
          title: video.title,
          category: video.category,
          thumbnail: video.thumbnail_url || '/api/placeholder/800/450',
          videoUrl: video.video_url,
          description: video.description || '',
        }));

        setPortfolioItems(transformedData);
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchVideos();
  }, []);

  const filteredItems =
    selectedCategory === 'All'
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === selectedCategory);

  if (loading) {
    return (
      <div className="relative pt-20 min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-900">Loading portfolio...</div>
      </div>
    );
  }

  return (
    <div className="relative pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto px-6 lg:px-8 text-center"
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-8 text-gray-900">
            Our <span className="text-primary-red">Portfolio</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
            A collection of our finest creative work
          </p>
        </motion.div>
      </section>

      {/* Filter Section */}
      <section className="py-12 bg-white border-b border-gray-200 sticky top-20 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-4">
            <Filter className="w-5 h-5 text-gray-600" />
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 text-sm font-semibold uppercase tracking-wider transition-all ${
                  selectedCategory === category
                    ? 'bg-primary-red text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  onClick={() => setSelectedVideo(item)}
                  className="group relative cursor-pointer overflow-hidden"
                >
                  <div className="relative aspect-video bg-white/5 overflow-hidden">
                    {/* Video thumbnail */}
                    {item.thumbnail && item.thumbnail !== '/api/placeholder/800/450' ? (
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-black/50" />
                    )}

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
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-semibold uppercase tracking-wider shadow-sm">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="mt-6">
                    <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-primary-red transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <VideoModal
            video={selectedVideo}
            onClose={() => setSelectedVideo(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

