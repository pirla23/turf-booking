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
import { SPORTS, DURATION_OPTIONS, WHATSAPP_NUMBER, GOOGLE_MAPS_LINK } from "@/lib/config";
import { toast } from "sonner";

const AM_SLOTS = ["1:00 AM", "2:00 AM", "3:00 AM", "4:00 AM", "5:00 AM", "6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM"];
const PM_SLOTS = ["1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM", "11:00 PM", "12:00 AM"];

export default function Booking() {
  const { booking, setSport, setDate, setSession, setStartTime, setEndTime, setDuration, setSlots, setPlayerName, setEmail, setMobile, setPlayerCount, setPricePerHour, getWhatsAppMessage } = useBooking();
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSummary, setShowSummary] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [location] = useLocation();

  const sport = SPORTS.find(s => s.id === booking.sport);
  const selectedDuration = DURATION_OPTIONS.find(d => d.value === booking.duration);
  const basePrice = sport?.pricePerHour || 500;
  const hours = selectedDuration?.hours || 1;
  const total = basePrice * hours;

  // We are skipping the past slots logic for simplicity here, 
  // as the user requested specific AM/PM sections and custom times.
  const handleSlotClick = (slot: string) => {
    setStartTime(slot);
    setSlots([slot]); // for simplicity, store the start time as the slot
  };

  const handleBookingSubmit = async () => {
    // Validation
    if (!booking.playerName) return toast.error("Full Name is required");
    if (!booking.mobile) return toast.error("Mobile Number is required");
    if (booking.mobile.length < 10) return toast.error("Please enter a valid mobile number");
    if (booking.email && !booking.email.toLowerCase().endsWith("@gmail.com")) {
      return toast.error("If email is provided, it must be a valid @gmail.com address");
    }
    if (booking.session === "Custom" && (!booking.startTime || !booking.endTime)) {
      return toast.error("Please enter both custom start and end times");
    }
    if (!booking.startTime) return toast.error("Please select a time slot");

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          playerName: booking.playerName,
          email: booking.email || null,
          mobile: booking.mobile,
          sport: booking.sport,
          date: booking.date,
          startTime: booking.startTime,
          endTime: booking.session === "Custom" ? booking.endTime : null,
          duration: hours,
          session: booking.session,
          status: "pending"
        })
      });

      if (!res.ok) throw new Error("Failed to create booking");

      toast.success("Booking confirmed! The admin has been notified.");
      setShowConfirm(true); // show dialog with WhatsApp option
    } catch (e) {
      toast.error("Failed to book slot. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppBooking = () => {
    const message = getWhatsAppMessage();
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, "_blank");
    setShowConfirm(false);
  };

  const isReady = booking.sport && booking.date && (booking.startTime && (booking.session !== "Custom" || booking.endTime));

  return (
    <div className="pt-24 pb-6 lg:pb-10 min-h-screen">
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
                    setSession("");
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
              <div className="relative">
                <input
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  value={booking.date}
                  onChange={(e) => { setDate(e.target.value); setSession(""); }}
                  className={`w-full glass rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E8E3E]/50 cursor-pointer ${booking.date ? 'text-white' : 'text-transparent'}`}
                  style={{ colorScheme: "dark" }}
                />
                {!booking.date && (
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400 pointer-events-none">
                    Tap here to select a date
                  </span>
                )}
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Step 3: Session & Time Selection */}
        {booking.date && (
          <ScrollReveal>
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-[#1E8E3E] flex items-center justify-center text-white text-sm font-bold">3</div>
                <h2 className="text-lg font-bold font-[Outfit] text-white">Select Timing</h2>
              </div>
              
              <div className="flex gap-2 mb-4 p-1 bg-white/5 rounded-xl">
                {["AM", "PM", "Custom"].map(ses => (
                  <button
                    key={ses}
                    onClick={() => setSession(ses)}
                    className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${
                      booking.session === ses 
                      ? "bg-[#1E8E3E] text-white shadow-md"
                      : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {ses} {ses !== "Custom" && "Session"}
                  </button>
                ))}
              </div>

              {booking.session === "AM" && (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                  {AM_SLOTS.map((slot) => (
                    <motion.button
                      key={slot}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSlotClick(slot)}
                      className={`rounded-xl p-3 text-center text-xs font-medium transition-all ${
                        booking.startTime === slot
                          ? "slot-selected text-white"
                          : "slot-available text-gray-300"
                      }`}
                    >
                      <span className="font-semibold">{slot}</span>
                    </motion.button>
                  ))}
                </div>
              )}

              {booking.session === "PM" && (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                  {PM_SLOTS.map((slot) => (
                    <motion.button
                      key={slot}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSlotClick(slot)}
                      className={`rounded-xl p-3 text-center text-xs font-medium transition-all ${
                        booking.startTime === slot
                          ? "slot-selected text-white"
                          : "slot-available text-gray-300"
                      }`}
                    >
                      <span className="font-semibold">{slot}</span>
                    </motion.button>
                  ))}
                </div>
              )}

              {booking.session === "Custom" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 glass rounded-xl">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Start Time</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Time"
                        value={booking.startTime.replace(/(AM|PM)\s*$/i, "").trim()}
                        onChange={(e) => {
                          const time = e.target.value;
                          const period = booking.startTime.match(/(AM|PM)$/i)?.[0] || "PM";
                          setStartTime(`${time} ${period}`);
                        }}
                        className="w-full glass rounded-lg px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1E8E3E]/50 border border-white/10"
                      />
                      <select
                        value={booking.startTime.match(/(AM|PM)$/i)?.[0] || "PM"}
                        onChange={(e) => {
                          const time = booking.startTime.replace(/(AM|PM)\s*$/i, "").trim() || "8:00";
                          setStartTime(`${time} ${e.target.value}`);
                        }}
                        className="glass rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1E8E3E]/50 border border-white/10"
                      >
                        <option value="AM" className="text-black">AM</option>
                        <option value="PM" className="text-black">PM</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">End Time</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Time"
                        value={booking.endTime.replace(/(AM|PM)\s*$/i, "").trim()}
                        onChange={(e) => {
                          const time = e.target.value;
                          const period = booking.endTime.match(/(AM|PM)$/i)?.[0] || "AM";
                          setEndTime(`${time} ${period}`);
                        }}
                        className="w-full glass rounded-lg px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1E8E3E]/50 border border-white/10"
                      />
                      <select
                        value={booking.endTime.match(/(AM|PM)$/i)?.[0] || "AM"}
                        onChange={(e) => {
                          const time = booking.endTime.replace(/(AM|PM)\s*$/i, "").trim() || "10:00";
                          setEndTime(`${time} ${e.target.value}`);
                        }}
                        className="glass rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1E8E3E]/50 border border-white/10"
                      >
                        <option value="AM" className="text-black">AM</option>
                        <option value="PM" className="text-black">PM</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollReveal>
        )}

        {/* Step 4: Duration (Only for AM/PM since Custom implies duration) */}
        {booking.session && booking.session !== "Custom" && booking.startTime && (
          <ScrollReveal>
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-[#1E8E3E] flex items-center justify-center text-white text-sm font-bold">4</div>
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

        {/* Spacer for mobile summary */}
        {isReady && <div className="h-8 lg:hidden" />}

        {/* Booking Summary - Mobile Collapsible, Desktop Sticky */}
        {isReady && (
          <>
            {/* Mobile: Fixed Bottom Summary with Toggle */}
            <AnimatePresence>
              {showSummary && (
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  transition={{ type: "spring", damping: 30, stiffness: 300 }}
                  className="fixed bottom-0 left-0 right-0 lg:hidden z-50 safe-bottom"
                >
                  <div className="glass-strong border-t border-white/10 rounded-t-3xl p-5 shadow-2xl bg-[#0B0F14]/95 backdrop-blur-xl">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-[#4ADE80]" />
                        <h3 className="text-base font-bold font-[Outfit] text-white">Booking Summary</h3>
                      </div>
                      <button onClick={() => setShowSummary(false)} className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                        <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                      <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                        <span className="text-gray-400 text-xs block mb-1">Sport & Date</span>
                        <span className="text-white font-semibold capitalize block">{booking.sport}</span>
                        <span className="text-gray-300 text-xs">{booking.date}</span>
                      </div>
                      <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                        <span className="text-gray-400 text-xs block mb-1">Timing</span>
                        <span className="text-white font-semibold block">{booking.session === "Custom" ? `${booking.startTime} - ${booking.endTime}` : booking.startTime}</span>
                        <span className="text-gray-300 text-xs">{booking.session !== "Custom" ? `${booking.duration} Hour(s)` : "Custom"}</span>
                      </div>
                    </div>

                    {booking.session !== "Custom" && (
                      <div className="flex items-center justify-between mb-4 p-3 rounded-xl bg-[#1E8E3E]/10 border border-[#1E8E3E]/30">
                        <span className="text-white font-bold font-[Outfit]">Total Amount</span>
                        <span className="text-[#4ADE80] font-bold font-[Outfit] text-xl">₹{total.toLocaleString()}</span>
                      </div>
                    )}

                    <div className="space-y-3 mb-4">
                      <input
                        type="text"
                        placeholder="Full Name (Required)"
                        value={booking.playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                        className="w-full glass rounded-lg px-3 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1E8E3E]/50 border border-white/10"
                      />
                      <input
                        type="tel"
                        placeholder="Mobile Number (Required)"
                        value={booking.mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        className="w-full glass rounded-lg px-3 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1E8E3E]/50 border border-white/10"
                      />
                      <input
                        type="email"
                        placeholder="Email @gmail.com (Optional)"
                        value={booking.email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full glass rounded-lg px-3 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1E8E3E]/50 border border-white/10"
                      />
                    </div>

                    <button
                      onClick={handleBookingSubmit}
                      disabled={isSubmitting}
                      className="w-full btn-gradient text-white font-semibold py-3.5 rounded-xl text-base flex items-center justify-center gap-2 shadow-xl shadow-[#1E8E3E]/30 disabled:opacity-50"
                    >
                      {isSubmitting ? "Processing..." : "Confirm Booking"}
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {!showSummary && (
              <motion.button
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                onClick={() => setShowSummary(true)}
                className="fixed bottom-4 left-1/2 -translate-x-1/2 lg:hidden z-50 btn-gradient px-6 py-3 rounded-full shadow-xl flex items-center gap-2 text-white font-semibold"
              >
                <CheckCircle2 className="w-5 h-5" />
                View Summary
              </motion.button>
            )}

            {/* Desktop: Sticky Summary */}
            <ScrollReveal>
              <div className="hidden lg:block sticky top-24 mb-12">
                <div className="glass-strong border border-white/10 rounded-2xl p-6 shadow-2xl bg-[#0B0F14]/80 backdrop-blur-xl">
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
                    <div className="flex justify-between col-span-2">
                      <span className="text-gray-400">Timing</span>
                      <span className="text-white font-medium">{booking.session === "Custom" ? `${booking.startTime} - ${booking.endTime}` : booking.startTime}</span>
                    </div>
                    {booking.session !== "Custom" && (
                      <div className="col-span-2 flex justify-between pt-2 border-t border-white/10">
                        <span className="text-white font-bold font-[Outfit]">Total</span>
                        <span className="text-[#4ADE80] font-bold font-[Outfit] text-lg">₹{total.toLocaleString()}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3 mb-4">
                    <input
                      type="text"
                      placeholder="Full Name (Required)"
                      value={booking.playerName}
                      onChange={(e) => setPlayerName(e.target.value)}
                      className="w-full glass rounded-lg px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1E8E3E]/50"
                    />
                    <input
                      type="tel"
                      placeholder="Mobile Number (Required)"
                      value={booking.mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      className="w-full glass rounded-lg px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1E8E3E]/50"
                    />
                    <input
                      type="email"
                      placeholder="Email ending in @gmail.com (Optional)"
                      value={booking.email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full glass rounded-lg px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1E8E3E]/50"
                    />
                  </div>

                  <button
                    onClick={handleBookingSubmit}
                    disabled={isSubmitting}
                    className="w-full btn-gradient text-white font-semibold py-4 rounded-xl text-lg flex items-center justify-center gap-2 shadow-xl shadow-[#1E8E3E]/20 disabled:opacity-50"
                  >
                    {isSubmitting ? "Processing..." : "Confirm Booking"}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </ScrollReveal>
          </>
        )}

        {/* Booking Confirmation Dialog (Shows after DB save) */}
        <BookingConfirmationDialog
          open={showConfirm}
          onClose={() => setShowConfirm(false)}
          onConfirm={handleWhatsAppBooking}
          booking={booking}
        />
      </div>

    </div>
  );
}
