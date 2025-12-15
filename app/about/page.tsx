'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function AboutPage() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <div className="relative pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto px-6 lg:px-8 text-center"
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-8 text-gray-900">
            About <span className="text-primary-red">Bevabid</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
            We are a creative media agency dedicated to transforming visions into cinematic reality.
          </p>
        </motion.div>
      </section>

      {/* Brand Story */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Our Story</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Founded with a passion for visual storytelling, Bevabid emerged from a simple belief: 
                  every brand has a unique narrative waiting to be told. We combine cinematic artistry 
                  with cutting-edge technology to create experiences that resonate deeply with audiences.
                </p>
                <p>
                  Our journey began with a vision to bridge the gap between traditional media and 
                  innovative digital solutions. Today, we stand as a trusted partner for brands 
                  seeking to elevate their presence through premium videography, stunning animations, 
                  and immersive creative media.
                </p>
                <p>
                  We don't just create content—we craft experiences that leave lasting impressions 
                  and drive meaningful connections between brands and their audiences.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative aspect-square bg-white/5 border border-white/10"
            >
              {/* Placeholder for image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-gray-300 text-2xl">Visual Content</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-32 bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary-red">Our Vision</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                To become the world's most trusted creative media agency, known for pushing boundaries 
                and setting new standards in visual storytelling. We envision a future where every brand 
                can communicate its essence through powerful, cinematic narratives that inspire and engage.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary-red">Our Mission</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                To deliver exceptional creative media solutions that elevate brands and drive results. 
                We are committed to understanding our clients' unique needs, pushing creative boundaries, 
                and delivering work that exceeds expectations. Through innovation, artistry, and 
                unwavering dedication, we transform ideas into extraordinary visual experiences.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">Our Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Excellence',
                description: 'We pursue perfection in every project, ensuring the highest quality standards in all our deliverables.',
              },
              {
                title: 'Innovation',
                description: 'We embrace new technologies and creative approaches to stay at the forefront of media production.',
              },
              {
                title: 'Collaboration',
                description: 'We believe in the power of partnership, working closely with clients to bring their vision to life.',
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-8 bg-white/5 border border-white/10 hover:border-primary-red/50 transition-all"
              >
                <h3 className="text-2xl font-bold mb-4 text-gray-900">{value.title}</h3>
                <p className="text-gray-700 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

