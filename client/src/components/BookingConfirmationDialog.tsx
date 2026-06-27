import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, MessageCircle } from "lucide-react";
import type { BookingState } from "@/contexts/BookingContext";
import { SPORTS, WHATSAPP_NUMBER } from "@/lib/config";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  booking: BookingState;
}

export default function BookingConfirmationDialog({ open, onClose, onConfirm, booking }: Props) {
  const sport = SPORTS.find(s => s.id === booking.sport);
  const total = (sport?.pricePerHour || booking.pricePerHour) * (booking.duration ? parseInt(booking.duration) : 1);
  const gst = total * 0.12;
  const grandTotal = total + gst;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9998] flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative glass-strong rounded-2xl p-6 w-full max-w-md"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>

            {/* Icon */}
            <div className="w-14 h-14 rounded-full bg-[#1E8E3E]/20 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-7 h-7 text-[#4ADE80]" />
            </div>

            <h3 className="text-xl font-bold text-center mb-1 font-[Outfit]">Confirm Booking Request</h3>
            <p className="text-sm text-gray-400 text-center mb-6">
              Your booking details are ready to be shared with the AKAN'S ARENA Booking Coordinator through WhatsApp.
            </p>

            {/* Booking Summary */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Sport</span>
                <span className="text-white font-medium capitalize">{booking.sport || "—"}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Date</span>
                <span className="text-white font-medium">{booking.date || "—"}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Time</span>
                <span className="text-white font-medium">{booking.startTime || "—"}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Duration</span>
                <span className="text-white font-medium">{booking.duration ? `${booking.duration} Hour${booking.duration !== "1" ? "s" : ""}` : "—"}</span>
              </div>
              <div className="border-t border-white/10 pt-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="text-white">₹{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">GST (12%)</span>
                  <span className="text-white">₹{gst.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-base font-bold pt-2 border-t border-white/10">
                  <span className="text-white">Total</span>
                  <span className="text-[#4ADE80]">₹{grandTotal.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-3 rounded-xl border border-white/10 text-white font-medium hover:bg-white/5 transition-all text-sm"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 btn-gradient text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 text-sm"
              >
                <MessageCircle className="w-4 h-4" />
                Continue to WhatsApp
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
