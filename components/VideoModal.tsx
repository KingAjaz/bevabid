'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect } from 'react';

interface VideoModalProps {
  video: {
    id: string | number;
    title: string;
    category: string;
    videoUrl: string;
    description: string | null;
  };
  onClose: () => void;
}

export default function VideoModal({ video, onClose }: VideoModalProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-white/95 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-6xl mx-4"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute -top-12 right-0 text-gray-900 hover:text-primary-red transition-colors z-10"
            aria-label="Close video"
          >
            <X size={32} />
          </button>

          {/* Video Container */}
          <div className="relative aspect-video bg-black">
            {video.videoUrl && video.videoUrl !== '#' ? (
              <video
                src={video.videoUrl}
                controls
                className="w-full h-full object-contain"
                autoPlay
              >
                Your browser does not support the video tag.
              </video>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-white/60 mb-4">{video.title}</p>
                  {video.description && <p className="text-sm text-white/40">{video.description}</p>}
                  <p className="text-xs text-white/30 mt-4">
                    Video URL not available
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Video Info */}
          <div className="mt-6 text-gray-900">
            <h3 className="text-2xl font-bold mb-2">{video.title}</h3>
            {video.description && <p className="text-gray-600">{video.description}</p>}
            <span className="inline-block mt-4 px-3 py-1 bg-primary-red/20 text-primary-red text-xs font-semibold uppercase tracking-wider">
              {video.category}
            </span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

