'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';
import Hyperspeed from '@/components/Hyperspeed';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const words = ['Cinematic', 'Bold', 'Luxury', 'Creative'];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Hyperspeed Animation Background */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <Hyperspeed
          effectOptions={useMemo(() => ({
            onSpeedUp: () => {},
            onSlowDown: () => {},
            distortion: 'turbulentDistortion',
            length: 400,
            roadWidth: 10,
            islandWidth: 2,
            lanesPerRoad: 4,
            fov: 90,
            fovSpeedUp: 150,
            speedUp: 2,
            carLightsFade: 0.4,
            totalSideLightSticks: 20,
            lightPairsPerRoadWay: 40,
            shoulderLinesWidthPercentage: 0.05,
            brokenLinesWidthPercentage: 0.1,
            brokenLinesLengthPercentage: 0.5,
            lightStickWidth: [0.12, 0.5],
            lightStickHeight: [1.3, 1.7],
            movingAwaySpeed: [60, 80],
            movingCloserSpeed: [-120, -160],
            carLightsLength: [400 * 0.03, 400 * 0.2],
            carLightsRadius: [0.05, 0.14],
            carWidthPercentage: [0.3, 0.5],
            carShiftX: [-0.8, 0.8],
            carFloorSeparation: [0, 5],
            colors: {
              roadColor: 0x1a1a1a,
              islandColor: 0x252525,
              background: 0xffffff,
              shoulderLines: 0xffffff,
              brokenLines: 0xffffff,
              leftCars: [0xff00d4, 0xaa00ff, 0xff0080],
              rightCars: [0x00ffff, 0x0080ff, 0x00aaff],
              sticks: 0x00ffff
            }
          }), [])}
        />
      </div>

      {/* Gradient Overlay for better text readability */}
      <motion.div
        style={{ opacity, scale }}
        className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/10 to-white/30 z-[1] pointer-events-none"
      />

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-[2] max-w-7xl mx-auto px-6 lg:px-8 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-sm uppercase tracking-[0.3em] text-gray-600 mb-6"
          >
            Creative Media Agency
          </motion.p>

          <div className="mb-8 min-h-[120px] md:min-h-[160px] flex items-center justify-center">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] md:leading-[1.15] text-gray-900">
              <span className="block mb-2">We Create</span>
              <span className="inline-block min-w-[200px] md:min-w-[300px] text-center mb-2">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentWordIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="inline-block text-primary-red"
                  >
                    {words[currentWordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
              <span className="block">Experiences</span>
            </h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed transition-colors duration-300 text-gray-600 font-semibold bg-white/80 backdrop-blur-sm px-6 py-4 rounded-lg inline-block"
          >
            Transforming visions into cinematic reality through premium videography, 
            cutting-edge animations, and innovative creative media solutions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link
              href="/contact"
              className="group relative px-8 py-4 bg-primary-red text-white font-semibold uppercase tracking-wider overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Start Your Project
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <motion.div
                className="absolute inset-0 bg-gray-100"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10 flex items-center gap-2 text-gray-900">
                Start Your Project
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            <Link
              href="/portfolio"
              className="group flex items-center gap-2 text-gray-900 hover:text-primary-red transition-colors font-semibold uppercase tracking-wider"
            >
              <Play className="w-5 h-5" />
              View Our Work
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-gray-400 rounded-full flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-gray-600 rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

