import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '@/data/content';

export default function Gallery() {
  return (
    <section id="gallery" className="section-pad bg-warmwhite">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4"
        >
          <div>
            <span className="text-sm font-medium text-sage tracking-widest uppercase">Featured Projects</span>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-light text-ink">
              Recent <span className="font-medium text-gradient">Transformations</span>
            </h2>
          </div>
          <a href="#explore" className="text-sm font-medium text-slatey hover:text-ink flex items-center gap-1.5 group">
            View all projects
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover="hover"
              onClick={() => {
                document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative rounded-3xl overflow-hidden cursor-pointer aspect-[16/10]"
            >
              <img
                src={p.image}
                alt={p.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/10 to-transparent" />
              <motion.div
                variants={{ hover: { y: 0, opacity: 1 } }}
                initial={{ y: 20, opacity: 0 }}
                className="absolute bottom-0 left-0 right-0 p-6 text-white"
              >
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-xs text-white/70 tracking-wider uppercase">{p.category} · {p.year}</span>
                    <h3 className="font-display text-2xl font-medium mt-1">{p.title}</h3>
                  </div>
                  <div className="w-11 h-11 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
