import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ModuleList from './pages/ModuleList';
import ModulePage from './pages/ModulePage';
import Progress from './pages/Progress';
import Setup from './pages/Setup';

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/modules" element={<ModuleList />} />
          <Route path="/modules/:id" element={<ModulePage />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/setup" element={<Setup />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
