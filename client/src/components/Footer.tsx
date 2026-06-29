import { Link } from "wouter";
import { Instagram, MessageCircle, Phone, Clock, MapPin, Star } from "lucide-react";
import { WHATSAPP_NUMBER, LOCATION, GOOGLE_RATING } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="relative bg-[#080C10] border-t border-white/5 pt-12 pb-24 lg:pb-12">
      <div className="container max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">
          
          {/* Brand & Description */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1E8E3E]/20 flex items-center justify-center p-2">
                <img src="/logo.png" alt="Akan's Arena" className="w-full h-full object-contain" />
              </div>
              <span className="text-xl font-bold font-[Outfit] text-white">AKAN'S ARENA</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Salem's Premium Multi-Sports Arena. Experience world-class football, cricket, and pickleball facilities.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all border border-white/5">
                <Instagram className="w-5 h-5" />
              </a>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-[#4ADE80] hover:bg-[#1E8E3E]/20 transition-all border border-white/5">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href={`tel:+${WHATSAPP_NUMBER}`} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all border border-white/5">
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white tracking-wider mb-6">QUICK LINKS</h4>
            <ul className="space-y-4">
              {[
                { label: "Home", path: "/" },
                { label: "Sports", path: "/sports" },
                { label: "Book a Slot", path: "/booking" },
                { label: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link href={link.path} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Working Hours */}
          <div>
            <h4 className="text-sm font-bold text-white tracking-wider mb-6">WORKING HOURS</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#4ADE80]" />
                <span>Monday - Friday <span className="text-[#4ADE80] ml-1">24 Hours</span></span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#4ADE80]" />
                <span>Saturday - Sunday <span className="text-[#4ADE80] ml-1">24 Hours</span></span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#4ADE80]" />
                <span>Holidays <span className="text-[#4ADE80] ml-1">24 Hours</span></span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold text-white tracking-wider mb-6">CONTACT</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#4ADE80] mt-1 shrink-0" />
                <span className="leading-relaxed">Near Bharat Petroleum, Alagapuram, Periyapudhur, Attur, Salem, 636102</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#4ADE80]" />
                <span>+91 98945 39465</span>
              </li>
              <li className="flex items-center gap-3">
                <Star className="w-4 h-4 text-[#F59E0B]" />
                <span>Google Rating: 4.9 / 5</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500 font-medium text-center md:text-left">
            © 2026 AKAN'S ARENA. All rights reserved. Designed for premium sports experience.
          </p>
        </div>
      </div>
    </footer>
  );
}
