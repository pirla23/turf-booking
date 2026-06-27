/* Design: Midnight Arena - Dark Athletic Luxury
   Glassmorphism, emerald green accents, floating 3D elements
   Mobile-first, progressive enhancement */

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Star, MapPin, Clock, Shield, Zap, Calendar, Building2, BadgeDollarSign, Users } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import LoadingScreen from "@/components/LoadingScreen";
import { SPORTS, FACILITIES, TESTIMONIALS } from "@/lib/config";
import { useBooking } from "@/contexts/BookingContext";

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [counters, setCounters] = useState({ rating: 4, hours: 0, sports: 0, satisfaction: 0 });
  const [ratingDecimal, setRatingDecimal] = useState(0.9);
  const statsRef = useRef<HTMLDivElement>(null!);
  const [statsVisible, setStatsVisible] = useState(false);

  const { setSport } = useBooking();

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!statsVisible) return;
    const targets = { rating: 4, hours: 24, sports: 3, satisfaction: 100 };
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCounters({
        rating: Math.round(targets.rating * easeOut),
        hours: Math.round(targets.hours * easeOut),
        sports: Math.round(targets.sports * easeOut),
        satisfaction: Math.round(targets.satisfaction * easeOut),
      });
      setRatingDecimal(parseFloat((0.9 * easeOut).toFixed(1)));
      if (step >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, [statsVisible]);

  return (
    <div className="pt-24 pb-10">
      <LoadingScreen />

      {/* ===== HERO ===== */}
      <HeroSection />

      {/* ===== ABOUT ===== */}
      <AboutSection />

      {/* ===== WHY CHOOSE US ===== */}
      <WhyChooseSection />

      {/* ===== SPORTS PREVIEW ===== */}
      <SportsPreviewSection setSport={setSport} />

      {/* ===== FACILITIES ===== */}
      <FacilitiesSection />

      {/* ===== TESTIMONIALS ===== */}
      <TestimonialsSection />

      {/* ===== STATISTICS ===== */}
      <StatisticsSection countersRef={statsRef} counters={counters} ratingDecimal={ratingDecimal} />
    </div>
  );
}

/* ---------- HERO ---------- */
function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({ x: (e.clientX / window.innerWidth - 0.5) * 20, y: (e.clientY / window.innerHeight - 0.5) * 20 });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with parallax */}
      <div
        className="absolute inset-0"
        style={{
          transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)`,
          transition: "transform 0.3s ease-out",
        }}
      >
        <img
          src="/hero-bg.png"
          alt="Premium Sports Arena"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F14]/80 via-[#0B0F14]/50 to-[#0B0F14]" />
      </div>

      {/* Floating sport elements */}
      <motion.div
        className="absolute top-20 right-8 md:right-20 text-5xl md:text-7xl opacity-10 select-none pointer-events-none"
        animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{ left: mousePos.x * 0.5 + 80 + "%", top: mousePos.y * 0.5 + 15 + "%" }}
      >
        ⚽
      </motion.div>
      <motion.div
        className="absolute bottom-32 left-8 md:left-20 text-4xl md:text-6xl opacity-10 select-none pointer-events-none"
        animate={{ y: [10, -10, 10], rotate: [0, -5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        🏏
      </motion.div>
      <motion.div
        className="absolute top-40 left-12 md:left-32 text-3xl md:text-5xl opacity-10 select-none pointer-events-none"
        animate={{ y: [-5, 5, -5], x: [5, -5, 5] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        🏓
      </motion.div>

      {/* Particle dots */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-[#4ADE80]/30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, Math.random() * -30 - 10, 0],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-4xl pt-12 md:pt-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.2 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <Star className="w-4 h-4 text-[#4ADE80] fill-[#4ADE80]" />
            <span className="text-sm font-medium text-gray-300">
              Rated 4.9 on Google
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black font-[Outfit] text-white leading-[1.05] tracking-tight mb-4">
            AKAN'S
            <span className="text-gradient"> ARENA</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-2xl text-gray-300 font-medium mb-4 font-[Outfit]">
            Salem's Premium Multi-Sports Arena
          </p>

          {/* Description */}
          <p className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto leading-relaxed mb-8">
            Experience professional football, cricket, and pickleball facilities with premium infrastructure,
            excellent lighting, and seamless online booking. Whether you're playing with friends, family,
            or your team, AKAN'S ARENA delivers a world-class sports experience.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8 relative z-10">
            <Link
              href="/booking"
              className="btn-gradient text-white font-semibold px-8 py-4 rounded-xl text-lg shadow-xl shadow-[#1E8E3E]/20 hover:shadow-[#1E8E3E]/40 transition-all"
            >
              Book Your Slot
            </Link>
            <Link
              href="/sports"
              className="glass text-white font-semibold px-8 py-4 rounded-xl text-lg hover:bg-white/10 transition-all"
            >
              Explore Arena
            </Link>
          </div>

          {/* Info badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg glass text-sm">
              <Star className="w-4 h-4 text-[#4ADE80]" />
              <span className="text-gray-300">4.9 Google Rating</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg glass text-sm">
              <MapPin className="w-4 h-4 text-[#4ADE80]" />
              <span className="text-gray-300">Attur, Salem</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg glass text-sm">
              <Clock className="w-4 h-4 text-[#4ADE80]" />
              <span className="text-gray-300">Open 24 Hours</span>
            </div>
          </div>

          {/* Instagram Button */}
          <div className="flex flex-col items-center gap-3">
            <a
              href="https://www.instagram.com/akans_arena__/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg glass text-sm font-medium text-white hover:bg-white/10 transition-all group"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span className="group-hover:text-[#E4405F] transition-colors"> @akans_arena__</span>
            </a>
            <p className="text-xs text-gray-500 font-medium">Click to visit our page</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- ABOUT ---------- */
function AboutSection() {
  return (
    <section className="section-padding relative">
      <div className="container">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#1E8E3E]/10 text-[#4ADE80] text-sm font-medium mb-4 border border-[#1E8E3E]/20">
              Welcome to Our Arena
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-[Outfit] text-white mb-6">
              Welcome to <span className="text-gradient">AKAN'S ARENA</span>
            </h2>
            <p className="text-gray-400 leading-relaxed text-base md:text-lg">
              Located in Othur, Salem, AKAN'S ARENA is designed for sports lovers who want a premium playing
              experience. Our professionally maintained turf, modern lighting, and excellent facilities provide
              the perfect environment for football, cricket, and pickleball. Whether you are planning a casual
              game, tournament, corporate event, or team practice, AKAN'S ARENA offers everything needed for
              an unforgettable sports experience.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ---------- WHY CHOOSE US ---------- */
function WhyChooseSection() {
  const features = [
    { icon: <Building2 className="w-7 h-7" />, title: "Premium Turf", desc: "Professionally maintained playing surface" },
    { icon: <Zap className="w-7 h-7" />, title: "Professional Flood Lights", desc: "Play comfortably during day or night" },
    { icon: <Calendar className="w-7 h-7" />, title: "Easy Online Booking", desc: "Reserve slots within seconds" },
    { icon: <Shield className="w-7 h-7" />, title: "Modern Facilities", desc: "Clean washrooms, dressing rooms, refreshments, parking, and seating" },
    { icon: <BadgeDollarSign className="w-7 h-7" />, title: "Affordable Pricing", desc: "Premium experience at competitive prices" },
    { icon: <Users className="w-7 h-7" />, title: "Friendly Environment", desc: "Suitable for friends, families, schools, and corporate teams" },
  ];

  return (
    <section className="section-padding relative">
      <div className="container">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#1E8E3E]/10 text-[#4ADE80] text-sm font-medium mb-4 border border-[#1E8E3E]/20">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-[Outfit] text-white">
              The <span className="text-gradient">AKAN'S ARENA</span> Advantage
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {features.map((f, i) => (
            <ScrollReveal key={f.title} delay={i * 0.08}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="glass rounded-2xl p-6 hover:bg-white/[0.08] transition-all group"
              >
                <div className="w-14 h-14 rounded-xl bg-[#1E8E3E]/15 flex items-center justify-center text-[#4ADE80] mb-4 group-hover:bg-[#1E8E3E]/25 transition-colors">
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold font-[Outfit] text-white mb-2">{f.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{f.desc}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- SPORTS PREVIEW ---------- */
function SportsPreviewSection({ setSport }: { setSport: (s: string) => void }) {
  return (
    <section className="section-padding relative">
      <div className="container">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#1E8E3E]/10 text-[#4ADE80] text-sm font-medium mb-4 border border-[#1E8E3E]/20">
              Our Sports
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-[Outfit] text-white">
              Choose Your <span className="text-gradient">Game</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {SPORTS.map((sport, i) => (
            <ScrollReveal key={sport.id} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                className="group relative rounded-2xl overflow-hidden cursor-pointer"
                onClick={() => { setSport(sport.id); }}
              >
                <img
                  src={sport.image}
                  alt={sport.name}
                  className="w-full h-48 md:h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F14] via-[#0B0F14]/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-xl font-bold font-[Outfit] text-white mb-1">{sport.name}</h3>
                  <p className="text-sm text-gray-300 mb-3">
                    {sport.features.slice(0, 2).join(" · ")}
                  </p>
                  <Link
                    href="/booking"
                    className="inline-flex items-center gap-1.5 text-[#4ADE80] text-sm font-semibold hover:gap-2 transition-all"
                    onClick={() => setSport(sport.id)}
                  >
                    Book {sport.name}
                    <span className="transition-transform group-hover:translate-x-0.5">→</span>
                  </Link>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- FACILITIES ---------- */
function FacilitiesSection() {
  return (
    <section className="section-padding relative">
      <div className="container">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#1E8E3E]/10 text-[#4ADE80] text-sm font-medium mb-4 border border-[#1E8E3E]/20">
              Our Facilities
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-[Outfit] text-white">
              Everything You <span className="text-gradient">Need</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {FACILITIES.map((facility, i) => (
            <ScrollReveal key={facility.name} delay={i * 0.04}>
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                className="glass rounded-xl p-4 text-center hover:bg-white/[0.08] transition-all"
              >
                <span className="text-2xl block mb-2">{facility.icon}</span>
                <h4 className="text-sm font-semibold text-white font-[Outfit]">{facility.name}</h4>
                <p className="text-xs text-gray-500 mt-1">{facility.desc}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- TESTIMONIALS ---------- */
function TestimonialsSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive(prev => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="section-padding relative">
      <div className="container max-w-3xl">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#1E8E3E]/10 text-[#4ADE80] text-sm font-medium mb-4 border border-[#1E8E3E]/20">
              Reviews
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-[Outfit] text-white">
              What Players <span className="text-gradient">Say</span>
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="glass rounded-2xl p-6 md:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                {/* Stars */}
                <div className="flex justify-center gap-1 mb-4">
                  {Array.from({ length: TESTIMONIALS[active].rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-[#FBBF24] fill-[#FBBF24]" />
                  ))}
                </div>
                <p className="text-lg md:text-xl text-gray-200 leading-relaxed mb-6 italic">
                  "{TESTIMONIALS[active].text}"
                </p>
                <p className="text-sm text-gray-400 font-medium">{TESTIMONIALS[active].name}</p>
              </motion.div>
            </AnimatePresence>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`w-2 h-2 rounded-full transition-all ${i === active ? "bg-[#4ADE80] w-6" : "bg-gray-600 hover:bg-gray-400"
                    }`}
                />
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ---------- STATISTICS ---------- */
function StatisticsSection({ countersRef, counters, ratingDecimal }: {
  countersRef: React.RefObject<HTMLDivElement | null>;
  counters: { rating: number; hours: number; sports: number; satisfaction: number };
  ratingDecimal: number;
}) {
  return (
    <section ref={countersRef} className="section-padding relative">
      <div className="container">
        <div className="glass rounded-2xl p-6 md:p-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: `${counters.rating}.${Math.round(ratingDecimal * 10)}★`, label: "Google Rating" },
              { value: `${counters.hours}`, suffix: " Hours", label: "Open Daily" },
              { value: `${counters.sports}`, suffix: "", label: "Sports Available" },
              { value: `${counters.satisfaction}`, suffix: "%", label: "Customer Satisfaction" },
            ].map((stat, i) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold font-[Outfit] text-[#4ADE80] mb-1">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Need AnimatePresence from framer-motion
import { AnimatePresence } from "framer-motion";
