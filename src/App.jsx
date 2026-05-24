import { BrowserRouter } from 'react-router-dom';
import Header from './pages/Header/index.jsx';
import Footer from './pages/Footer/index.jsx';
import AppRoutes from './AppRoutes.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <div className="relative flex min-h-screen flex-col justify-between bg-white">
        <Header />
        <main className="flex-1">
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
