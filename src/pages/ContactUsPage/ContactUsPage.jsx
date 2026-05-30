import React from 'react';
import HeroSection from './components/HeroSection';
import ContactFormSection from './components/ContactFormSection';
import LocationsSection from './components/LocationsSection';

const ContactUsPage = () => {
  return (
    <main className="content z-1 relative flex flex-col bg-white">
      <HeroSection />
      <ContactFormSection />
      <LocationsSection />
    </main>
  );
};

export default ContactUsPage;
