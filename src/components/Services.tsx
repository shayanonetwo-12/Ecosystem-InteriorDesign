import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { services } from '@/data/content';

export default function Services() {
  return (
    <section id="services" className="section-pad bg-ivory">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-sm font-medium text-sage tracking-widest uppercase">What We Do</span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-light text-ink">
            Services Crafted <span className="font-medium text-gradient">Around You</span>
          </h2>
          <p className="mt-4 text-slatey max-w-xl mx-auto">
            From a single room to an entire property, every service is tailored to your space, your life, and your light.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, i) => {
            const Icon = (Icons as any)[service.icon] ?? Icons.Box;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="group glass rounded-3xl p-7 shadow-soft hover:shadow-glass transition-all cursor-pointer"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sage/25 to-champagne/25 flex items-center justify-center mb-5 group-hover:from-sage/40 group-hover:to-champagne/40 transition-colors">
                  <Icon className="w-6 h-6 text-ink" />
                </div>
                <h3 className="font-display text-lg font-medium text-ink mb-2">{service.title}</h3>
                <p className="text-sm text-slatey leading-relaxed">{service.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
