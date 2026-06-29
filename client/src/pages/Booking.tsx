import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, CheckCircle2, Calendar as CalendarIcon, Clock, Info } from "lucide-react";
import { useBooking } from "@/contexts/BookingContext";
import ScrollReveal from "@/components/ScrollReveal";
import { SPORTS, WHATSAPP_NUMBER } from "@/lib/config";
import { toast } from "sonner";

export default function Booking() {
  const { booking, setSport, setDate, setStartTime, setEndTime, setDuration, setPlayerName, setEmail, setMobile } = useBooking();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"none" | "checking" | "Available" | "Booked">("none");

  const dateSectionRef = useRef<HTMLDivElement>(null);
  const timeSectionRef = useRef<HTMLDivElement>(null);
  const detailsSectionRef = useRef<HTMLDivElement>(null);

  // Calculate duration automatically
  useEffect(() => {
    if (booking.startTime && booking.endTime) {
      try {
        const start = new Date(`2000-01-01T${booking.startTime}`);
        const end = new Date(`2000-01-01T${booking.endTime}`);
        let diffHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
        if (diffHours < 0) diffHours += 24; // Cross midnight
        
        if (diffHours > 0) {
          setDuration(diffHours.toString());
        }
      } catch (e) {
        // Invalid time
      }
    }
  }, [booking.startTime, booking.endTime, setDuration]);

  // Simulate availability check
  useEffect(() => {
    if (booking.sport && booking.date && booking.startTime && booking.endTime) {
      setStatus("checking");
      const timer = setTimeout(() => {
        setStatus("Available"); // Assuming always available for demo, but gives the feel
      }, 600);
      return () => clearTimeout(timer);
    } else {
      setStatus("none");
    }
  }, [booking.sport, booking.date, booking.startTime, booking.endTime]);

  const handleBookingSubmit = () => {
    // Validation
    if (!booking.playerName) return toast.error("Full Name is required");
    if (!booking.mobile) return toast.error("Mobile Number is required");
    if (booking.mobile.length < 10) return toast.error("Please enter a valid mobile number");
    if (!booking.sport) return toast.error("Please select a sport");
    if (!booking.date) return toast.error("Please select a date");
    if (!booking.startTime || !booking.endTime) return toast.error("Please select start and end time");
    
    if (status !== "Available") return toast.error("Selected slot is not available");

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      
      const formatTime = (timeStr: string) => {
        try {
          const [h, m] = timeStr.split(':');
          let hours = parseInt(h);
          const ampm = hours >= 12 ? 'PM' : 'AM';
          hours = hours % 12;
          hours = hours ? hours : 12; 
          return `${hours}:${m} ${ampm}`;
        } catch {
          return timeStr;
        }
      };

      const message = `Hello AKAN'S ARENA,
I would like to book a slot for verification.

Sport: ${booking.sport}
Date: ${booking.date}
Time: ${formatTime(booking.startTime)} - ${formatTime(booking.endTime)}
Duration: ${booking.duration} Hour(s)

Name: ${booking.playerName}
Phone: ${booking.mobile}
${booking.email ? `Email: ${booking.email}` : ''}

Please confirm if this slot is available.`;

      const encoded = encodeURIComponent(message);
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, "_blank");
    }, 500);
  };

  const isReady = booking.sport && booking.date && booking.startTime && booking.endTime;

  return (
    <div className="pt-24 pb-24 lg:pb-10 min-h-screen">
      <div className="container max-w-4xl">
        <ScrollReveal>
          <div className="text-center mb-8">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#1E8E3E]/10 text-[#4ADE80] text-sm font-medium mb-4 border border-[#1E8E3E]/20">
              Book Your Slot
            </span>
            <h1 className="text-3xl md:text-5xl font-bold font-[Outfit] text-white">
              Reserve <span className="text-gradient">Your Arena</span>
            </h1>
            <p className="text-gray-400 mt-2 text-sm md:text-base">Select your sport, date, and time to proceed via WhatsApp.</p>
          </div>
        </ScrollReveal>

        {/* Step 1: Sport Selection */}
        <ScrollReveal>
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#1E8E3E] flex items-center justify-center text-white text-sm font-bold">1</div>
              <h2 className="text-lg font-bold font-[Outfit] text-white">Choose Sport</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {SPORTS.map((s) => (
                <motion.button
                  key={s.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSport(s.id);
                    setTimeout(() => dateSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 150);
                  }}
                  className={`glass rounded-2xl p-4 text-center transition-all ${
                    booking.sport === s.id
                      ? "border-[#1E8E3E]/50 bg-[#1E8E3E]/10 shadow-lg shadow-[#1E8E3E]/10"
                      : "hover:bg-white/[0.08]"
                  }`}
                >
                  <img src={s.image} alt={s.name} className="w-full h-32 md:h-28 object-cover rounded-xl mb-3" />
                  <span className="text-sm font-semibold text-white font-[Outfit] block mb-1">{s.name}</span>
                  <span className="text-[10px] text-gray-400 leading-tight block line-clamp-2">{s.description}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Turf Guidelines / Marketing Content */}
        {!booking.sport && (
          <ScrollReveal>
            <div className="mb-10 glass p-6 rounded-2xl border border-white/5 bg-gradient-to-br from-[#0B0F14] to-[#1E8E3E]/5">
              <div className="flex items-center gap-3 mb-4">
                <Info className="w-5 h-5 text-[#4ADE80]" />
                <h3 className="text-lg font-bold font-[Outfit] text-white">Playing Requirements & Guidelines</h3>
              </div>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                Experience the best turf conditions managed by AKAN'S ARENA. To maintain our premium facilities, please follow these guidelines:
              </p>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#1E8E3E]" />
                  Non-marking athletic shoes or turf studs are mandatory for football and cricket.
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#1E8E3E]" />
                  Equipment (Balls, Bats, Paddles) provided upon request at the venue.
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#1E8E3E]" />
                  Please arrive 10 minutes prior to your booking slot for a smooth handover.
                </li>
              </ul>
            </div>
          </ScrollReveal>
        )}

        {/* Step 2: Date Selection */}
        {booking.sport && (
          <ScrollReveal>
            <div ref={dateSectionRef} className="mb-8 pt-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-[#1E8E3E] flex items-center justify-center text-white text-sm font-bold">2</div>
                <h2 className="text-lg font-bold font-[Outfit] text-white">Select Date</h2>
              </div>
              <div className="relative glass rounded-xl overflow-hidden border border-white/10 group focus-within:border-[#1E8E3E]/50 focus-within:ring-1 focus-within:ring-[#1E8E3E]/50">
                <input
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  value={booking.date}
                  onChange={(e) => {
                    setDate(e.target.value);
                    if (e.target.value) {
                      setTimeout(() => timeSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 150);
                    }
                  }}
                  className="w-full bg-transparent px-4 py-3.5 text-white text-sm focus:outline-none appearance-none"
                  style={{ colorScheme: "dark" }}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-focus-within:text-[#4ADE80]">
                  <CalendarIcon className="w-5 h-5" />
                </div>
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Step 3: Time Selection */}
        {booking.date && (
          <ScrollReveal>
            <div ref={timeSectionRef} className="mb-8 pt-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-[#1E8E3E] flex items-center justify-center text-white text-sm font-bold">3</div>
                <h2 className="text-lg font-bold font-[Outfit] text-white">Select Time</h2>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5 font-medium ml-1">Start Time</label>
                  <div className="relative glass rounded-xl overflow-hidden border border-white/10 group focus-within:border-[#1E8E3E]/50 focus-within:ring-1 focus-within:ring-[#1E8E3E]/50">
                    <input
                      type="time"
                      value={booking.startTime}
                      onChange={(e) => {
                        setStartTime(e.target.value);
                        if (booking.endTime) {
                          setTimeout(() => detailsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 150);
                        }
                      }}
                      className="w-full bg-transparent px-4 py-3.5 text-white text-sm focus:outline-none appearance-none"
                      style={{ colorScheme: "dark" }}
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-focus-within:text-[#4ADE80]">
                      <Clock className="w-4 h-4" />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5 font-medium ml-1">End Time</label>
                  <div className="relative glass rounded-xl overflow-hidden border border-white/10 group focus-within:border-[#1E8E3E]/50 focus-within:ring-1 focus-within:ring-[#1E8E3E]/50">
                    <input
                      type="time"
                      value={booking.endTime}
                      onChange={(e) => {
                        setEndTime(e.target.value);
                        if (booking.startTime) {
                          setTimeout(() => detailsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 150);
                        }
                      }}
                      className="w-full bg-transparent px-4 py-3.5 text-white text-sm focus:outline-none appearance-none"
                      style={{ colorScheme: "dark" }}
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-focus-within:text-[#4ADE80]">
                      <Clock className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Indicator */}
              <AnimatePresence>
                {status !== "none" && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4"
                  >
                    {status === "checking" ? (
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <span className="w-4 h-4 rounded-full border-2 border-gray-400 border-t-transparent animate-spin" />
                        Checking availability...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-sm text-[#4ADE80] bg-[#1E8E3E]/10 p-3 rounded-lg border border-[#1E8E3E]/30">
                        <CheckCircle2 className="w-4 h-4" />
                        Slot is Available
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </ScrollReveal>
        )}

        {/* Customer Details & Summary (Combined) */}
        {isReady && status === "Available" && (
          <ScrollReveal>
            <div ref={detailsSectionRef} className="mb-12 pt-4">
              <div className="glass-strong border border-white/10 rounded-2xl p-5 md:p-8 shadow-2xl bg-[#0B0F14]/80 backdrop-blur-xl">
                <div className="flex items-center gap-2 mb-6">
                <CheckCircle2 className="w-5 h-5 text-[#4ADE80]" />
                <h3 className="text-lg font-bold font-[Outfit] text-white">Booking Details</h3>
              </div>
              
              {/* Summary Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                  <span className="text-gray-400 text-xs block mb-1">Sport</span>
                  <span className="text-white font-semibold capitalize block truncate">{booking.sport}</span>
                </div>
                <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                  <span className="text-gray-400 text-xs block mb-1">Date</span>
                  <span className="text-white font-semibold block truncate">{booking.date}</span>
                </div>
                <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                  <span className="text-gray-400 text-xs block mb-1">Timing</span>
                  <span className="text-white font-semibold block text-sm">{booking.startTime} - {booking.endTime}</span>
                </div>
                <div className="bg-[#1E8E3E]/10 rounded-xl p-3 border border-[#1E8E3E]/30">
                  <span className="text-gray-400 text-xs block mb-1">Duration</span>
                  <span className="text-[#4ADE80] font-bold block">{booking.duration} Hour(s)</span>
                </div>
              </div>

              {/* Form */}
              <div className="space-y-4 mb-6">
                <h4 className="text-sm font-medium text-gray-300">Customer Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Full Name *"
                    value={booking.playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    className="w-full glass rounded-xl px-4 py-3.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1E8E3E]/50"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number *"
                    value={booking.mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="w-full glass rounded-xl px-4 py-3.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1E8E3E]/50"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email Address (Optional)"
                  value={booking.email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full glass rounded-xl px-4 py-3.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1E8E3E]/50"
                />
              </div>

              <button
                onClick={handleBookingSubmit}
                disabled={isSubmitting}
                className="w-full btn-gradient text-white font-semibold py-4 rounded-xl text-base flex items-center justify-center gap-2 shadow-xl shadow-[#1E8E3E]/20 disabled:opacity-50 transition-all hover:shadow-[#1E8E3E]/40"
              >
                {isSubmitting ? "Opening WhatsApp..." : "Continue on WhatsApp"}
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.06-.173-.299-.018-.461.13-.611.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </button>
              </div>
            </div>
          </ScrollReveal>
        )}

      </div>
    </div>
  );
}
