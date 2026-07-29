import { motion } from 'framer-motion';
import { Instagram, Twitter, Linkedin, Youtube, ArrowUp } from 'lucide-react';

const footerLinks = {
  Explore: [
    { label: 'Interiors', href: '#explore' },
    { label: 'AI Designer', href: '#designer' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Projects', href: '#gallery' },
  ],
  Company: [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Careers', href: '#contact' },
  ],
  Support: [
    { label: 'Contact', href: '#contact' },
    { label: 'FAQ', href: '#contact' },
    { label: 'Privacy', href: '#' },
    { label: 'Terms', href: '#' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-ink text-warmwhite pt-20 pb-10 px-6 md:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sage to-champagne flex items-center justify-center">
                <div className="w-4 h-4 rounded-md bg-warmwhite/90" />
              </div>
              <span className="font-display font-semibold text-lg">Ecosystem</span>
            </div>
            <p className="text-warmwhite/60 text-sm leading-relaxed max-w-sm">
              The future of interior design — where AI, immersive 3D, and human craft meet to transform any space into a masterpiece.
            </p>
            <div className="flex gap-3 mt-6">
              {[Instagram, Twitter, Linkedin, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-sage hover:text-ink transition-all"
                >
                  <Icon className="w-4.5 h-4.5" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-display text-sm font-medium mb-4 text-warmwhite/90">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm text-warmwhite/50 hover:text-warmwhite transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-warmwhite/40">
            © {new Date().getFullYear()} Ecosystem. Crafted with care for beautiful living.
          </p>
          <motion.a
            href="#home"
            whileHover={{ y: -3 }}
            className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-sage hover:text-ink transition-all"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.a>
        </div>
      </div>
    </footer>
  );
}
