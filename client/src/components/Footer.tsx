import { Link } from "wouter";
import { Star, MapPin, Clock, Instagram, Phone, MessageCircle } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="relative bg-[#080C10] border-t border-white/5">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/logo.png"
                alt="Akan's Arena Logo"
                className="w-10 h-10 object-contain rounded-lg shadow-lg shadow-[#1E8E3E]/20"
              />
              <span className="text-lg font-bold font-[Outfit] text-white">AKAN'S ARENA</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed mb-4">
              Salem's Premium Multi-Sports Arena. Experience world-class football, cricket, and pickleball facilities.
            </p>
            <div className="flex gap-3">
              <a href="https://instagram.com/akans_arena__" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg glass flex items-center justify-center hover:bg-[#E4405F]/20 hover:text-[#E4405F] transition-all text-gray-400">
                <Instagram className="w-4 h-4" />
              </a>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg glass flex items-center justify-center hover:bg-[#25D366]/20 hover:text-[#25D366] transition-all text-gray-400">
                <MessageCircle className="w-4 h-4" />
              </a>
              <a href={`tel:+${WHATSAPP_NUMBER}`} className="w-9 h-9 rounded-lg glass flex items-center justify-center hover:bg-[#1E8E3E]/20 hover:text-[#4ADE80] transition-all text-gray-400">
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold font-[Outfit] text-white mb-4 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: "Home", path: "/" },
                { label: "Sports", path: "/sports" },
                { label: "Book a Slot", path: "/booking" },
                { label: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link href={link.path} className="text-sm text-gray-500 hover:text-[#4ADE80] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Working Hours */}
          <div>
            <h4 className="text-sm font-bold font-[Outfit] text-white mb-4 uppercase tracking-wider">Working Hours</h4>
            <div className="space-y-3">
              {[
                { day: "Monday - Friday", hours: "24 Hours" },
                { day: "Saturday - Sunday", hours: "24 Hours" },
                { day: "Holidays", hours: "24 Hours" },
              ].map((item) => (
                <div key={item.day} className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#4ADE80]" />
                  <div>
                    <span className="text-sm text-gray-400">{item.day}</span>
                    <span className="text-sm text-[#4ADE80] ml-2">{item.hours}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold font-[Outfit] text-white mb-4 uppercase tracking-wider">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#4ADE80] mt-0.5 shrink-0" />
                <span className="text-sm text-gray-500">
                  Near Bharat Petroleum, Alagapuram, Periyapudhur, Attur, Salem, 636102
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#4ADE80]" />
                <a href={`tel:+${WHATSAPP_NUMBER}`} className="text-sm text-gray-500 hover:text-[#4ADE80] transition-colors">
                  +91 98945 39465
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Star className="w-4 h-4 text-[#FBBF24]" />
                <span className="text-sm text-gray-500">Google Rating: 4.9 / 5</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} AKAN'S ARENA. All rights reserved. Designed for premium sports experience.
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <span>Made with</span>
            <span className="text-[#4ADE80]">❤</span>
            <span>for sports lovers</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
