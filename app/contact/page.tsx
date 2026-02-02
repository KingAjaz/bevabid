'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', company: '', message: '' });

        setTimeout(() => {
          setSubmitted(false);
        }, 5000);
      } else {
        alert(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
            Get In <span className="text-primary-red">Touch</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
            Let's create something extraordinary together
          </p>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold mb-8">Contact Information</h2>
                <p className="text-gray-700 leading-relaxed mb-8">
                  Ready to start your next project? Reach out and let's discuss how we can bring your vision to life.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-red/20 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary-red" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <a
                      href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@bevabid.com'}`}
                      className="text-gray-600 hover:text-primary-red transition-colors"
                    >
                      {process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@bevabid.com'}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-red/20 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary-red" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <a
                      href={`tel:${process.env.NEXT_PUBLIC_CONTACT_PHONE?.replace(/[^0-9+]/g, '') || '+1234567890'}`}
                      className="text-gray-600 hover:text-primary-red transition-colors"
                    >
                      {process.env.NEXT_PUBLIC_CONTACT_PHONE || '+1 (234) 567-890'}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-red/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary-red" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Location</h3>
                    <p className="text-gray-600">
                      {process.env.NEXT_PUBLIC_CONTACT_ADDRESS ? (
                        process.env.NEXT_PUBLIC_CONTACT_ADDRESS.split('|').map((line, i) => (
                          <span key={i} className="block mb-4 last:mb-0">{line.trim()}</span> // Added margin-bottom for visual separation
                        ))
                      ) : (
                        <>
                          123 Creative Street<br />
                          Design District, NY 10001
                        </>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="lg:col-span-2"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold uppercase tracking-wider mb-2"
                    >
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-primary-red focus:outline-none transition-colors text-gray-900"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold uppercase tracking-wider mb-2"
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-primary-red focus:outline-none transition-colors text-gray-900"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-semibold uppercase tracking-wider mb-2"
                  >
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-primary-red focus:outline-none transition-colors text-gray-900"
                    placeholder="Your company"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold uppercase tracking-wider mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={8}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-primary-red focus:outline-none transition-colors text-gray-900 resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-primary-red/20 border border-primary-red text-primary-red"
                  >
                    Thank you! Your message has been sent. We'll get back to you soon.
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative px-8 py-4 bg-primary-red text-gray-900 font-semibold uppercase tracking-wider hover:bg-primary-red/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

