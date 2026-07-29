import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import Explore from '@/components/Explore';
import AIDesigner from '@/components/AIDesigner';
import Gallery from '@/components/Gallery';
import Services from '@/components/Services';
import Pricing from '@/components/Pricing';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Login from '@/components/Login';
import ChatAssistant from '@/components/ChatAssistant';
import { AuthProvider, useAuth } from '@/lib/auth';

function AppContent() {
  const { user, loading } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-warmwhite">
        <div className="w-8 h-8 border-2 border-stone/40 border-t-sage rounded-full animate-spin" />
      </div>
    );
  }

  if (showLogin && !user) {
    return <Login onBack={() => setShowLogin(false)} />;
  }

  return (
    <div className="grain min-h-screen bg-warmwhite">
      <Navbar onLoginClick={() => setShowLogin(true)} />
      <main>
        <Hero />
        <Stats />
        <Explore />
        <AIDesigner />
        <Gallery />
        <Services />
        <Pricing />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <ChatAssistant />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
