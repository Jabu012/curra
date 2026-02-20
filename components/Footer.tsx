import { Stethoscope } from "lucide-react";

const links = {
  Product: ["Features", "Pricing", "Security", "Changelog"],
  Solutions: ["Hospitals", "Clinics", "Telehealth", "Specialty Care"],
  Company: ["About", "Blog", "Careers", "Press"],
  Legal: ["Privacy Policy", "Terms of Service", "HIPAA Notice", "Cookie Policy"],
};

export default function Footer() {
  return (
    <footer className="bg-[#0f1425] text-white/70 border-t border-indigo-500/10">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-teal-600 flex items-center justify-center">
                <Stethoscope className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-sora font-bold text-white">
                Cura<span className="text-gradient-to-r from-indigo-400 to-teal-400">AI</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-primary-foreground/45 max-w-[180px]">
              Intelligent voice solutions for modern healthcare delivery.
            </p>
          </div>

          {/* Links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-xs font-semibold text-indigo-300 uppercase tracking-widest mb-4">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-white/50 hover:text-indigo-400 transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-6 border-t border-indigo-500/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/35">
            © {new Date().getFullYear()} CuraAI Health Technologies, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-xs text-primary-foreground/35">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-300 animate-pulse" />
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
}
