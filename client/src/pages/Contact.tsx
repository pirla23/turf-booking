/* Design: Midnight Arena - Dark Athletic Luxury
   Premium contact page with WhatsApp, map, and form
   Mobile-first */

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, MessageCircle, Navigation, Clock, Instagram, Star, Send } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { WHATSAPP_NUMBER, GOOGLE_MAPS_LINK } from "@/lib/config";
import { useBooking } from "@/contexts/BookingContext";
import { toast } from "sonner";

export default function Contact() {
  const { getWhatsAppMessage } = useBooking();
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleWhatsAppContact = () => {
    const message = getWhatsAppMessage();
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, "_blank");
  };

  const handleCall = () => {
    window.open(`tel:+${WHATSAPP_NUMBER}`, "_self");
  };

  const handleDirections = () => {
    window.open(GOOGLE_MAPS_LINK, "_blank");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast.success("Message sent! We'll get back to you soon.");
      setFormData({ name: "", phone: "", email: "", message: "" });
    }, 1500);
  };

  return (
    <div className="pt-24 pb-10 min-h-screen">
      <div className="container max-w-5xl">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#1E8E3E]/10 text-[#4ADE80] text-sm font-medium mb-4 border border-[#1E8E3E]/20">
              Connect with Us
            </span>
            <h1 className="text-3xl md:text-5xl font-bold font-[Outfit] text-white mb-4">
              Get in <span className="text-gradient">Touch</span>
            </h1>
            <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
              Reach out to us anytime. We're available 24/7 to help you with bookings and inquiries.
            </p>
          </div>
        </ScrollReveal>

        {/* Action Cards */}
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {/* WhatsApp */}
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleWhatsAppContact}
              className="glass rounded-2xl p-6 text-left group hover:bg-white/[0.08] transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-[#25D366]/20 flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6 text-[#25D366]" />
              </div>
              <h3 className="text-lg font-bold font-[Outfit] text-white mb-1">WhatsApp</h3>
              <p className="text-sm text-gray-400 mb-2">Usually replies within a few minutes</p>
              <span className="text-[#25D366] text-sm font-medium group-hover:underline">Chat Now →</span>
            </motion.button>

            {/* Call */}
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCall}
              className="glass rounded-2xl p-6 text-left group hover:bg-white/[0.08] transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-[#1E8E3E]/20 flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-[#4ADE80]" />
              </div>
              <h3 className="text-lg font-bold font-[Outfit] text-white mb-1">Call Us</h3>
              <p className="text-sm text-gray-400 mb-2">Available 24/7 for bookings</p>
              <span className="text-[#4ADE80] text-sm font-medium group-hover:underline">Call Now →</span>
            </motion.button>

            {/* Directions */}
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleDirections}
              className="glass rounded-2xl p-6 text-left group hover:bg-white/[0.08] transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-4">
                <Navigation className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-bold font-[Outfit] text-white mb-1">Get Directions</h3>
              <p className="text-sm text-gray-400 mb-2">Navigate to our arena on Google Maps</p>
              <span className="text-blue-400 text-sm font-medium group-hover:underline">Open Maps →</span>
            </motion.button>
          </div>
        </ScrollReveal>

        {/* Map + Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          {/* Google Maps */}
          <ScrollReveal direction="left">
            <div className="glass rounded-2xl overflow-hidden h-80 lg:h-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.5!2d78.62!3d11.68!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sAttur%2C+Salem%2C+Tamil+Nadu!5e0!3m2!1sen!2sin!4v1"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) contrast(1.2)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-2xl"
              />
            </div>
          </ScrollReveal>

          {/* Contact Form */}
          <ScrollReveal direction="right">
            <div className="glass rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-bold font-[Outfit] text-white mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="glass rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1E8E3E]/50"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="glass rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1E8E3E]/50"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full glass rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1E8E3E]/50"
                />
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full glass rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1E8E3E]/50 resize-none"
                />
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full btn-gradient text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-xl shadow-[#1E8E3E]/20 disabled:opacity-50"
                >
                  {sending ? (
                    <span className="animate-pulse">Sending...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </ScrollReveal>
        </div>

        {/* Booking Coordinator Card */}
        <ScrollReveal>
          <div className="glass rounded-2xl p-6 md:p-8 mb-10">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1E8E3E] to-[#0D7332] flex items-center justify-center shadow-lg shadow-[#1E8E3E]/20">
                <Star className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-lg font-bold font-[Outfit] text-white">Booking Coordinator</h3>
                <p className="text-sm text-gray-400">Available 24 Hours · Usually replies within a few minutes</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleWhatsAppContact}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] text-white font-semibold text-sm hover:brightness-110 transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </button>
                <button
                  onClick={handleCall}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl glass text-white font-semibold text-sm hover:bg-white/10 transition-all"
                >
                  <Phone className="w-4 h-4" />
                  Call
                </button>
                <button
                  onClick={handleDirections}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl glass text-white font-semibold text-sm hover:bg-white/10 transition-all"
                >
                  <MapPin className="w-4 h-4" />
                  Location
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Location Details */}
        <ScrollReveal>
          <div className="glass rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-bold font-[Outfit] text-white mb-6">Location Details</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-[#4ADE80] mt-0.5 shrink-0" />
                <div>
                  <p className="text-white font-medium">AKAN'S ARENA (TURF)</p>
                  <p className="text-sm text-gray-400">Near Bharat Petroleum, Alagapuram, Periyapudhur, Attur, Salem (dt), Tamil Nadu, 636102</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="w-5 h-5 text-[#4ADE80] mt-0.5 shrink-0" />
                <div>
                  <p className="text-white font-medium">Working Hours</p>
                  <p className="text-sm text-gray-400">Open 24 Hours · 7 Days a Week</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Star className="w-5 h-5 text-[#FBBF24] mt-0.5 shrink-0" />
                <div>
                  <p className="text-white font-medium">Google Rating</p>
                  <p className="text-sm text-gray-400">4.9 / 5 (9+ Reviews)</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Instagram className="w-5 h-5 text-[#E4405F] mt-0.5 shrink-0" />
                <div>
                  <p className="text-white font-medium">Instagram</p>
                  <a href="https://instagram.com/akans_arena__" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-[#E4405F] transition-colors">
                    @akans_arena__
                  </a>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
