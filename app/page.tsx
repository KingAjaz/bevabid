'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';
import HeroSection from '@/components/sections/HeroSection';
import ServicesPreview from '@/components/sections/ServicesPreview';
import FeaturedShowcase from '@/components/sections/FeaturedShowcase';
import CTA from '@/components/sections/CTA';

export default function Home() {
  return (
    <div className="relative">
      <HeroSection />
      <ServicesPreview />
      <FeaturedShowcase />
      <CTA />
    </div>
  );
}

