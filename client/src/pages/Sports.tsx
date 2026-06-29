/* Design: Midnight Arena - Dark Athletic Luxury
   Premium sports cards with tilt effects and glassmorphism
   Mobile-first */

import { motion } from "framer-motion";
import { Link } from "wouter";
import { ChevronRight, Trophy, Moon, Sun, Target, Phone, MessageCircle, Instagram } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useBooking } from "@/contexts/BookingContext";
import { SPORTS, FACILITIES, WHATSAPP_NUMBER } from "@/lib/config";

export default function Sports() {
  const { setSport } = useBooking();

  return (
    <div className="pt-24 pb-20 lg:pb-10 min-h-screen">
      <div className="container max-w-5xl">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#1E8E3E]/10 text-[#4ADE80] text-sm font-medium mb-4 border border-[#1E8E3E]/20">
              Our Sports
            </span>
            <h1 className="text-3xl md:text-5xl font-bold font-[Outfit] text-white mb-4">
              Choose Your <span className="text-gradient">Game</span>
            </h1>
            <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto mb-6">
              Professional facilities for football, cricket, and pickleball. Each sport features
              premium synthetic turf, LED floodlights, and expert maintenance.
            </p>
            <div className="flex justify-center gap-6">
              <a href={`tel:+${WHATSAPP_NUMBER}`} className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-[#4ADE80]" />
                Call
              </a>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors">
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                WhatsApp
              </a>
              <a href="https://instagram.com/akans_arena__" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors">
                <Instagram className="w-4 h-4 text-[#E4405F]" />
                Instagram
              </a>
            </div>
          </div>
        </ScrollReveal>

        {/* Sports Cards */}
        <div className="space-y-6 md:space-y-8">
          {SPORTS.map((sport: typeof SPORTS[0], i: number) => (
            <ScrollReveal key={sport.id} delay={i * 0.15}>
              <motion.div
                whileHover={{ scale: 1.01, y: -3 }}
                className="group relative glass rounded-2xl md:rounded-3xl overflow-hidden"
              >
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Image */}
                  <div className="relative h-48 md:h-72 overflow-hidden">
                    <img
                      src={sport.image}
                      alt={sport.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F14]/80 to-transparent md:bg-gradient-to-r" />
                    <div className="absolute bottom-4 left-4 md:hidden">
                      <h2 className="text-2xl font-bold font-[Outfit] text-white">{sport.name}</h2>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8 flex flex-col justify-center">
                    <h2 className="text-2xl md:text-3xl font-bold font-[Outfit] text-white hidden md:block mb-3">
                      {sport.name}
                    </h2>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                      {sport.description}
                    </p>

                    {/* Features */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {sport.features.map((feature: string) => (
                        <div key={feature} className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-[#4ADE80]" />
                          <span className="text-xs text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center justify-end">
                      <Link
                        href="/booking"
                        className="btn-gradient text-white font-semibold px-6 py-3 rounded-xl flex items-center gap-2 text-sm shadow-xl shadow-[#1E8E3E]/20"
                        onClick={() => setSport(sport.id)}
                      >
                        Book Now
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Tournament Hosting Section */}
        <ScrollReveal>
          <div className="mt-16">
            <div className="glass rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-5 bg-[#0B0F14]">
              {/* Image Section */}
              <div className="lg:col-span-2 relative flex items-center justify-center bg-[#05080b]">
                <img src="/tournament-bg.png" alt="Tournament at Akan's Arena" className="w-full h-auto object-contain max-h-[300px] lg:max-h-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F14] via-[#0B0F14]/20 to-transparent lg:hidden pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0B0F14] to-transparent hidden lg:block pointer-events-none" />
              </div>
              
              {/* Content Section */}
              <div className="lg:col-span-3 p-8 md:p-12 lg:p-16 flex flex-col md:flex-row gap-10 items-center justify-between z-10 relative">
                <div className="max-w-xl">
                  <span className="inline-block px-4 py-1.5 rounded-full bg-[#1E8E3E]/20 text-[#4ADE80] text-sm font-medium mb-4 border border-[#1E8E3E]/30">
                    Premium Events
                  </span>
                  <h2 className="text-3xl md:text-5xl font-bold font-[Outfit] text-white mb-6 leading-tight">
                    Host Your <span className="text-gradient">Tournament</span>
                  </h2>
                  <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                    Organize professional tournaments, corporate events, and league matches at AKAN'S ARENA.
                  </p>
                  <div className="grid grid-cols-2 gap-y-4 gap-x-8 mb-8">
                    {[
                      "Football", "Cricket", "Pickleball", "Corporate Events", 
                      "School Events", "College Events", "League Matches", "Weekend Cups"
                    ].map(item => (
                      <div key={item} className="flex items-center gap-2 text-sm text-gray-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#4ADE80]" />
                        {item}
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hello AKAN'S ARENA, I would like to organize a tournament. Please share the details.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-gradient text-white font-semibold px-6 py-3.5 rounded-xl flex items-center gap-2 shadow-xl shadow-[#1E8E3E]/30"
                    >
                      <MessageCircle className="w-5 h-5" />
                      Contact via WhatsApp
                    </a>
                    <a
                      href={`tel:+${WHATSAPP_NUMBER}`}
                      className="glass text-white font-semibold px-6 py-3.5 rounded-xl flex items-center gap-2 hover:bg-white/10 transition-all"
                    >
                      <Phone className="w-5 h-5" />
                      Call Us
                    </a>
                  </div>
                </div>
                
                <div className="w-full md:w-auto glass p-6 md:p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
                  <h3 className="text-xl font-bold font-[Outfit] text-white mb-6 whitespace-nowrap">Tournament Features</h3>
                  <div className="space-y-4">
                    {[
                      "Professional Lighting", "Ample Parking Space", 
                      "Spectator Seating", "Score Assistance", "Flexible Scheduling"
                    ].map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-[#1E8E3E]/20 flex items-center justify-center shrink-0">
                          <svg className="w-3.5 h-3.5 text-[#4ADE80]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-300 font-medium whitespace-nowrap">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
