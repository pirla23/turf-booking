/* Design: Midnight Arena - Dark Athletic Luxury
   Premium booking interface with slot selection
   Mobile-first, glassmorphic cards */

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import { Calendar, Clock, ChevronRight, CheckCircle2, MessageCircle, IndianRupee } from "lucide-react";
import { useBooking } from "@/contexts/BookingContext";
import BookingConfirmationDialog from "@/components/BookingConfirmationDialog";
import ScrollReveal from "@/components/ScrollReveal";
import { SPORTS, TIME_SLOTS, DURATION_OPTIONS, WHATSAPP_NUMBER, GOOGLE_MAPS_LINK } from "@/lib/config";
import { toast } from "sonner";

export default function Booking() {
  const { booking, setSport, setDate, setStartTime, setDuration, setSlots, setPlayerName, setPlayerCount, setPricePerHour, getWhatsAppMessage } = useBooking();
  const [showConfirm, setShowConfirm] = useState(false);
  const [location] = useLocation();

  const sport = SPORTS.find(s => s.id === booking.sport);

  // Simulate slot availability - some slots are booked/past
  const slotStatus = useMemo(() => {
    const now = new Date();
    const currentHour = now.getHours();
    return TIME_SLOTS.map((slot, i) => {
      const slotHour = i + 6; // 6 AM base
      if (slotHour < currentHour) return "past";
      // Simulate ~30% booked
      if ([2, 5, 9, 12, 15].includes(i)) return "booked";
      return "available";
    });
  }, [booking.date]);

  const selectedDuration = DURATION_OPTIONS.find(d => d.value === booking.duration);
  const basePrice = sport?.pricePerHour || 500;
  const hours = selectedDuration?.hours || 1;
  const subtotal = basePrice * hours;
  const gst = subtotal * 0.12;
  const total = subtotal + gst;

  const handleSlotClick = (index: number) => {
    if (slotStatus[index] !== "available") return;

    const currentSlots = [...booking.slots];
    const clickedSlot = index;

    // If we have a duration, select consecutive slots
    if (selectedDuration) {
      const newSlots: number[] = [];
      for (let i = 0; i < hours && clickedSlot + i < TIME_SLOTS.length; i++) {
        if (slotStatus[clickedSlot + i] !== "available" && !currentSlots.includes(TIME_SLOTS[clickedSlot + i])) return;
        newSlots.push(clickedSlot + i);
      }
      if (newSlots.length === hours) {
        setSlots(newSlots.map(s => TIME_SLOTS[s]));
        setStartTime(TIME_SLOTS[clickedSlot]);
      }
    } else {
      if (currentSlots.includes(TIME_SLOTS[clickedSlot])) {
        setSlots(currentSlots.filter(s => s !== TIME_SLOTS[clickedSlot]));
      } else {
        setSlots([...currentSlots, TIME_SLOTS[clickedSlot]]);
      }
    }
  };

  const handleWhatsAppBooking = () => {
    const message = getWhatsAppMessage();
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, "_blank");
    setShowConfirm(false);
    toast.success("Opening WhatsApp...");
  };

  const isReady = booking.sport && booking.date && booking.startTime && booking.duration;

  return (
    <div className="pt-24 pb-28 lg:pb-10 min-h-screen">
      <div className="container max-w-4xl">
        <ScrollReveal>
          <div className="text-center mb-8">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#1E8E3E]/10 text-[#4ADE80] text-sm font-medium mb-4 border border-[#1E8E3E]/20">
              Book Your Slot
            </span>
            <h1 className="text-3xl md:text-5xl font-bold font-[Outfit] text-white">
              Reserve <span className="text-gradient">Your Arena</span>
            </h1>
            <p className="text-gray-400 mt-2 text-sm md:text-base">Select your sport, date, and time to book instantly.</p>
          </div>
        </ScrollReveal>

        {/* Step 1: Sport Selection */}
        <ScrollReveal>
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#1E8E3E] flex items-center justify-center text-white text-sm font-bold">1</div>
              <h2 className="text-lg font-bold font-[Outfit] text-white">Choose Sport</h2>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {SPORTS.map((s) => (
                <motion.button
                  key={s.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSport(s.id);
                    setPricePerHour(s.pricePerHour);
                    setSlots([]);
                  }}
                  className={`glass rounded-2xl p-4 text-center transition-all ${
                    booking.sport === s.id
                      ? "border-[#1E8E3E]/50 bg-[#1E8E3E]/10 shadow-lg shadow-[#1E8E3E]/10"
                      : "hover:bg-white/[0.08]"
                  }`}
                >
                  <img src={s.image} alt={s.name} className="w-full h-20 md:h-28 object-cover rounded-xl mb-3" />
                  <span className="text-sm font-semibold text-white font-[Outfit]">{s.name}</span>
                  <span className="block text-xs text-[#4ADE80] mt-1">₹{s.pricePerHour}/hr</span>
                </motion.button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Step 2: Date Selection */}
        {booking.sport && (
          <ScrollReveal>
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-[#1E8E3E] flex items-center justify-center text-white text-sm font-bold">2</div>
                <h2 className="text-lg font-bold font-[Outfit] text-white">Select Date</h2>
              </div>
              <input
                type="date"
                min={new Date().toISOString().split("T")[0]}
                value={booking.date}
                onChange={(e) => { setDate(e.target.value); setSlots([]); }}
                className="w-full glass rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1E8E3E]/50 appearance-none cursor-pointer"
                style={{ colorScheme: "dark" }}
              />
            </div>
          </ScrollReveal>
        )}

        {/* Step 3: Duration */}
        {booking.date && (
          <ScrollReveal>
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-[#1E8E3E] flex items-center justify-center text-white text-sm font-bold">3</div>
                <h2 className="text-lg font-bold font-[Outfit] text-white">Duration</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {DURATION_OPTIONS.map((d) => (
                  <motion.button
                    key={d.value}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setDuration(d.value)}
                    className={`glass rounded-xl p-3 text-center transition-all ${
                      booking.duration === d.value
                        ? "border-[#1E8E3E]/50 bg-[#1E8E3E]/10 shadow-lg shadow-[#1E8E3E]/10"
                        : "hover:bg-white/[0.08]"
                    }`}
                  >
                    <span className="text-lg font-bold text-white font-[Outfit]">{d.hours}</span>
                    <span className="text-xs text-gray-400 ml-1">Hour{d.hours > 1 ? "s" : ""}</span>
                    <span className="block text-xs text-[#4ADE80] mt-1">₹{basePrice * d.hours}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Step 4: Slot Selection */}
        {booking.duration && (
          <ScrollReveal>
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-[#1E8E3E] flex items-center justify-center text-white text-sm font-bold">4</div>
                <h2 className="text-lg font-bold font-[Outfit] text-white">Select Time Slot</h2>
              </div>

              {/* Legend */}
              <div className="flex gap-4 mb-4 text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-[#1E8E3E]/30 border border-[#1E8E3E]/50" />
                  <span className="text-gray-400">Available</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-red-500/20 border border-red-500/30" />
                  <span className="text-gray-400">Booked</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-gray-500/20 border border-gray-500/20" />
                  <span className="text-gray-400">Past</span>
                </div>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                {TIME_SLOTS.map((slot, i) => {
                  const status = slotStatus[i];
                  const isSelected = booking.slots.includes(slot);
                  return (
                    <motion.button
                      key={slot}
                      whileTap={status === "available" ? { scale: 0.95 } : undefined}
                      onClick={() => handleSlotClick(i)}
                      disabled={status === "past"}
                      className={`rounded-xl p-3 text-center text-xs font-medium transition-all ${
                        status === "available" && isSelected
                          ? "slot-selected text-white"
                          : status === "available"
                          ? "slot-available text-gray-300"
                          : status === "booked"
                          ? "slot-booked text-red-400"
                          : "slot-past text-gray-600"
                      } ${status === "past" ? "cursor-not-allowed" : ""}`}
                    >
                      <span className="font-semibold">{slot}</span>
                      {isSelected && <CheckCircle2 className="w-3 h-3 mx-auto mt-1 text-[#4ADE80]" />}
                      {status === "booked" && <span className="text-[8px] block mt-1">Booked</span>}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Booking Summary (Sticky) */}
        {isReady && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-0 left-0 right-0 lg:relative lg:bottom-auto lg:mb-12 z-40"
          >
            <div className="glass-strong border-t lg:border border-white/10 rounded-t-2xl lg:rounded-2xl p-4 md:p-6 max-w-4xl mx-auto">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="w-5 h-5 text-[#4ADE80]" />
                <h3 className="text-sm font-bold font-[Outfit] text-white">Booking Summary</h3>
              </div>
              <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Sport</span>
                  <span className="text-white font-medium capitalize">{booking.sport}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Date</span>
                  <span className="text-white font-medium">{booking.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Time</span>
                  <span className="text-white font-medium">{booking.startTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Duration</span>
                  <span className="text-white font-medium">{booking.duration} Hour{booking.duration !== "1" ? "s" : ""}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="text-white">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">GST (12%)</span>
                  <span className="text-white">₹{gst.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                </div>
                <div className="col-span-2 flex justify-between pt-2 border-t border-white/10">
                  <span className="text-white font-bold font-[Outfit]">Total</span>
                  <span className="text-[#4ADE80] font-bold font-[Outfit] text-lg">₹{total.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                </div>
              </div>

              {/* Player details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={booking.playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="glass rounded-lg px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1E8E3E]/50"
                />
                <input
                  type="number"
                  placeholder="Number of Players"
                  value={booking.playerCount}
                  onChange={(e) => setPlayerCount(e.target.value)}
                  className="glass rounded-lg px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1E8E3E]/50"
                />
              </div>

              <button
                onClick={() => setShowConfirm(true)}
                className="w-full btn-gradient text-white font-semibold py-4 rounded-xl text-lg flex items-center justify-center gap-2 shadow-xl shadow-[#1E8E3E]/20"
              >
                <MessageCircle className="w-5 h-5" />
                Book via WhatsApp
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Booking Confirmation Dialog */}
        <BookingConfirmationDialog
          open={showConfirm}
          onClose={() => setShowConfirm(false)}
          onConfirm={handleWhatsAppBooking}
          booking={booking}
        />
      </div>

      {/* WhatsApp Floating Button */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi! I'd like to book a slot at AKAN'S ARENA.")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-24 lg:bottom-8 right-4 lg:right-8 z-50 w-14 h-14 rounded-full bg-[#25D366] shadow-lg flex items-center justify-center group hover:scale-110 transition-transform"
        style={{ animation: "pulse 2s infinite" }}
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </a>
    </div>
  );
}
