import { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import LogosSection from './components/LogosSection';
import ExistSection from './components/ExistSection';
import AiEraSection from './components/AiEraSection';
import FeaturesSection from './components/FeaturesSection';
import AwardsSection from './components/AwardsSection';
import TestimonialSection from './components/TestimonialSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import AboutUsPage from './components/AboutUsPage';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    
    // Intercept pushState
    const originalPushState = window.history.pushState;
    window.history.pushState = function(...args) {
      originalPushState.apply(this, args);
      handleLocationChange();
    };

    // Intercept replaceState
    const originalReplaceState = window.history.replaceState;
    window.history.replaceState = function(...args) {
      originalReplaceState.apply(this, args);
      handleLocationChange();
    };

    // Intercept global click events for client-side routing
    const handleGlobalClick = (e) => {
      const anchor = e.target.closest('a');
      if (anchor) {
        const href = anchor.getAttribute('href');
        if (href && (href.startsWith('/') || href.startsWith('#')) && !href.startsWith('//')) {
          // If clicking a link that targets the same host
          const url = new URL(anchor.href);
          if (url.origin === window.location.origin) {
            e.preventDefault();
            window.history.pushState({}, '', href);
            window.scrollTo({ top: 0, behavior: 'instant' });
          }
        }
      }
    };

    document.addEventListener('click', handleGlobalClick);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
      document.removeEventListener('click', handleGlobalClick);
    };
  }, []);

  const isAboutPage = currentPath === '/about-us' || currentPath === '/about-us/';

  return (
    <div className="relative flex min-h-screen flex-col justify-between bg-white">
      <Header />
      <main className="flex-1">
        {isAboutPage ? (
          <AboutUsPage />
        ) : (
          <>
            <HeroSection />
            <LogosSection />
            <ExistSection />
            <AiEraSection />
            <FeaturesSection />
            <AwardsSection />
            <TestimonialSection />
            <CTASection />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}

