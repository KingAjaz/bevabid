'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Instagram, Linkedin, Mail, Youtube } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram', id: 'instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn', id: 'linkedin' },
    { icon: Youtube, href: '#', label: 'YouTube', id: 'youtube' },
    { icon: Mail, href: '/contact', label: 'Email', id: 'email' },
  ];

  const footerLinks = {
    company: [
      { href: '/about', label: 'About', id: 'about' },
      { href: '/services', label: 'Services', id: 'services' },
      { href: '/portfolio', label: 'Portfolio', id: 'portfolio' },
      { href: '/case-studies', label: 'Case Studies', id: 'case-studies' },
    ],
    legal: [
      { href: '#', label: 'Privacy Policy', id: 'privacy' },
      { href: '#', label: 'Terms of Service', id: 'terms' },
    ],
  };

  return (
    <footer className="relative bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <div className="relative w-24 h-24 md:w-28 md:h-28">
                <Image
                  src="/logo.svg"
                  alt="Bevabid Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed max-w-md">
              Creating cinematic experiences through videography, animation, and cutting-edge creative media solutions.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-gray-900">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-primary-red transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-gray-900">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-primary-red transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-gray-200">
          <div className="flex items-center space-x-6 mb-4 md:mb-0">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.id}
                  href={social.href}
                  whileHover={{ scale: 1.1, color: '#c1121f' }}
                  whileTap={{ scale: 0.95 }}
                  className="text-gray-600 hover:text-primary-red transition-colors"
                  aria-label={social.label}
                >
                  <Icon size={20} />
                </motion.a>
              );
            })}
          </div>
          <p className="text-gray-500 text-sm">
            © {currentYear} Bevabid. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

