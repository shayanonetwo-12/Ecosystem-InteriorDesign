import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { plans } from '@/data/content';

export default function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="pricing" className="section-pad bg-warmwhite">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-sm font-medium text-sage tracking-widest uppercase">Pricing</span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-light text-ink">
            Plans for Every <span className="font-medium text-gradient">Space</span>
          </h2>
          <p className="mt-4 text-slatey max-w-xl mx-auto">
            Start with a single room or transform an entire property. Cancel anytime.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 mt-8 p-1.5 rounded-full glass-soft">
            <button
              onClick={() => setYearly(false)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${!yearly ? 'bg-ink text-warmwhite' : 'text-slatey'}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${yearly ? 'bg-ink text-warmwhite' : 'text-slatey'}`}
            >
              Yearly
              <span className="text-xs px-2 py-0.5 rounded-full bg-sage/20 text-sage">Save 20%</span>
            </button>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => {
            const price = yearly ? Math.round(plan.price * 12 * 0.8) : plan.price;
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative rounded-3xl p-8 transition-all ${
                  plan.highlighted
                    ? 'bg-ink text-warmwhite shadow-glass scale-[1.03]'
                    : 'glass shadow-soft hover:shadow-glass'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-sage text-white text-xs font-medium flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3" />
                    Most Popular
                  </div>
                )}
                <h3 className={`font-display text-xl font-medium ${plan.highlighted ? 'text-warmwhite' : 'text-ink'}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm mt-1 ${plan.highlighted ? 'text-warmwhite/70' : 'text-slatey'}`}>
                  {plan.tagline}
                </p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className={`font-display text-5xl font-light ${plan.highlighted ? 'text-warmwhite' : 'text-ink'}`}>
                    ${price}
                  </span>
                  <span className={`text-sm ${plan.highlighted ? 'text-warmwhite/60' : 'text-muted'}`}>
                    /{yearly ? 'year' : plan.period}
                  </span>
                </div>

                <a
                  href="#contact"
                  className={`mt-6 w-full py-3 rounded-2xl font-medium transition-all text-center block ${
                    plan.highlighted
                      ? 'bg-warmwhite text-ink hover:shadow-soft'
                      : 'bg-ink text-warmwhite hover:shadow-soft'
                  }`}
                >
                  Choose {plan.name}
                </a>

                <ul className="mt-7 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${plan.highlighted ? 'bg-sage/30' : 'bg-sage/20'}`}>
                        <Check className={`w-3 h-3 ${plan.highlighted ? 'text-sage' : 'text-sage'}`} />
                      </div>
                      <span className={`text-sm ${plan.highlighted ? 'text-warmwhite/85' : 'text-slatey'}`}>{f}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
