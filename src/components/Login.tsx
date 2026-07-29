import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Sparkles, Loader2, AlertCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/lib/auth';

export default function Login({ onBack }: { onBack: () => void }) {
  const { signIn, signUp, configured } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = mode === 'login'
      ? await signIn(email, password)
      : await signUp(email, password, fullName);
    setLoading(false);
    if (error) setError(error);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=1920')",
          }}
        />
        <div className="absolute inset-0 bg-warmwhite/70 backdrop-blur-sm" />
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-md"
      >
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-slatey hover:text-ink transition-colors mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to home
        </button>

        <div className="glass rounded-3xl p-8 md:p-10 shadow-glass">
          {/* Logo */}
          <div className="flex items-center gap-2.5 mb-8 justify-center">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sage to-champagne flex items-center justify-center">
              <div className="w-4 h-4 rounded-md bg-warmwhite/90" />
            </div>
            <span className="font-display font-semibold text-xl text-ink">Ecosystem</span>
          </div>

          {/* Mode toggle */}
          <div className="flex p-1.5 rounded-2xl bg-mist/60 mb-8">
            <button
              onClick={() => { setMode('login'); setError(null); }}
              className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                mode === 'login' ? 'bg-warmwhite text-ink shadow-soft' : 'text-slatey'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setMode('signup'); setError(null); }}
              className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                mode === 'signup' ? 'bg-warmwhite text-ink shadow-soft' : 'text-slatey'
              }`}
            >
              Create Account
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, x: mode === 'login' ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: mode === 'login' ? 20 : -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="font-display text-2xl font-light text-ink mb-1">
                {mode === 'login' ? 'Welcome back' : 'Begin your journey'}
              </h2>
              <p className="text-sm text-slatey mb-6">
                {mode === 'login'
                  ? 'Sign in to access your designs and consultations.'
                  : 'Create an account to start redesigning your spaces.'}
              </p>

              {!configured && (
                <div className="mb-5 px-4 py-3 rounded-xl bg-warning/10 border border-warning/30 text-sm text-slatey flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-warning flex-shrink-0 mt-0.5" />
                  <span>Authentication is being set up. You can still explore the site — sign in will be available shortly.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {mode === 'signup' && (
                  <div>
                    <label className="text-xs font-medium text-slatey mb-2 block">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Jane Doe"
                        className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/60 border border-stone/40 focus:border-sage focus:outline-none transition-colors text-ink placeholder:text-muted"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-xs font-medium text-slatey mb-2 block">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane@example.com"
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/60 border border-stone/40 focus:border-sage focus:outline-none transition-colors text-ink placeholder:text-muted"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-slatey mb-2 block">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                    <input
                      type="password"
                      required
                      minLength={6}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/60 border border-stone/40 focus:border-sage focus:outline-none transition-colors text-ink placeholder:text-muted"
                    />
                  </div>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="px-4 py-3 rounded-xl bg-error/10 border border-error/30 text-sm text-error"
                  >
                    {error}
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full disabled:opacity-60"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      {mode === 'login' ? 'Sign In' : 'Create Account'}
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 flex items-center gap-3">
                <div className="flex-1 h-px bg-stone/40" />
                <span className="text-xs text-muted">or</span>
                <div className="flex-1 h-px bg-stone/40" />
              </div>

              <p className="text-center text-xs text-muted mt-5">
                {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
                <button
                  onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(null); }}
                  className="text-sage font-medium hover:underline"
                >
                  {mode === 'login' ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

      </motion.div>
    </div>
  );
}
