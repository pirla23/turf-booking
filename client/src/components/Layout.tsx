import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Star, MapPin, Clock, MessageCircle, Phone, ChevronUp } from "lucide-react";
import { useBooking } from "@/contexts/BookingContext";
import Footer from "./Footer";

const WHATSAPP_NUMBER = "919894539465";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Sports", path: "/sports" },
  { label: "Booking", path: "/booking" },
  { label: "Contact", path: "/contact" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [location] = useLocation();
  const { getWhatsAppMessage, booking } = useBooking();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 50);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollY / docHeight) * 100 : 0);
      setShowBackToTop(scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [mobileMenuOpen]);

  const handleWhatsAppClick = useCallback(() => {
    const message = getWhatsAppMessage();
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, "_blank");
  }, [getWhatsAppMessage]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const hasBookingDetails = !!(booking.sport || booking.date);

  return (
    <div className="min-h-screen bg-[#0B0F14] text-white relative">
      {/* 3D Animated Background */}
      <AnimatedBackground />

      {/* Scroll Progress */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      {/* Navbar */}
      <Navbar scrolled={scrolled} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden"
            style={{ top: '64px' }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 h-full w-72 bg-[#0B0F14] border-l border-white/10 shadow-2xl overflow-y-auto"
            >
              <div className="p-6">
                <div className="space-y-2 mb-6">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      href={item.path}
                      className={`block px-4 py-3 rounded-xl text-base font-medium transition-all ${
                        location === item.path
                          ? "bg-[#1E8E3E]/20 text-[#4ADE80] border border-[#1E8E3E]/30"
                          : "text-gray-300 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                  }}
                  className="w-full btn-gradient text-white font-semibold py-3 rounded-xl text-base"
                >
                  Book Now
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="relative z-10 pb-20 lg:pb-0">
        {children}
        <Footer />
      </main>

      {/* Bottom Mobile Nav */}
      <MobileBottomNav />

      {/* Floating WhatsApp Button (hide on booking page to avoid conflict with booking button) */}
      {location !== "/booking" && (
        <motion.button
          onClick={handleWhatsAppClick}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.5, type: "spring" }}
          className="fixed bottom-20 lg:bottom-8 right-4 lg:right-8 z-50 w-14 h-14 rounded-full bg-[#25D366] shadow-lg whatsapp-pulse flex items-center justify-center group"
        >
          <MessageCircle className="w-7 h-7 text-white" />
          <span className="absolute right-16 bg-white text-gray-900 text-sm font-medium px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg pointer-events-none">
            Chat with Booking Coordinator
          </span>
        </motion.button>
      )}

      {/* Back to Top - Desktop only */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="hidden lg:flex fixed bottom-24 right-8 z-50 w-10 h-10 rounded-full glass items-center justify-center hover:bg-white/10 transition-all"
          >
            <ChevronUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- Navbar ---------- */
function Navbar({ scrolled, mobileMenuOpen, setMobileMenuOpen }: {
  scrolled: boolean; mobileMenuOpen: boolean; setMobileMenuOpen: (v: boolean) => void;
}) {
  const [location] = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0B0F14] border-b border-white/10 shadow-lg">
      <div className="container flex items-center justify-between py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <img
            src="/logo.png"
            alt="Akan's Arena Logo"
            className="w-10 h-10 object-contain rounded-lg shadow-lg shadow-[#1E8E3E]/20 group-hover:shadow-[#1E8E3E]/40 transition-shadow"
          />
          <div>
            <span className="text-lg font-bold font-[Outfit] tracking-tight text-white">AKAN'S ARENA</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                location === item.path
                  ? "text-[#4ADE80] bg-[#1E8E3E]/10"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Link href="/booking" className="btn-gradient text-white font-semibold px-6 py-2.5 rounded-xl text-sm">
            Book Your Slot
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
    </header>
  );
}

/* ---------- Mobile Bottom Nav ---------- */
function MobileBottomNav() {
  const [location] = useLocation();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrolledToBottom = windowHeight + scrollTop >= documentHeight - 100;
      setShow(scrolledToBottom);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial position
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.nav
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: "spring", damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-40 lg:hidden glass-strong border-t border-white/10"
          style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
        >
          <div className="flex items-center justify-around py-2 px-2">
            {[
              { label: "Home", path: "/", icon: "🏠" },
              { label: "Sports", path: "/sports", icon: "🏟️" },
              { label: "Booking", path: "/booking", icon: "📅" },
              { label: "Contact", path: "/contact", icon: "📞" },
            ].map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl transition-all min-w-[60px] ${
                  location === item.path
                    ? "text-[#4ADE80] scale-105"
                    : "text-gray-500 hover:text-gray-300"
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-[10px] font-medium">{item.label}</span>
                {location === item.path && (
                  <motion.div
                    layoutId="bottom-nav-indicator"
                    className="absolute bottom-1 w-8 h-1 rounded-full bg-[#1E8E3E]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

/* ---------- 3D Animated Background ---------- */
function AnimatedBackground() {
  return (
    <div className="bg-3d">
      {/* Floating orbs */}
      <div
        className="bg-3d-orb w-[600px] h-[600px] bg-[#1E8E3E]"
        style={{
          top: "-10%",
          left: "-10%",
          animation: "float-slow 15s ease-in-out infinite",
          opacity: 0.12,
        }}
      />
      <div
        className="bg-3d-orb w-[400px] h-[400px] bg-[#4ADE80]"
        style={{
          top: "50%",
          right: "-5%",
          animation: "float 20s ease-in-out infinite",
          opacity: 0.08,
        }}
      />
      <div
        className="bg-3d-orb w-[500px] h-[500px] bg-[#0D7332]"
        style={{
          bottom: "-15%",
          left: "30%",
          animation: "float-slow 18s ease-in-out infinite reverse",
          opacity: 0.1,
        }}
      />
      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(30, 142, 62, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(30, 142, 62, 0.3) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
}
