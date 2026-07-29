import { motion } from 'framer-motion';
import { Leaf, Cpu, Heart, Globe } from 'lucide-react';

const stats = [
  { value: '50+', label: 'Interactive Interiors', icon: Globe },
  { value: '30s', label: 'AI Generation Time', icon: Cpu },
  { value: '12k+', label: 'Rooms Redesigned', icon: Heart },
  { value: '98%', label: 'Client Satisfaction', icon: Leaf },
];

export default function Stats() {
  return (
    <section className="py-16 md:py-20 bg-warmwhite">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sage/20 to-champagne/20 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-5 h-5 text-sage" />
                </div>
                <div className="font-display text-4xl md:text-5xl font-light text-ink">{s.value}</div>
                <div className="text-sm text-slatey mt-1">{s.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
