import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/home-page/home-pages.jsx';
import ModuleViewPage from './pages/ModuleViewPage/index.jsx';
import DiscoveryPage from './pages/DiscoveryPage/index.jsx';
import PlatformPage from './pages/PlatformPage/index.js';
import ServicesPage, { MethodologyPage, OurMethodologyPage } from './pages/ServicesPage/index.js';
import AboutUsPage from './pages/AboutUsPage/index.jsx';
import OurWorkPage from './pages/OurWorkPage/index.jsx';
import ContactUsPage from './pages/ContactUsPage/index.jsx';
import NotFoundPage from './pages/NotFoundPage/index.jsx';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/module/*" element={<ModuleViewPage />} />
      <Route path="/discovery" element={<DiscoveryPage />} />
      <Route path="/discovery/:moduleSlug" element={<DiscoveryPage />} />
      <Route path="/platform" element={<PlatformPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/services/methodology" element={<MethodologyPage />} />
      <Route path="/service/our-methodology" element={<OurMethodologyPage />} />
      <Route path="/services/our-methodology" element={<OurMethodologyPage />} />
      <Route path="/about-us" element={<AboutUsPage />} />
      <Route path="/our-work" element={<OurWorkPage />} />
      <Route path="/contact-us" element={<ContactUsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
