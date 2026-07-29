import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MessageCircle, MapPin, Send, Calendar, Clock, Video } from 'lucide-react';

const slots = ['10:00 AM', '11:30 AM', '1:00 PM', '2:30 PM', '4:00 PM', '5:30 PM'];
const meetingModes = [
  { label: 'Zoom', icon: Video },
  { label: 'Google Meet', icon: Video },
  { label: 'WhatsApp', icon: MessageCircle },
  { label: 'On-site Visit', icon: MapPin },
];

export default function Contact() {
  const [slot, setSlot] = useState(slots[2]);
  const [mode, setMode] = useState('Zoom');
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="contact" className="section-pad bg-ivory">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-sm font-medium text-sage tracking-widest uppercase">Consultancy</span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-light text-ink">
            Book a <span className="font-medium text-gradient">Consultation</span>
          </h2>
          <p className="mt-4 text-slatey max-w-xl mx-auto">
            Reserve a time with one of our designers. We'll discuss your space, your vision, and how AI can bring it to life.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Booking form */}
          <div className="lg:col-span-3 glass rounded-3xl p-8 md:p-10 shadow-glass">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center py-16"
              >
                <div className="w-20 h-20 rounded-full bg-sage/20 flex items-center justify-center mb-6">
                  <Calendar className="w-9 h-9 text-sage" />
                </div>
                <h3 className="font-display text-2xl font-medium text-ink mb-2">You're Booked!</h3>
                <p className="text-slatey max-w-sm">
                  We've reserved your {slot} slot via {mode}. A confirmation email and calendar invite are on their way.
                </p>
                <button onClick={() => setSubmitted(false)} className="btn-ghost mt-6">
                  Book another time
                </button>
              </motion.div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-ink mb-2 block">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      className="w-full px-4 py-3 rounded-xl bg-white/60 border border-stone/40 focus:border-sage focus:outline-none transition-colors text-ink placeholder:text-muted"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-ink mb-2 block">Email</label>
                    <input
                      type="email"
                      required
                      placeholder="jane@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/60 border border-stone/40 focus:border-sage focus:outline-none transition-colors text-ink placeholder:text-muted"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-ink mb-2 block">Room Type</label>
                  <select className="w-full px-4 py-3 rounded-xl bg-white/60 border border-stone/40 focus:border-sage focus:outline-none transition-colors text-ink">
                    <option>Living Room</option>
                    <option>Bedroom</option>
                    <option>Kitchen</option>
                    <option>Bathroom</option>
                    <option>Office</option>
                    <option>Full Home</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-ink mb-3 block flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slatey" />
                    Choose a Time Slot
                  </label>
                  <div className="grid grid-cols-3 gap-2.5">
                    {slots.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSlot(s)}
                        className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                          slot === s ? 'bg-ink text-warmwhite shadow-soft' : 'glass-soft text-slatey hover:text-ink'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-ink mb-3 block">Meeting Mode</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {meetingModes.map((m) => {
                      const Icon = m.icon;
                      return (
                        <button
                          key={m.label}
                          type="button"
                          onClick={() => setMode(m.label)}
                          className={`px-3 py-3 rounded-xl text-sm font-medium transition-all flex flex-col items-center gap-1.5 ${
                            mode === m.label ? 'bg-ink text-warmwhite shadow-soft' : 'glass-soft text-slatey hover:text-ink'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          {m.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button type="submit" className="btn-primary w-full">
                  <Send className="w-4 h-4" />
                  Confirm Booking
                </button>
              </form>
            )}
          </div>

          {/* Contact info */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <div className="glass rounded-3xl p-7 shadow-soft">
              <h3 className="font-display text-lg font-medium text-ink mb-5">Reach Us Directly</h3>
              <div className="space-y-4">
                <a href="mailto:hello@ecosystem.design" className="flex items-center gap-3 group">
                  <div className="w-11 h-11 rounded-xl bg-mist flex items-center justify-center group-hover:bg-sage/20 transition-colors">
                    <Mail className="w-5 h-5 text-slatey" />
                  </div>
                  <div>
                    <div className="text-xs text-muted">Email</div>
                    <div className="text-sm font-medium text-ink">hello@ecosystem.design</div>
                  </div>
                </a>
                <a href="tel:+10000000000" className="flex items-center gap-3 group">
                  <div className="w-11 h-11 rounded-xl bg-mist flex items-center justify-center group-hover:bg-sage/20 transition-colors">
                    <Phone className="w-5 h-5 text-slatey" />
                  </div>
                  <div>
                    <div className="text-xs text-muted">Phone</div>
                    <div className="text-sm font-medium text-ink">+1 (000) 000-0000</div>
                  </div>
                </a>
                <a href="https://wa.me/10000000000" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                  <div className="w-11 h-11 rounded-xl bg-mist flex items-center justify-center group-hover:bg-sage/20 transition-colors">
                    <MessageCircle className="w-5 h-5 text-slatey" />
                  </div>
                  <div>
                    <div className="text-xs text-muted">WhatsApp</div>
                    <div className="text-sm font-medium text-ink">Chat with us</div>
                  </div>
                </a>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-mist flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-slatey" />
                  </div>
                  <div>
                    <div className="text-xs text-muted">Studio</div>
                    <div className="text-sm font-medium text-ink">Copenhagen · Milan · Tokyo</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass rounded-3xl p-7 shadow-soft flex-1 flex flex-col justify-center items-center text-center bg-gradient-to-br from-sage/10 to-champagne/10">
              <div className="w-14 h-14 rounded-2xl bg-white/50 flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-sage" />
              </div>
              <h3 className="font-display text-base font-medium text-ink">Studio Hours</h3>
              <p className="text-sm text-slatey mt-1">Mon — Fri · 9AM to 6PM</p>
              <p className="text-xs text-muted mt-1">Weekends by appointment</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
