/* Design: Midnight Arena - Dark Athletic Luxury
   Premium sports cards with tilt effects and glassmorphism
   Mobile-first */

import { motion } from "framer-motion";
import { Link } from "wouter";
import { ChevronRight, Trophy, Moon, Sun, Target } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useBooking } from "@/contexts/BookingContext";
import { SPORTS, FACILITIES } from "@/lib/config";

export default function Sports() {
  const { setSport } = useBooking();

  return (
    <div className="pt-24 pb-10 min-h-screen">
      <div className="container max-w-5xl">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#1E8E3E]/10 text-[#4ADE80] text-sm font-medium mb-4 border border-[#1E8E3E]/20">
              Our Sports
            </span>
            <h1 className="text-3xl md:text-5xl font-bold font-[Outfit] text-white mb-4">
              Choose Your <span className="text-gradient">Game</span>
            </h1>
            <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
              Professional facilities for football, cricket, and pickleball. Each sport features
              premium synthetic turf, LED floodlights, and expert maintenance.
            </p>
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

                    {/* Price and CTA */}
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs text-gray-500">Starting from</span>
                        <div className="text-2xl font-bold font-[Outfit] text-[#4ADE80]">
                          ₹{sport.pricePerHour}
                          <span className="text-sm text-gray-400 font-normal">/hour</span>
                        </div>
                      </div>
                      <Link
                        href="/booking"
                        className="btn-gradient text-white font-semibold px-6 py-3 rounded-xl flex items-center gap-2 text-sm"
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

        {/* Comparison Table */}
        <ScrollReveal>
          <div className="mt-12">
            <h2 className="text-2xl font-bold font-[Outfit] text-white text-center mb-6">
              Facility Comparison
            </h2>
            <div className="glass rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left p-4 text-gray-400 font-medium">Feature</th>
                      <th className="text-center p-4 text-white font-[Outfit]">Football</th>
                      <th className="text-center p-4 text-white font-[Outfit]">Cricket</th>
                      <th className="text-center p-4 text-white font-[Outfit]">Pickleball</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Price/Hour", "₹800", "₹800", "₹600"],
                      ["Flood Lights", "✓", "✓", "✓"],
                      ["Equipment", "Provided", "Provided", "Provided"],
                      ["Night Play", "✓", "✓", "✓"],
                      ["Parking", "✓", "✓", "✓"],
                      ["Water Station", "✓", "✓", "✓"],
                    ].map(([feature, ...values], i) => (
                      <tr key={feature} className={`border-b border-white/[0.05] ${i % 2 === 0 ? "bg-white/[0.02]" : ""}`}>
                        <td className="p-4 text-gray-300 font-medium">{feature}</td>
                        {values.map((v, j) => (
                          <td key={j} className="p-4 text-center text-[#4ADE80]">{v}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
