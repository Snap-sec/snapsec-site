import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/home-page/home-pages.jsx';
import AboutUsPage from './pages/AboutUsPage/index.jsx';
import DiscoveryPage from './pages/DiscoveryPage/index.jsx';
import ModuleViewPage from './pages/ModuleViewPage/index.jsx';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about-us" element={<AboutUsPage />} />
      <Route path="/discovery" element={<DiscoveryPage />} />
      <Route path="/module/*" element={<ModuleViewPage />} />
    </Routes>
  );
}
