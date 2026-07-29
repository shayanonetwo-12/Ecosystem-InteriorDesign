import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Calendar } from 'lucide-react';
import { useAuth } from '@/lib/auth';

export default function Hero() {
  const { user } = useAuth();
  const displayName = (user?.user_metadata?.full_name as string) || user?.email?.split('@')[0];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with parallax-like layered effect */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{
            backgroundImage: "url('https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1920')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-warmwhite/40 via-warmwhite/20 to-warmwhite" />
        <div className="absolute inset-0 bg-gradient-to-r from-warmwhite/50 to-transparent" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-white/60"
            style={{
              left: `${(i * 8.3) % 100}%`,
              top: `${(i * 13.7) % 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              delay: i * 0.5,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center pt-20">
        {displayName && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <h2 className="font-display text-3xl md:text-4xl font-medium text-ink">
              Welcome, {displayName}
            </h2>
          </motion.div>
        )}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-soft mb-8"
        >
          <Sparkles className="w-4 h-4 text-sage" />
          <span className="text-sm font-medium text-slatey">AI-Powered 3D Interior Design</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-light leading-[1.05] tracking-tight text-ink"
        >
          Designing Spaces
          <br />
          <span className="text-gradient font-medium">Beyond Imagination</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-8 text-lg md:text-xl text-slatey font-light max-w-2xl mx-auto leading-relaxed"
        >
          Transform any room into a breathtaking masterpiece using AI and immersive 3D experiences — in under thirty seconds.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="#explore" className="btn-primary group">
            Explore Designs
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a href="#designer" className="btn-ghost group">
            <Sparkles className="w-4 h-4 text-sage" />
            Design My Room
          </a>
          <a href="#contact" className="btn-ghost group">
            <Calendar className="w-4 h-4 text-terracotta" />
            Book Consultation
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-muted tracking-widest uppercase">Scroll</span>
          <div className="w-6 h-10 rounded-full border-2 border-slatey/30 flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-1.5 rounded-full bg-slatey/50"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
