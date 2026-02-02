'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Filter, ArrowRight } from 'lucide-react';
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
          thumbnail: video.thumbnail_url || null,
          videoUrl: video.video_url,
          description: video.description || null,
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
          transition={{ duration: 0.4 }}
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
                className={`px-6 py-2 text-sm font-semibold uppercase tracking-wider transition-all ${selectedCategory === category
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
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12" // Increased gap to match case studies
            >
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 50 }} // Increased y offset to match case studies
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: index * 0.03 }}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  onClick={() => setSelectedVideo(item)}
                  className="group cursor-pointer block h-full" // Removed relative/overflow hidden from wrapper
                >
                  {/* Thumbnail Container - Matching Case Studies Style */}
                  <div className="relative aspect-video bg-gray-100 border border-gray-200 overflow-hidden mb-6 rounded-lg">
                    {/* Video Content / Image */}
                    <div className="relative w-full h-full">
                      {item.videoUrl && item.videoUrl !== '#' ? (
                        <video
                          src={item.videoUrl}
                          poster={item.thumbnail && item.thumbnail !== '/api/placeholder/800/450' ? item.thumbnail : undefined}
                          muted
                          loop
                          playsInline
                          className="absolute inset-0 w-full h-full object-cover"
                          style={{ pointerEvents: 'none' }}
                        />
                      ) : item.thumbnail && item.thumbnail !== '/api/placeholder/800/450' ? (
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300" />
                      )}
                    </div>

                    {/* Category Badge - Matching Case Studies Position */}
                    <div className="absolute top-4 left-4 z-20">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-semibold uppercase tracking-wider shadow-sm rounded">
                        {item.category}
                      </span>
                    </div>

                    {/* Hover Overlay - Matching Case Studies Style (Red tint + Icon) */}
                    <div className="absolute inset-0 bg-primary-red/0 group-hover:bg-primary-red/20 transition-colors duration-300 flex items-center justify-center z-10">
                      {/* Using Play instead of Arrow for videos, but keeping the transition style */}
                      <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-75 group-hover:scale-100">
                        <Play className="w-6 h-6 text-primary-red ml-1" fill="currentColor" />
                      </div>
                    </div>
                  </div>

                  {/* Content Container - Matching Case Studies Typography */}
                  <div>
                    <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-primary-red transition-colors">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-gray-700 mb-6 leading-relaxed line-clamp-3">
                        {item.description}
                      </p>
                    )}

                    {/* View Project Link - visual cue */}
                    <div className="flex items-center text-primary-red font-semibold uppercase tracking-wider text-sm opacity-60 group-hover:opacity-100 transition-opacity">
                      Watch Video <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
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
