import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Calendar, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '@/lib/auth';

const navLinks = [
  { label: 'Explore', href: '#explore' },
  { label: 'AI Designer', href: '#designer' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Services', href: '#services' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ onLoginClick }: { onLoginClick: () => void }) {
  const { user, signOut } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      if (y > lastY && y > 300) setHidden(true);
      else setHidden(false);
      setLastY(y);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [lastY]);

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass shadow-soft' : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 flex items-center justify-between h-18 py-4">
          <a href="#home" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sage to-champagne flex items-center justify-center transition-transform group-hover:rotate-12">
              <div className="w-4 h-4 rounded-md bg-warmwhite/90" />
            </div>
            <span className="font-display font-semibold text-lg tracking-tight text-ink">
              Ecosystem
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-slatey hover:text-ink transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sage rounded-full transition-all group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <>
                <a href="#designer" className="text-sm font-medium text-slatey hover:text-ink transition-colors flex items-center gap-1.5">
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </a>
                <button onClick={signOut} className="text-sm font-medium text-slatey hover:text-ink transition-colors flex items-center gap-1.5">
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </>
            ) : (
              <button onClick={onLoginClick} className="text-sm font-medium text-slatey hover:text-ink transition-colors">
                Login
              </button>
            )}
            <a href="#contact" className="btn-primary text-sm py-2.5 px-5">
              <Calendar className="w-4 h-4" />
              Book Now
            </a>
          </div>

          <button
            className="lg:hidden p-2 rounded-xl glass-soft"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5 text-ink" />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] lg:hidden"
          >
            <div className="absolute inset-0 bg-ink/20 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-warmwhite shadow-glass p-6 flex flex-col"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="font-display font-semibold text-lg">Menu</span>
                <button onClick={() => setMenuOpen(false)} className="p-2 rounded-xl glass-soft" aria-label="Close menu">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="px-4 py-3 rounded-xl text-base font-medium text-slatey hover:bg-mist hover:text-ink transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
                {user ? (
                  <>
                    <button onClick={signOut} className="px-4 py-3 rounded-xl text-base font-medium text-slatey hover:bg-mist transition-colors flex items-center gap-2 text-left">
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => { setMenuOpen(false); onLoginClick(); }}
                    className="px-4 py-3 rounded-xl text-base font-medium text-slatey hover:bg-mist transition-colors text-left"
                  >
                    Login
                  </button>
                )}
                <a href="#contact" onClick={() => setMenuOpen(false)} className="btn-primary mt-4">
                  <Calendar className="w-4 h-4" />
                  Book Now
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
