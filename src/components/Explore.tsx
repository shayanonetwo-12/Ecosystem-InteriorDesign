import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, Heart, Share2, Sun, Moon, Info, Eye, X } from 'lucide-react';
import { rooms, categories, type Room } from '@/data/content';

export default function Explore() {
  const [active, setActive] = useState('All');
  const [selected, setSelected] = useState<Room | null>(null);
  const [isDay, setIsDay] = useState(true);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const filtered = active === 'All' ? rooms : rooms.filter((r) => r.category === active || r.style === active);

  const toggleFav = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <section id="explore" className="section-pad bg-ivory">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-sm font-medium text-sage tracking-widest uppercase">Explore Interiors</span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-light text-ink">
            Step Inside <span className="font-medium text-gradient">50+ Spaces</span>
          </h2>
          <p className="mt-4 text-slatey max-w-xl mx-auto">
            Wander through fully interactive interiors. Orbit, inspect, and feel the light change from morning to night.
          </p>
        </motion.div>

        {/* Category pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                active === cat
                  ? 'bg-ink text-warmwhite shadow-soft'
                  : 'glass-soft text-slatey hover:text-ink hover:bg-white/70'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((room, i) => (
              <motion.div
                key={room.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ y: -6 }}
                onClick={() => setSelected(room)}
                className="group relative rounded-3xl overflow-hidden cursor-pointer shadow-soft bg-white"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={room.image}
                    alt={room.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                  {/* Top actions */}
                  <div className="absolute top-3 right-3 flex gap-2">
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleFav(room.id); }}
                      className="w-9 h-9 rounded-full glass flex items-center justify-center hover:bg-white/80 transition-colors"
                      aria-label="Favorite"
                    >
                      <Heart className={`w-4 h-4 ${favorites.has(room.id) ? 'fill-terracotta text-terracotta' : 'text-ink'}`} />
                    </button>
                  </div>

                  {/* Hover view badge */}
                  <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full glass text-xs font-medium text-ink flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Eye className="w-3.5 h-3.5" />
                    Walk Inside
                  </div>

                  {/* Bottom info */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-xs font-medium">
                        {room.category}
                      </span>
                      <span className="text-xs text-white/70">{room.area}</span>
                    </div>
                    <h3 className="font-display text-lg font-medium">{room.title}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Room detail modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelected(null)}
          >
            <div className="absolute inset-0 bg-ink/40 backdrop-blur-md" />
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl bg-warmwhite rounded-3xl overflow-hidden shadow-glass grid md:grid-cols-2"
            >
              <div className="relative h-64 md:h-auto overflow-hidden">
                <img
                  src={selected.image}
                  alt={selected.title}
                  className={`w-full h-full object-cover transition-all duration-700 ${isDay ? '' : 'brightness-50 saturate-75'}`}
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <button
                    onClick={() => setIsDay(true)}
                    className={`w-9 h-9 rounded-full glass flex items-center justify-center transition ${isDay ? 'bg-white/90' : ''}`}
                    aria-label="Day mode"
                  >
                    <Sun className="w-4 h-4 text-terracotta" />
                  </button>
                  <button
                    onClick={() => setIsDay(false)}
                    className={`w-9 h-9 rounded-full glass flex items-center justify-center transition ${!isDay ? 'bg-ink/80' : ''}`}
                    aria-label="Night mode"
                  >
                    <Moon className="w-4 h-4 text-dustyblue" />
                  </button>
                </div>
              </div>

              <div className="p-8 md:p-10 flex flex-col">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <span className="text-xs font-medium text-sage tracking-widest uppercase">{selected.style}</span>
                    <h3 className="mt-1 font-display text-2xl font-medium text-ink">{selected.title}</h3>
                  </div>
                  <button onClick={() => setSelected(null)} className="p-2 rounded-xl glass-soft hover:bg-mist transition" aria-label="Close">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <p className="text-slatey leading-relaxed mb-6">{selected.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-mist flex items-center justify-center">
                      <Info className="w-4 h-4 text-slatey" />
                    </div>
                    <div>
                      <div className="text-xs text-muted">Designer</div>
                      <div className="text-sm font-medium text-ink">{selected.designer}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-mist flex items-center justify-center">
                      <Maximize2 className="w-4 h-4 text-slatey" />
                    </div>
                    <div>
                      <div className="text-xs text-muted">Area</div>
                      <div className="text-sm font-medium text-ink">{selected.area}</div>
                    </div>
                  </div>
                </div>

                <div className="mt-auto flex gap-3">
                  <a href="#contact" onClick={() => setSelected(null)} className="btn-primary flex-1">
                    Book This Style
                  </a>
                  <button
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({ title: selected.title, text: selected.description }).catch(() => {});
                      } else {
                        navigator.clipboard.writeText(`${selected.title} — ${selected.description}`);
                      }
                    }}
                    className="btn-ghost"
                    aria-label="Share"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => toggleFav(selected.id)}
                    className="btn-ghost"
                  >
                    <Heart className={`w-4 h-4 ${favorites.has(selected.id) ? 'fill-terracotta text-terracotta' : ''}`} />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
