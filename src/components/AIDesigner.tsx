import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Sparkles, Scan, Box, Check, Download, Calendar, ChevronRight, X, Image as ImageIcon } from 'lucide-react';

const steps = [
  { icon: Upload, label: 'Upload Images' },
  { icon: Scan, label: 'Scan Room' },
  { icon: Box, label: 'Generate 3D' },
  { icon: Sparkles, label: 'Apply AI Design' },
  { icon: Check, label: 'Photoreal Output' },
];

const styles = ['Modern', 'Minimal', 'Japanese', 'Scandinavian', 'Industrial', 'Luxury'];

const styleResults: Record<string, string> = {
  Modern: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=900',
  Minimal: 'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=900',
  Japanese: 'https://images.pexels.com/photos/6585757/pexels-photo-6585757.jpeg?auto=compress&cs=tinysrgb&w=900',
  Scandinavian: 'https://images.pexels.com/photos/1571459/pexels-photo-1571459.jpeg?auto=compress&cs=tinysrgb&w=900',
  Industrial: 'https://images.pexels.com/photos/803975/pexels-photo-803975.jpeg?auto=compress&cs=tinysrgb&w=900',
  Luxury: 'https://images.pexels.com/photos/7587000/pexels-photo-7587000.jpeg?auto=compress&cs=tinysrgb&w=900',
};

const styleDetails: Record<string, { furniture: string; lighting: string; materials: string; timeline: string }> = {
  Modern: { furniture: '14 items', lighting: '3 zones', materials: 'Oak, Linen, Steel', timeline: '4 weeks' },
  Minimal: { furniture: '8 items', lighting: '2 zones', materials: 'Ash, Cotton', timeline: '3 weeks' },
  Japanese: { furniture: '10 items', lighting: '2 zones', materials: 'Cedar, Tatami, Paper', timeline: '5 weeks' },
  Scandinavian: { furniture: '12 items', lighting: '3 zones', materials: 'Birch, Wool', timeline: '4 weeks' },
  Industrial: { furniture: '11 items', lighting: '4 zones', materials: 'Concrete, Leather, Brass', timeline: '6 weeks' },
  Luxury: { furniture: '18 items', lighting: '5 zones', materials: 'Marble, Velvet, Gold', timeline: '8 weeks' },
};

export default function AIDesigner() {
  const [step, setStep] = useState(0);
  const [generating, setGenerating] = useState(false);
  const [done, setDone] = useState(false);
  const [style, setStyle] = useState('Modern');
  const [budget, setBudget] = useState(5000);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => setUploadedImage(reader.result as string);
    reader.readAsDataURL(file);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const removeImage = () => {
    setUploadedImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleGenerate = () => {
    setGenerating(true);
    setStep(0);
    setDone(false);
    const interval = setInterval(() => {
      setStep((s) => {
        if (s >= steps.length - 1) {
          clearInterval(interval);
          setTimeout(() => {
            setGenerating(false);
            setDone(true);
          }, 800);
          return s;
        }
        return s + 1;
      });
    }, 900);
  };

  const reset = () => {
    setDone(false);
    setUploadedImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const details = styleDetails[style];

  return (
    <section id="designer" className="section-pad bg-warmwhite relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-sm font-medium text-sage tracking-widest uppercase">AI Room Designer</span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-light text-ink">
            Redesign Your Room in <span className="font-medium text-gradient">30 Seconds</span>
          </h2>
          <p className="mt-4 text-slatey max-w-xl mx-auto">
            Upload a photo, choose a style, and watch AI transform your space into a photoreal design — complete with furniture, lighting, and a shopping list.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Left: controls */}
          <div className="glass rounded-3xl p-8 shadow-glass">
            <div className="mb-8">
              <label className="text-sm font-medium text-ink mb-3 block">1. Upload Room Photo</label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
              />
              {uploadedImage ? (
                <div className="relative rounded-2xl overflow-hidden group">
                  <img src={uploadedImage} alt="Uploaded room" className="w-full h-56 object-cover" />
                  <div className="absolute inset-0 bg-ink/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <button
                    onClick={removeImage}
                    className="absolute top-3 right-3 w-9 h-9 rounded-full glass flex items-center justify-center hover:bg-error/20 transition-colors"
                    aria-label="Remove image"
                  >
                    <X className="w-4 h-4 text-ink" />
                  </button>
                  <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-full glass text-xs font-medium text-ink flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-sage" />
                    Photo uploaded
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-2xl p-10 text-center transition-colors cursor-pointer group ${
                    dragging ? 'border-sage bg-sage/10' : 'border-stone hover:border-sage hover:bg-sage/5'
                  }`}
                >
                  <div className="w-14 h-14 rounded-2xl bg-mist flex items-center justify-center mx-auto mb-4 group-hover:bg-sage/20 transition-colors">
                    <Upload className="w-6 h-6 text-slatey" />
                  </div>
                  <p className="text-sm text-slatey">Drop a photo or click to browse</p>
                  <p className="text-xs text-muted mt-1">JPG, PNG up to 20MB</p>
                </div>
              )}
            </div>

            <div className="mb-8">
              <label className="text-sm font-medium text-ink mb-3 block">2. Choose Your Style</label>
              <div className="grid grid-cols-3 gap-2.5">
                {styles.map((s) => (
                  <button
                    key={s}
                    onClick={() => setStyle(s)}
                    className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      style === s
                        ? 'bg-ink text-warmwhite shadow-soft'
                        : 'glass-soft text-slatey hover:text-ink'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <label className="text-sm font-medium text-ink mb-3 block flex items-center justify-between">
                <span>3. Your Budget</span>
                <span className="text-sage font-medium">${budget.toLocaleString()}</span>
              </label>
              <input
                type="range"
                min={1000}
                max={50000}
                step={500}
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full accent-sage"
              />
              <div className="flex justify-between text-xs text-muted mt-1">
                <span>$1k</span>
                <span>$50k</span>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={generating}
              className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {generating ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-4 h-4 border-2 border-warmwhite/30 border-t-warmwhite rounded-full"
                  />
                  Generating…
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Generate My Design
                </>
              )}
            </button>
          </div>

          {/* Right: result / pipeline */}
          <div className="glass rounded-3xl p-8 shadow-glass min-h-[500px] flex flex-col">
            <AnimatePresence mode="wait">
              {done ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col h-full"
                >
                  <div className="relative rounded-2xl overflow-hidden mb-6 flex-1 min-h-[260px]">
                    <img
                      src={styleResults[style]}
                      alt={`${style} AI generated design`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full bg-sage text-white text-xs font-medium flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5" />
                      {style} · Generated
                    </div>
                    {uploadedImage && (
                      <div className="absolute top-3 right-3 w-16 h-16 rounded-xl overflow-hidden border-2 border-white/60 shadow-soft">
                        <img src={uploadedImage} alt="Original" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-5">
                    {[
                      { label: 'Furniture', value: details.furniture },
                      { label: 'Lighting', value: details.lighting },
                      { label: 'Materials', value: details.materials },
                      { label: 'Est. Timeline', value: details.timeline },
                    ].map((item) => (
                      <div key={item.label} className="p-3 rounded-xl bg-white/50">
                        <div className="text-xs text-muted">{item.label}</div>
                        <div className="text-sm font-medium text-ink">{item.value}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = styleResults[style];
                        link.download = `ecosystem-${style.toLowerCase()}-design.jpg`;
                        link.target = '_blank';
                        link.click();
                      }}
                      className="btn-primary flex-1"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                    <a href="#contact" className="btn-ghost flex-1">
                      <Calendar className="w-4 h-4" />
                      Book Consult
                    </a>
                    <button onClick={reset} className="btn-ghost">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ) : generating ? (
                <motion.div
                  key="pipeline"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col justify-center h-full"
                >
                  {uploadedImage && (
                    <div className="mb-8 flex justify-center">
                      <div className="relative w-32 h-32 rounded-2xl overflow-hidden">
                        <img src={uploadedImage} alt="Scanning" className="w-full h-full object-cover" />
                        <motion.div
                          className="absolute inset-x-0 h-1 bg-sage/80 shadow-glow"
                          animate={{ top: ['0%', '100%', '0%'] }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        />
                      </div>
                    </div>
                  )}
                  <div className="flex flex-col gap-5">
                    {steps.map((s, i) => {
                      const Icon = s.icon;
                      const active = i <= step;
                      return (
                        <motion.div
                          key={s.label}
                          animate={{ opacity: active ? 1 : 0.35 }}
                          className="flex items-center gap-4"
                        >
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${active ? 'bg-sage text-white' : 'bg-mist text-muted'}`}>
                            {i === step && i < steps.length - 1 ? (
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                              />
                            ) : active ? (
                              <Check className="w-5 h-5" />
                            ) : (
                              <Icon className="w-5 h-5" />
                            )}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-ink">{s.label}</div>
                            <div className="text-xs text-muted">Step {i + 1} of {steps.length}</div>
                          </div>
                          {i < steps.length - 1 && (
                            <ChevronRight className={`w-4 h-4 ml-auto transition-opacity ${active ? 'text-sage opacity-100' : 'opacity-30'}`} />
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center h-full text-center"
                >
                  <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-sage/30 to-champagne/30 flex items-center justify-center mb-6">
                    <Sparkles className="w-9 h-9 text-sage" />
                  </div>
                  <h3 className="font-display text-xl font-medium text-ink mb-2">Your Design Appears Here</h3>
                  <p className="text-slatey text-sm max-w-xs">
                    Upload a room photo, pick a style, and press generate. Your photoreal design will appear in seconds.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
