'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Video, FileText, Trash2, Edit, Plus, LogOut, X } from 'lucide-react';
import { supabase, STORAGE_BUCKETS } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { signOut } from '@/lib/auth';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'videos' | 'case-studies' | 'showcase'>('videos');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showCaseStudyModal, setShowCaseStudyModal] = useState(false);
  const [showShowcaseModal, setShowShowcaseModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [videos, setVideos] = useState<any[]>([]);
  const [loadingVideos, setLoadingVideos] = useState(true);
  const [caseStudies, setCaseStudies] = useState([
    { id: 1, title: 'Case Study 1', client: 'Client A' },
    { id: 2, title: 'Case Study 2', client: 'Client B' },
  ]);
  const [showcaseItems, setShowcaseItems] = useState([
    { id: 1, title: 'Showcase Item 1', type: 'video' },
    { id: 2, title: 'Showcase Item 2', type: 'image' },
  ]);
  const { user, loading } = useAuth();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login');
    }
  }, [user, loading, router]);

  // Fetch videos from Supabase
  useEffect(() => {
    async function fetchVideos() {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('videos')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching videos:', error);
          return;
        }

        const transformedVideos = (data || []).map((video) => ({
          id: video.id,
          title: video.title,
          url: video.video_url,
          category: video.category,
          description: video.description,
          thumbnail: video.thumbnail_url,
        }));

        setVideos(transformedVideos);
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setLoadingVideos(false);
      }
    }

    if (user) {
      fetchVideos();
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut();
      router.push('/admin/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-900">Loading...</div>
      </div>
    );
  }

  // Don't render if not authenticated (will redirect)
  if (!user) {
    return null;
  }

  const handleVideoSubmit = async (formData: {
    title: string;
    description?: string;
    category: string;
    videoFile?: File | null;
    videoUrl?: string;
    thumbnailFile?: File | null;
    thumbnailUrl?: string;
  }) => {
    setUploading(true);
    setUploadProgress(0);

    try {
      let finalVideoUrl = formData.videoUrl;
      let finalThumbnailUrl = formData.thumbnailUrl;

      // Upload video file if provided
      if (formData.videoFile) {
        setUploadProgress(10);
        const fileExt = formData.videoFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from(STORAGE_BUCKETS.videos)
          .upload(filePath, formData.videoFile, {
            cacheControl: '3600',
            upsert: false,
          });

        if (uploadError) {
          throw uploadError;
        }

        const { data } = supabase.storage
          .from(STORAGE_BUCKETS.videos)
          .getPublicUrl(filePath);
        
        finalVideoUrl = data.publicUrl;
        setUploadProgress(50);
      }

      // Upload thumbnail if provided
      if (formData.thumbnailFile) {
        setUploadProgress(60);
        const fileExt = formData.thumbnailFile.name.split('.').pop();
        const fileName = `thumb-${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from(STORAGE_BUCKETS.images)
          .upload(filePath, formData.thumbnailFile, {
            cacheControl: '3600',
            upsert: false,
          });

        if (uploadError) {
          throw uploadError;
        }

        const { data } = supabase.storage
          .from(STORAGE_BUCKETS.images)
          .getPublicUrl(filePath);
        
        finalThumbnailUrl = data.publicUrl;
        setUploadProgress(80);
      }

      // Save to Supabase database
      if (!finalVideoUrl) {
        throw new Error('Video URL is required');
      }

      const { data, error } = await supabase
        .from('videos')
        .insert([{
          title: formData.title,
          description: formData.description || null,
          category: formData.category,
          video_url: finalVideoUrl,
          thumbnail_url: finalThumbnailUrl || null,
        }])
        .select();
      
      if (error) throw error;

      // Refresh videos list from Supabase
      const { data: updatedVideos, error: fetchError } = await supabase
        .from('videos')
        .select('*')
        .order('created_at', { ascending: false });

      if (!fetchError && updatedVideos) {
        const transformedVideos = updatedVideos.map((video) => ({
          id: video.id,
          title: video.title,
          url: video.video_url,
          category: video.category,
          description: video.description,
          thumbnail: video.thumbnail_url,
        }));
        setVideos(transformedVideos);
      }
      setUploadProgress(100);
      setShowVideoModal(false);
      alert('Video added successfully!');
    } catch (error) {
      console.error('Error uploading video:', error);
      alert('Error uploading video. Please check your Supabase configuration.');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleAddCaseStudy = async (formData: {
    title: string;
    client: string;
    category: string;
    year?: number;
    overview?: string;
  }) => {
    try {
      // TODO: Replace with actual Supabase insert
      const newCaseStudy = {
        id: Date.now(),
        title: formData.title,
        client: formData.client,
        category: formData.category,
        year: formData.year,
        overview: formData.overview,
      };

      // For now, add to local state
      setCaseStudies([...caseStudies, newCaseStudy]);
      setShowCaseStudyModal(false);
      alert('Case study added successfully!');
      
      // TODO: Uncomment when ready to use Supabase
      // const { data, error } = await supabase
      //   .from('case_studies')
      //   .insert([{
      //     title: formData.title,
      //     client: formData.client,
      //     category: formData.category,
      //     year: formData.year,
      //     overview: formData.overview,
      //   }])
      //   .select();
      
      // if (error) throw error;
    } catch (error) {
      console.error('Error adding case study:', error);
      alert('Error adding case study. Please try again.');
    }
  };

  const handleAddShowcaseItem = async (formData: {
    title: string;
    description?: string;
    item_type: 'video' | 'image';
    media_url: string;
    category?: string;
  }) => {
    try {
      // TODO: Replace with actual Supabase insert
      const newItem = {
        id: Date.now(),
        title: formData.title,
        type: formData.item_type,
        description: formData.description,
        media_url: formData.media_url,
        category: formData.category,
      };

      // For now, add to local state
      setShowcaseItems([...showcaseItems, newItem]);
      setShowShowcaseModal(false);
      alert('Showcase item added successfully!');
      
      // TODO: Uncomment when ready to use Supabase
      // const { data, error } = await supabase
      //   .from('showcase_items')
      //   .insert([{
      //     title: formData.title,
      //     description: formData.description,
      //     item_type: formData.item_type,
      //     media_url: formData.media_url,
      //     category: formData.category,
      //   }])
      //   .select();
      
      // if (error) throw error;
    } catch (error) {
      console.error('Error adding showcase item:', error);
      alert('Error adding showcase item. Please try again.');
    }
  };

  return (
    <div className="relative pt-20 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Admin Panel</h1>
              <p className="text-gray-600">
                Manage videos, case studies, and showcase items
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Logged in as: {user.email}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-gray-100 border border-gray-300 text-gray-900 hover:bg-gray-200 transition-colors flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-200">
          {(['videos', 'case-studies', 'showcase'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-semibold uppercase tracking-wider transition-colors ${
                activeTab === tab
                  ? 'text-primary-red border-b-2 border-primary-red'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.replace('-', ' ')}
            </button>
          ))}
        </div>

        {/* Videos Tab */}
        {activeTab === 'videos' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8 flex justify-between items-center">
              <h2 className="text-xl font-bold">Videos</h2>
              <button 
                onClick={() => setShowVideoModal(true)}
                className="px-4 py-2 bg-primary-red text-gray-900 font-semibold uppercase tracking-wider flex items-center gap-2 hover:bg-primary-red/90 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Video
              </button>
            </div>

            <div>
              {loadingVideos ? (
                <div className="text-gray-600 text-center py-8">Loading videos...</div>
              ) : videos.length === 0 ? (
                <div className="text-gray-600 text-center py-8">No videos yet. Add your first video!</div>
              ) : (
                <div className="space-y-4">
                  {videos.map((video) => (
                  <div
                    key={video.id}
                    className="p-4 bg-gray-50 border border-gray-200 flex items-center justify-between rounded-lg"
                  >
                    <div>
                      <h3 className="font-semibold mb-1 text-gray-900">{video.title}</h3>
                      <p className="text-sm text-gray-600">{video.category}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-gray-200 transition-colors text-gray-700">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-red-500/20 text-red-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Case Studies Tab */}
        {activeTab === 'case-studies' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8 flex justify-between items-center">
              <h2 className="text-xl font-bold">Case Studies</h2>
              <button 
                onClick={() => setShowCaseStudyModal(true)}
                className="px-4 py-2 bg-primary-red text-gray-900 font-semibold uppercase tracking-wider flex items-center gap-2 hover:bg-primary-red/90 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Case Study
              </button>
            </div>
            <div className="space-y-4">
              {caseStudies.map((study) => (
                <div
                  key={study.id}
                  className="p-4 bg-gray-50 border border-gray-200 flex items-center justify-between"
                >
                  <div>
                    <h3 className="font-semibold mb-1">{study.title}</h3>
                    <p className="text-sm text-gray-600">{study.client}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-gray-200 transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-red-500/20 text-red-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Showcase Tab */}
        {activeTab === 'showcase' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8 flex justify-between items-center">
              <h2 className="text-xl font-bold">Showcase Items</h2>
              <button 
                onClick={() => setShowShowcaseModal(true)}
                className="px-4 py-2 bg-primary-red text-gray-900 font-semibold uppercase tracking-wider flex items-center gap-2 hover:bg-primary-red/90 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Item
              </button>
            </div>
            <div className="space-y-4">
              {showcaseItems.map((item) => (
                <div
                  key={item.id}
                  className="p-4 bg-gray-50 border border-gray-200 flex items-center justify-between"
                >
                  <div>
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.type}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-gray-200 transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-red-500/20 text-red-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Case Study Modal */}
        <AnimatePresence>
          {showCaseStudyModal && (
            <CaseStudyModal
              onClose={() => setShowCaseStudyModal(false)}
              onSubmit={handleAddCaseStudy}
            />
          )}
        </AnimatePresence>

        {/* Showcase Item Modal */}
        <AnimatePresence>
          {showShowcaseModal && (
            <ShowcaseItemModal
              onClose={() => setShowShowcaseModal(false)}
              onSubmit={handleAddShowcaseItem}
            />
          )}
        </AnimatePresence>

        {/* Video Upload Modal */}
        <AnimatePresence>
          {showVideoModal && (
            <VideoUploadModal
              onClose={() => setShowVideoModal(false)}
              onSubmit={handleVideoSubmit}
              uploading={uploading}
              uploadProgress={uploadProgress}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Case Study Modal Component
function CaseStudyModal({ 
  onClose, 
  onSubmit 
}: { 
  onClose: () => void; 
  onSubmit: (data: any) => void;
}) {
  const [formData, setFormData] = useState({
    title: '',
    client: '',
    category: '',
    year: new Date().getFullYear(),
    overview: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.client || !formData.category) {
      alert('Please fill in all required fields');
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-white/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white border border-gray-200 shadow-xl rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Add Case Study</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-900">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-primary-red text-gray-900"
              placeholder="Case Study Title"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-900">
              Client <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.client}
              onChange={(e) => setFormData({ ...formData, client: e.target.value })}
              required
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-primary-red text-gray-900"
              placeholder="Client Name"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-900">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-primary-red text-gray-900"
              >
                <option value="">Select category</option>
                <option value="Videography">Videography</option>
                <option value="Animation">Animation</option>
                <option value="Photography">Photography</option>
                <option value="Branding">Branding</option>
                <option value="Marketing">Marketing</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-900">Year</label>
              <input
                type="number"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-primary-red text-gray-900"
                placeholder="2024"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-900">Overview</label>
            <textarea
              value={formData.overview}
              onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-primary-red text-gray-900 resize-none"
              placeholder="Brief overview of the case study..."
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-primary-red text-gray-900 font-semibold uppercase tracking-wider hover:bg-white hover:text-black transition-colors"
            >
              Add Case Study
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-gray-50 border border-gray-200 text-gray-900 font-semibold uppercase tracking-wider hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

// Showcase Item Modal Component
function ShowcaseItemModal({ 
  onClose, 
  onSubmit 
}: { 
  onClose: () => void; 
  onSubmit: (data: any) => void;
}) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    item_type: 'video' as 'video' | 'image',
    media_url: '',
    category: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.media_url) {
      alert('Please fill in all required fields');
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-white/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white border border-gray-200 shadow-xl rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Add Showcase Item</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-900">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-primary-red text-gray-900"
              placeholder="Item Title"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-900">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-primary-red text-gray-900 resize-none"
              placeholder="Item description..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-900">
                Type <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.item_type}
                onChange={(e) => setFormData({ ...formData, item_type: e.target.value as 'video' | 'image' })}
                required
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-primary-red text-gray-900"
              >
                <option value="video">Video</option>
                <option value="image">Image</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-900">Category</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-primary-red text-gray-900"
                placeholder="Category (optional)"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-900">
              Media URL <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              value={formData.media_url}
              onChange={(e) => setFormData({ ...formData, media_url: e.target.value })}
              required
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-primary-red text-gray-900"
              placeholder="https://example.com/video.mp4 or image.jpg"
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter the URL of the video or image
            </p>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-primary-red text-gray-900 font-semibold uppercase tracking-wider hover:bg-white hover:text-black transition-colors"
            >
              Add Item
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-gray-50 border border-gray-200 text-gray-900 font-semibold uppercase tracking-wider hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

// Video Upload Modal Component
function VideoUploadModal({ 
  onClose, 
  onSubmit,
  uploading,
  uploadProgress
}: { 
  onClose: () => void; 
  onSubmit: (data: any) => void;
  uploading: boolean;
  uploadProgress: number;
}) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Videography',
    videoFile: null as File | null,
    videoUrl: '',
    thumbnailFile: null as File | null,
    thumbnailUrl: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.category) {
      alert('Please fill in all required fields');
      return;
    }
    if (!formData.videoFile && !formData.videoUrl) {
      alert('Please provide either a video file or video URL');
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-white/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white border border-gray-200 shadow-xl rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Add Video to Portfolio</h2>
          <button
            onClick={onClose}
            disabled={uploading}
            className="p-2 hover:bg-gray-200 rounded transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-900">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              disabled={uploading}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-primary-red text-gray-900 disabled:opacity-50"
              placeholder="Video Title"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-900">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
              disabled={uploading}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-primary-red text-gray-900 disabled:opacity-50"
            >
              <option value="Videography">Videography</option>
              <option value="Animation">Animation</option>
              <option value="CGI">CGI</option>
              <option value="Reels">Reels</option>
              <option value="UI/UX">UI/UX</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-900">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              disabled={uploading}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-primary-red text-gray-900 resize-none disabled:opacity-50"
              placeholder="Video description..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-900">
              Video <span className="text-red-500">*</span>
            </label>
            <p className="text-xs text-gray-500 mb-2">Upload a video file OR provide a video URL</p>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setFormData({ ...formData, videoFile: e.target.files?.[0] || null, videoUrl: '' })}
              disabled={uploading || !!formData.videoUrl}
              className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:bg-primary-red file:text-gray-900 file:border-0 file:cursor-pointer file:font-semibold file:uppercase file:tracking-wider disabled:opacity-50 mb-2"
            />
            <p className="text-xs text-gray-500 mb-2">OR</p>
            <input
              type="url"
              value={formData.videoUrl}
              onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value, videoFile: null })}
              disabled={uploading || !!formData.videoFile}
              placeholder="https://example.com/video.mp4"
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-primary-red text-gray-900 disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-900">Thumbnail (Optional)</label>
            <p className="text-xs text-gray-500 mb-2">Upload a thumbnail image OR provide an image URL</p>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFormData({ ...formData, thumbnailFile: e.target.files?.[0] || null, thumbnailUrl: '' })}
              disabled={uploading || !!formData.thumbnailUrl}
              className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:bg-primary-red file:text-gray-900 file:border-0 file:cursor-pointer file:font-semibold file:uppercase file:tracking-wider disabled:opacity-50 mb-2"
            />
            <p className="text-xs text-gray-500 mb-2">OR</p>
            <input
              type="url"
              value={formData.thumbnailUrl}
              onChange={(e) => setFormData({ ...formData, thumbnailUrl: e.target.value, thumbnailFile: null })}
              disabled={uploading || !!formData.thumbnailFile}
              placeholder="https://example.com/thumbnail.jpg"
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-primary-red text-gray-900 disabled:opacity-50"
            />
          </div>

          {uploading && (
            <div className="mt-4">
              <div className="w-full bg-gray-200 h-2 rounded">
                <div
                  className="bg-primary-red h-2 rounded transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-2">Uploading... {uploadProgress}%</p>
            </div>
          )}

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={uploading}
              className="flex-1 px-6 py-3 bg-primary-red text-gray-900 font-semibold uppercase tracking-wider hover:bg-white hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? 'Uploading...' : 'Add Video'}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={uploading}
              className="px-6 py-3 bg-gray-50 border border-gray-200 text-gray-900 font-semibold uppercase tracking-wider hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
