import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { testimonials } from '@/data/content';

export default function Testimonials() {
  return (
    <section id="about" className="section-pad bg-ivory">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-sm font-medium text-sage tracking-widest uppercase">Loved by Clients</span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-light text-ink">
            Stories From <span className="font-medium text-gradient">Beautiful Spaces</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              whileHover={{ y: -6, rotate: i % 2 === 0 ? -0.5 : 0.5 }}
              className="glass rounded-3xl p-8 shadow-soft relative overflow-hidden"
            >
              <Quote className="absolute -top-2 -right-2 w-20 h-20 text-sage/10" />
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-champagne text-champagne" />
                ))}
              </div>
              <p className="text-slatey leading-relaxed mb-6 relative">{t.text}</p>
              <div className="flex items-center gap-3">
                <img src={t.avatar} alt={t.name} className="w-11 h-11 rounded-full object-cover" />
                <div>
                  <div className="text-sm font-medium text-ink">{t.name}</div>
                  <div className="text-xs text-muted">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
