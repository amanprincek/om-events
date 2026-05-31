import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  MapPin, 
  Users, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Maximize2, 
  Play, 
  Award, 
  Sparkles, 
  Heart, 
  Info, 
  Calendar, 
  SlidersHorizontal 
} from 'lucide-react';
import { Container, Heading, GlassPanel, Badge, Button } from '@om-tent/ui-system';
import { useGalleryAlbums, useGalleryMedia } from '@om-tent/data-access';
import { GalleryAlbum, GalleryMedia } from '@om-tent/core-types';

// Static luxury metadata aligned with our mock gallery JSON albums
const ALBUM_METADATA: Record<string, {
  location: string;
  capacity: string;
  services: string[];
  coverImage: string;
}> = {
  album_1: {
    location: "Suryagarh Palace, Jodhpur",
    capacity: "800+ Guests",
    services: ["Premium Glass Tents", "Sufi Night Acoustics", "Mughal Floral Mandap", "Golden Spotlighting"],
    coverImage: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=1200"
  },
  album_2: {
    location: "The Oberoi Amarvilas, Agra",
    capacity: "500+ Guests",
    services: ["Emerald Draped Canopies", "Stage Acoustics Systems", "French Chandelier Grid", "Gourmet Live Counters"],
    coverImage: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1200"
  },
  album_3: {
    location: "Taj Lake Palace, Udaipur",
    capacity: "350+ Guests",
    services: ["Modular Glass Stage", "Intelligent Haze Panels", "Corporate VIP Lounges", "Artisanal Haute-Catering"],
    coverImage: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1200"
  },
  album_4: {
    location: "Oak Heights Estate, Bhopal",
    capacity: "150 Parents & Kids",
    services: ["Pastel Balloon Domes", "Interactive Playhouses", "Custom Cotton Candy Bars"],
    coverImage: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=1200"
  },
  album_5: {
    location: "St. Xavier's Assembly Lawns, Raipur",
    capacity: "1,200+ Alumni",
    services: ["Grand Concert Trusses", "Line-Array Sound Symmetrical Grid", "Intense Laser Matrix"],
    coverImage: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=1200"
  },
  album_6: {
    location: "Vrindavan Banquet Lawns",
    capacity: "600+ Banquet Patrons",
    services: ["100+ Authentic Dishes", "Designer Dessert Spires", "Live Ice Sculpture Bars"],
    coverImage: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=1200"
  },
};

const CATEGORIES = [
  "All",
  "Weddings",
  "Receptions",
  "Birthdays",
  "School Events",
  "Corporate Events",
  "Lighting",
  "Decorations",
  "Catering"
];

export default function GalleryPage() {
  const { data: albums = [], isLoading: loadingAlbums } = useGalleryAlbums();
  const { data: mediaItems = [], isLoading: loadingMedia } = useGalleryMedia();

  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedAlbumId, setSelectedAlbumId] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [featuredIndex, setFeaturedIndex] = useState(0);

  // Lightbox state
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Responsive masonry column counter
  const [columnsCount, setColumnsCount] = useState(3);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1200) setColumnsCount(4);
      else if (window.innerWidth >= 768) setColumnsCount(3);
      else if (window.innerWidth >= 540) setColumnsCount(2);
      else setColumnsCount(1);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Filter & Search Logic
  const filteredAlbums = useMemo(() => {
    return albums.filter(album => {
      if (activeCategory === "All") return true;
      return album.tags.some(tag => tag.toLowerCase() === activeCategory.toLowerCase());
    });
  }, [albums, activeCategory]);

  const featuredAlbums = useMemo(() => {
    return albums.filter(album => album.isFeatured);
  }, [albums]);

  // Handle automatic cycling of the Hero Slider (featured showcase)
  useEffect(() => {
    if (featuredAlbums.length <= 1) return;
    const interval = setInterval(() => {
      setFeaturedIndex(prev => (prev + 1) % featuredAlbums.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [featuredAlbums]);

  const activeHeroAlbum = featuredAlbums[featuredIndex] || null;
  const activeHeroMeta = activeHeroAlbum ? ALBUM_METADATA[activeHeroAlbum.id] : null;

  const filteredMediaList = useMemo(() => {
    return mediaItems.filter(media => {
      const parentAlbum = albums.find(a => a.id === media.albumId);
      if (!parentAlbum) return false;

      // Album filter
      if (selectedAlbumId !== "ALL" && media.albumId !== selectedAlbumId) {
        return false;
      }

      // Category tag check
      if (activeCategory !== "All") {
        const matchesCategory = parentAlbum.tags.some(
          tag => tag.toLowerCase() === activeCategory.toLowerCase()
        );
        if (!matchesCategory) return false;
      }

      // Search match
      if (searchQuery.trim() !== "") {
        const searchVal = searchQuery.toLowerCase();
        const matchesCaption = media.caption?.toLowerCase().includes(searchVal);
        const matchesAlbumName = parentAlbum.name.toLowerCase().includes(searchVal);
        const matchesTags = parentAlbum.tags.some(t => t.toLowerCase().includes(searchVal));
        if (!matchesCaption && !matchesAlbumName && !matchesTags) {
          return false;
        }
      }

      return true;
    });
  }, [mediaItems, albums, selectedAlbumId, activeCategory, searchQuery]);

  // Distribute items across columns dynamically for a perfect Masonry look
  const masonryColumns = useMemo(() => {
    const columns: GalleryMedia[][] = Array.from({ length: columnsCount }, () => []);
    filteredMediaList.forEach((item, index) => {
      columns[index % columnsCount].push(item);
    });
    return columns;
  }, [filteredMediaList, columnsCount]);

  // Lightbox handlers
  const openLightbox = (mediaId: string) => {
    const idx = filteredMediaList.findIndex(m => m.id === mediaId);
    if (idx !== -1) {
      setLightboxIndex(idx);
    }
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const handlePrevMedia = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex(prev => (prev === 0 ? filteredMediaList.length - 1 : prev! - 1));
  };

  const handleNextMedia = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex(prev => (prev === filteredMediaList.length - 1 ? 0 : prev! + 1));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') handlePrevMedia();
      if (e.key === 'ArrowRight') handleNextMedia();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredMediaList]);

  // Loading Screen
  if (loadingAlbums || loadingMedia) {
    return (
      <Container className="py-20">
        <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
          <p className="text-sm font-mono tracking-widest text-[#C1AA7F] uppercase animate-pulse">Designing Elegance...</p>
          <div className="w-12 h-12 rounded-full border-t-2 border-r-2 border-[#C1AA7F] animate-spin"></div>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-12 space-y-16 lg:p-12 text-white">
      
      {/* SECTION 2: HERO FEATURED PROJECT SHOWCASE */}
      {activeHeroAlbum && activeHeroMeta && (
        <section className="relative overflow-hidden rounded-2xl border border-white/10 group min-h-[500px] lg:min-h-[580px] flex items-end">
          {/* Cover Background with Smooth Crossfade */}
          <div className="absolute inset-0 z-0">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeHeroAlbum.id}
                src={activeHeroMeta.coverImage}
                alt={activeHeroAlbum.name}
                referrerPolicy="no-referrer"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 1.2 }}
                className="w-full h-full object-cover filter brightness-[0.35]"
              />
            </AnimatePresence>
            {/* Visual ambient gradients for real premium depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/35" />
          </div>

          {/* Featured Slider Controls */}
          <div className="absolute top-6 right-6 z-10 flex gap-2">
            <button 
              onClick={() => {
                setFeaturedIndex(prev => (prev === 0 ? featuredAlbums.length - 1 : prev - 1));
              }}
              className="p-3 rounded-full bg-black/40 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all text-white hover:text-[#C1AA7F]"
            >
              <ChevronLeft size={18} />
            </button>
            <button 
              onClick={() => {
                setFeaturedIndex(prev => (prev + 1) % featuredAlbums.length);
              }}
              className="p-3 rounded-full bg-black/40 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all text-white hover:text-[#C1AA7F]"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="absolute top-6 left-6 z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 font-mono text-xs uppercase tracking-widest text-[#C1AA7F] rounded-full bg-black/50 border border-[#C1AA7F]/30 backdrop-blur-md">
              <Sparkles size={12} className="text-[#C1AA7F] animate-spin" style={{ animationDuration: '4s' }} /> Featured Project
            </span>
          </div>

          {/* Contents & Metadata */}
          <div className="relative z-10 p-6 md:p-12 w-full max-w-4xl space-y-6">
            <div className="space-y-2">
              {/* Event Type Tags */}
              <div className="flex flex-wrap gap-2">
                {activeHeroAlbum.tags.map((tag, i) => (
                  <span key={i} className="text-xs uppercase tracking-wider text-[#C1AA7F] font-semibold">
                    {tag} {i < activeHeroAlbum.tags.length - 1 && '•'}
                  </span>
                ))}
              </div>
              <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight leading-tight">
                {activeHeroAlbum.name}
              </h2>
            </div>

            {/* Spec Panel Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-4 border-y border-white/10 text-sm">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded bg-[#C1AA7F]/10 border border-[#C1AA7F]/20 text-[#C1AA7F]">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">Location</p>
                  <p className="text-white font-medium mt-0.5">{activeHeroMeta.location}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded bg-[#C1AA7F]/10 border border-[#C1AA7F]/20 text-[#C1AA7F]">
                  <Users size={18} />
                </div>
                <div>
                  <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">Guest Capacity</p>
                  <p className="text-white font-medium mt-0.5">{activeHeroMeta.capacity}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 sm:col-span-2 md:col-span-1">
                <div className="p-2.5 rounded bg-[#C1AA7F]/10 border border-[#C1AA7F]/20 text-[#C1AA7F]">
                  <Calendar size={18} />
                </div>
                <div>
                  <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">Executed Date</p>
                  <p className="text-white font-medium mt-0.5">
                    {new Date(activeHeroAlbum.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long' })}
                  </p>
                </div>
              </div>
            </div>

            {/* Services Listing */}
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-wider text-[#C1AA7F]/80">Services Delivered</p>
              <div className="flex flex-wrap gap-2.5">
                {activeHeroMeta.services.map((service, i) => (
                  <span 
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-stone-200"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#C1AA7F]" />
                    {service}
                  </span>
                ))}
              </div>
            </div>

            {/* Slider Dots Indicator */}
            <div className="flex gap-2 pt-2">
              {featuredAlbums.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setFeaturedIndex(idx)}
                  className={`w-12 h-1 rounded-full transition-all duration-300 ${
                    idx === featuredIndex ? 'bg-[#C1AA7F]' : 'bg-white/20'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FILTER, ALBUM NAVIGATION & SEARCH ROW */}
      <section className="space-y-6">
        <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-end justify-between border-b border-white/10 pb-6">
          <div>
            <Heading level={3} className="text-stone-100 font-serif mb-1">
              The Curated Portfolios
            </Heading>
            <p className="text-xs tracking-wider text-[var(--color-text-muted)] uppercase">
              Filter by Event Scope, Infrastructure Category, or Dedicated Album
            </p>
          </div>
          
          {/* Multi-tier Filter Controls */}
          <div className="w-full lg:w-auto flex flex-col md:flex-row gap-4 items-center justify-end">
            {/* Search Input */}
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
              <input 
                type="text"
                placeholder="Search events, decor, food..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-10 py-2 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#C1AA7F] transition-all"
              />
            </div>

            {/* Album Selector Dropdown */}
            <div className="relative w-full md:w-60">
              <select
                value={selectedAlbumId}
                onChange={(e) => setSelectedAlbumId(e.target.value)}
                className="w-full bg-stone-900 border border-white/10 rounded-lg px-4 py-2 text-xs text-stone-200 focus:outline-none focus:border-[#C1AA7F] appearance-none cursor-pointer pr-10"
              >
                <option value="ALL">All Event Albums</option>
                {filteredAlbums.map(album => (
                  <option key={album.id} value={album.id}>{album.name}</option>
                ))}
              </select>
              <SlidersHorizontal className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" size={14} />
            </div>
          </div>
        </div>

        {/* Category Horizontal Scrolling Filters */}
        <div className="overflow-x-auto scroller-hidden">
          <div className="flex gap-2.5 pb-2 min-w-max">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                  }}
                  className={`px-4 py-2 text-xs tracking-widest uppercase transition-all duration-300 border rounded-full ${
                    isActive 
                      ? 'border-[#C1AA7F] text-[#C1AA7F] bg-[#C1AA7F]/10 font-medium scale-105'
                      : 'border-white/10 text-stone-400 hover:text-white hover:border-white/30 hover:bg-white/5'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 5: GALLERY MASONRY GRID & SECTION 4/7: MEDIA ITEMS + VIDEOS */}
      <section className="space-y-4">
        {filteredMediaList.length === 0 ? (
          <GlassPanel className="py-20 p-8 text-center border border-white/10">
            <p className="text-stone-400 text-sm">No showcasing media found matching the filters or search parameters.</p>
            <Button 
              variant="ghost" 
              onClick={() => {
                setActiveCategory("All");
                setSelectedAlbumId("ALL");
                setSearchQuery("");
              }}
              className="mt-4 text-[#C1AA7F] hover:text-white border border-[#C1AA7F]/30"
            >
              Reset Filters
            </Button>
          </GlassPanel>
        ) : (
          <div className="flex flex-flow gap-6">
            {/* Masonry Column Layout */}
            {masonryColumns.map((col, colIdx) => (
              <div key={colIdx} className="flex-1 flex flex-col gap-6">
                {col.map((media) => {
                  const album = albums.find(a => a.id === media.albumId);
                  const isVideo = media.type === 'VIDEO';
                  
                  return (
                    <motion.div
                      layoutId={`media-card-${media.id}`}
                      key={media.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.5 }}
                      onClick={() => openLightbox(media.id)}
                      className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 cursor-pointer"
                    >
                      {/* Media Body */}
                      <div className="relative aspect-auto max-h-[500px]">
                        {isVideo ? (
                          <div className="relative w-full h-full">
                            {/* Video Cover Placeholder */}
                            <img 
                              src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800"
                              alt="Video showcase preview"
                              referrerPolicy="no-referrer"
                              className="w-full h-auto object-cover filter brightness-[0.7] group-hover:scale-105 transition-all duration-700" 
                            />
                            {/* Play Button Overlay */}
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                              <span className="p-4 rounded-full bg-black/60 border border-white/20 backdrop-blur-md text-[#C1AA7F] group-hover:scale-110 transition-transform">
                                <Play size={20} fill="currentColor" />
                              </span>
                            </div>
                            <span className="absolute top-3 left-3 bg-rose-500 text-white text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 rounded">
                              REEL / HIGHLIGHT
                            </span>
                          </div>
                        ) : (
                          <img 
                            src={media.url} 
                            alt={media.caption} 
                            referrerPolicy="no-referrer"
                            loading="lazy"
                            className="w-full h-auto object-cover group-hover:scale-105 transition-all duration-700 filter brightness-[0.9] group-hover:brightness-100" 
                          />
                        )}

                        {/* Slide-Up Hover Overlays */}
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent p-5 transform translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                          <div className="space-y-1.5">
                            {album && (
                              <Badge className="bg-[#C1AA7F]/20 text-[#C1AA7F] border border-[#C1AA7F]/30 text-[10px] tracking-wider uppercase">
                                {album.name}
                              </Badge>
                            )}
                            <p className="text-xs text-stone-200 line-clamp-2 italic">
                              "{media.caption || 'Royal arrangement detail.'}"
                            </p>
                            <div className="flex justify-between items-center pt-2 text-[10px] text-stone-400 font-mono">
                              <span className="flex items-center gap-1">
                                <Maximize2 size={10} /> Fullscreen view
                              </span>
                              {isVideo && <span className="uppercase text-rose-400">Play Reel</span>}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* SECTION 8: TRUST INTEGRATION & BRAND PROMISE */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-white/10">
        <GlassPanel intensity="macro" className="p-8 border border-white/10 flex flex-col justify-between space-y-6">
          <div className="space-y-2">
            <div className="inline-flex p-3 rounded bg-[#C1AA7F]/10 border border-[#C1AA7F]/20 text-[#C1AA7F] mb-2">
              <Award size={24} />
            </div>
            <Heading level={4} className="font-serif text-white">Trust & Execution Guarantee</Heading>
            <p className="text-sm text-stone-400 leading-relaxed">
              Serving central India for over 15 years, Om Tent House And Caterers takes operational rigor as a core value. From clean logistics dispatches to instant post-return fabric care audits, our backend operations match our front-end luxury output.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5 text-center">
            <div>
              <p className="font-serif text-3xl font-semibold text-[#C1AA7F]">500+</p>
              <p className="text-xs text-stone-500 uppercase tracking-widest mt-1">Gala Weddings</p>
            </div>
            <div>
              <p className="font-serif text-3xl font-semibold text-[#C1AA7F]">25+</p>
              <p className="text-xs text-stone-500 uppercase tracking-widest mt-1">Cities Covered</p>
            </div>
          </div>
        </GlassPanel>

        <section className="space-y-4 flex flex-col justify-between">
          <div className="p-6 rounded-xl border border-white/5 bg-white/2 flex items-start gap-4">
            <div className="p-2 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0">
              <Heart size={18} />
            </div>
            <div>
              <Heading level={5} className="text-white font-medium text-sm">Customer Review Highlight</Heading>
              <p className="text-xs text-stone-400 mt-1 italic italic">
                "Om Tent House styled our daughter’s wedding Mandap with glass tents and custom lighting. The setup was outstanding, completed 4 hours ahead of schedule. Truly elite operations!"
              </p>
              <p className="text-[10px] uppercase tracking-wider text-[#C1AA7F] font-mono mt-2">— Sharma Family (Gwalior, Jodhpur Setup)</p>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-white/5 bg-white/2 flex items-start gap-4">
            <div className="p-2 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0">
              <Info size={18} />
            </div>
            <div>
              <Heading level={5} className="text-white font-medium text-sm">Event Safety & Standards</Heading>
              <p className="text-xs text-stone-400 mt-1">
                All structural tarpaulins, heavy aluminum framing, sound arrays, and custom spotlights go through robust safety testing. Damaged inventory is pulled instantly by our returns personnel to ensure clients always view elite-tier stock assets.
              </p>
            </div>
          </div>
        </section>
      </section>

      {/* SECTION 6: LIGHTBOX EXPERIENCE OVERLAY */}
      <AnimatePresence>
        {lightboxIndex !== null && (() => {
          const activeMedia = filteredMediaList[lightboxIndex];
          const isVideo = activeMedia.type === 'VIDEO';
          const parentAlbum = albums.find(a => a.id === activeMedia.albumId);
          const meta = ALBUM_METADATA[activeMedia.albumId];

          return (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col md:flex-row items-stretch"
            >
              {/* Back close button */}
              <button 
                onClick={closeLightbox}
                className="absolute top-6 right-6 z-50 p-3 rounded-full bg-stone-900 border border-white/10 hover:bg-white/10 hover:text-[#C1AA7F] transition-all text-stone-300"
                aria-label="Close Lightbox"
              >
                <X size={20} />
              </button>

              {/* Media viewer center */}
              <div className="flex-1 flex items-center justify-center p-6 relative bg-black/60">
                {/* Previous Control */}
                <button 
                  onClick={handlePrevMedia}
                  className="absolute left-6 p-4 rounded-full bg-stone-900/40 border border-white/5 hover:border-white/20 hover:bg-stone-900/80 transition-all text-white z-10"
                >
                  <ChevronLeft size={24} />
                </button>

                {/* Main Showcase Element */}
                <div className="max-w-4xl max-h-[75vh] md:max-h-[85vh] w-full flex items-center justify-center relative">
                  {isVideo ? (
                    <video 
                      src={activeMedia.url} 
                      controls 
                      autoPlay 
                      loop 
                      className="max-w-full max-h-full rounded-lg border border-white/10 shadow-2xl"
                    />
                  ) : (
                    <img 
                      src={activeMedia.url} 
                      alt={activeMedia.caption} 
                      referrerPolicy="no-referrer"
                      className="max-w-full max-h-[70vh] md:max-h-[80vh] object-contain rounded-lg border border-white/10 shadow-2xl" 
                    />
                  )}
                </div>

                {/* Next Control */}
                <button 
                  onClick={handleNextMedia}
                  className="absolute right-6 p-4 rounded-full bg-stone-900/40 border border-white/5 hover:border-white/20 hover:bg-stone-900/80 transition-all text-white z-10"
                >
                  <ChevronRight size={24} />
                </button>
              </div>

              {/* Sidebar metadata panel */}
              <div className="w-full md:w-96 bg-stone-950 border-t md:border-t-0 md:border-l border-white/10 flex flex-col justify-between p-8 space-y-8 select-none">
                <div className="space-y-6">
                  {parentAlbum && (
                    <div className="space-y-2">
                      <span className="text-xs uppercase tracking-widest text-[#C1AA7F] font-semibold">
                        {parentAlbum.tags.join(' • ')}
                      </span>
                      <h3 className="text-2xl font-serif text-white tracking-tight">
                        {parentAlbum.name}
                      </h3>
                      {meta && (
                        <p className="text-xs text-stone-400 flex items-center gap-1">
                          <MapPin size={12} className="text-[#C1AA7F]" /> {meta.location}
                        </p>
                      )}
                    </div>
                  )}

                  <div className="border-t border-white/10 pt-4 space-y-4">
                    <p className="text-[#C1AA7F] uppercase tracking-wider text-xs">Aesthetic Focus</p>
                    <p className="text-xs text-stone-300 leading-relaxed font-sans font-light">
                      {activeMedia.caption || "A meticulously executed layout exhibiting Om Tent House's signature high-end modular structuring, symmetry, and ambient spotlight grids."}
                    </p>
                    {isVideo && (
                      <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 uppercase tracking-widest text-rose-400 border border-rose-500/30 bg-rose-500/10 rounded">
                        Simulated Reel Recording
                      </span>
                    )}
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4 space-y-4">
                  <div className="flex justify-between text-xs text-stone-400 font-mono">
                    <span>INDEX</span>
                    <span className="text-[#C1AA7F] font-semibold">{lightboxIndex + 1} / {filteredMediaList.length}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <Button 
                      variant="ghost" 
                      onClick={closeLightbox}
                      className="w-full text-stone-400 hover:text-white text-xs py-2 border border-white/10"
                    >
                      Exit View
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => alert("Booking service mapping - contact operational planners directly at office.")}
                      className="w-full text-xs py-2"
                    >
                      Inquire Setup
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })()}
      </AnimatePresence>

    </Container>
  );
}
