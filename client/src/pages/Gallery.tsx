/* Design: Midnight Arena - Dark Athletic Luxury
   Premium masonry gallery with hover zoom and lightbox
   Mobile-first */

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Maximize2, ChevronLeft, ChevronRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const GALLERY_ITEMS = [
  { src: "/manus-storage/gallery-turf_c0b65077.png", category: "Turf", title: "Premium Turf Field", size: "large" },
  { src: "/manus-storage/gallery-facilities_327cc90d.png", category: "Facilities", title: "Comfortable Seating Area", size: "medium" },
  { src: "/manus-storage/gallery-lights_af32b3ff.png", category: "Lighting", title: "LED Flood Lights", size: "large" },
  { src: "/manus-storage/football-sport_110fc062.png", category: "Sports", title: "Football Arena", size: "small" },
  { src: "/manus-storage/cricket-sport_6f94ca03.png", category: "Sports", title: "Cricket Practice", size: "medium" },
  { src: "/manus-storage/pickleball-sport_6312a4fb.png", category: "Sports", title: "Pickleball Court", size: "small" },
  { src: "/manus-storage/hero-bg_bb86a2c9.png", category: "Arena", title: "Arena Overview", size: "large" },
  { src: "/manus-storage/gallery-turf_c0b65077.png", category: "Turf", title: "Turf Details", size: "small" },
];

const CATEGORIES = ["All", "Turf", "Sports", "Facilities", "Lighting", "Arena"];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filtered = activeCategory === "All"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeCategory);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const nextImage = () => {
    setLightboxIndex(prev => (prev + 1) % filtered.length);
  };

  const prevImage = () => {
    setLightboxIndex(prev => (prev - 1 + filtered.length) % filtered.length);
  };

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="container max-w-6xl">
        <ScrollReveal>
          <div className="text-center mb-8">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#1E8E3E]/10 text-[#4ADE80] text-sm font-medium mb-4 border border-[#1E8E3E]/20">
              Our Gallery
            </span>
            <h1 className="text-3xl md:text-5xl font-bold font-[Outfit] text-white mb-4">
              Inside <span className="text-gradient">AKAN'S ARENA</span>
            </h1>
            <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
              Take a tour of our world-class facilities, premium turf, and state-of-the-art amenities.
            </p>
          </div>
        </ScrollReveal>

        {/* Category Filters */}
        <ScrollReveal>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-[#1E8E3E] text-white shadow-lg shadow-[#1E8E3E]/20"
                    : "glass text-gray-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Masonry Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {filtered.map((item, i) => (
            <ScrollReveal key={`${item.title}-${i}`} delay={i * 0.06}>
              <motion.div
                layout
                className="group relative rounded-xl md:rounded-2xl overflow-hidden cursor-pointer"
                whileHover={{ scale: 1.02 }}
                onClick={() => openLightbox(i)}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-48 md:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white font-semibold font-[Outfit] text-sm">{item.title}</h3>
                  <span className="text-xs text-gray-300">{item.category}</span>
                </div>
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Maximize2 className="w-5 h-5 text-white drop-shadow-lg" />
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </motion.div>

        {/* Lightbox */}
        <AnimatePresence>
          {lightboxOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9998] bg-black/95 flex items-center justify-center"
              onClick={() => setLightboxOpen(false)}
            >
              <button
                onClick={() => setLightboxOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-lg text-white hover:bg-white/10 transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>

              <motion.img
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                src={filtered[lightboxIndex].src}
                alt={filtered[lightboxIndex].title}
                className="max-w-[90vw] max-h-[80vh] object-contain rounded-xl"
                onClick={(e) => e.stopPropagation()}
              />

              <button
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
              >
                <ChevronRight className="w-8 h-8" />
              </button>

              <div className="absolute bottom-6 left-0 right-0 text-center">
                <p className="text-white font-semibold">{filtered[lightboxIndex].title}</p>
                <p className="text-sm text-gray-400">{lightboxIndex + 1} / {filtered.length}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
