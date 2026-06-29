import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="relative bg-[#080C10] border-t border-white/5">
      <div className="container py-12 pb-24 lg:pb-12">
        <div className="flex flex-col items-center justify-center space-y-6">
          
          {/* Legal Links & Copyright */}
          <div className="flex flex-col items-center gap-3">
            <div className="flex gap-4">
              <a href="#" className="text-xs text-gray-500 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-xs text-gray-500 hover:text-white transition-colors">Terms & Conditions</a>
            </div>
            <p className="text-xs text-gray-600 font-medium">
              © {new Date().getFullYear()} AKAN'S ARENA. Premium Multi Sports Arena
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
