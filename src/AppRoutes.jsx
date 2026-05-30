import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/home-page/home-pages.jsx';
import ModuleViewPage from './pages/ModuleViewPage/index.jsx';
import DiscoveryPage from './pages/DiscoveryPage/index.jsx';
import PlatformPage from './pages/PlatformPage/index.js';
import AboutUsPage from './pages/AboutUsPage/index.jsx';
import ContactUsPage from './pages/ContactUsPage/index.jsx';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/module/*" element={<ModuleViewPage />} />
      <Route path="/discovery" element={<DiscoveryPage />} />
      <Route path="/platform" element={<PlatformPage />} />
      <Route path="/about-us" element={<AboutUsPage />} />
      <Route path="/contact-us" element={<ContactUsPage />} />
    </Routes>
  );
}
