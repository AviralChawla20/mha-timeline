import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Home as HomeIcon, Tv, BookOpen, Library, ArrowUp } from 'lucide-react';

// Import Pages
import Home from './pages/Home';
import Anime from './pages/Anime';
import Manga from './pages/Manga';
import LibraryPage from './pages/Library';
import Watch from './pages/Watch';

// We create a "Layout" component to handle the Header and Background that appear on most pages
const Layout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  // Determine styles based on path
  const isHome = path === '/';
  const isWatch = path === '/watch';
  const isAnime = path === '/anime';
  const isManga = path === '/manga';
  const isLibrary = path === '/library';

  // Dynamic Background
  const getBgClass = () => {
    if (isAnime) return 'bg-[conic-gradient(at_center,_var(--tw-gradient-stops))] from-yellow-500 via-slate-900 to-yellow-500';
    if (isManga) return 'bg-[conic-gradient(at_center,_var(--tw-gradient-stops))] from-emerald-500 via-slate-900 to-emerald-500';
    if (isLibrary) return 'bg-[conic-gradient(at_center,_var(--tw-gradient-stops))] from-pink-500 via-slate-900 to-pink-500';
    return 'bg-slate-900';
  };

  return (
    <div className="h-screen w-full bg-slate-900 overflow-hidden font-sans text-white selection:bg-red-600 selection:text-white relative">
      {/* Background Effect */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
      <div className={`absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none transition-all duration-700 ${getBgClass()}`}></div>

      {/* Header - Show on Anime, Manga, Library */}
      {!isHome && !isWatch && (
        <header className="relative z-20 flex flex-col md:flex-row items-center justify-between px-6 py-4 bg-slate-950/80 backdrop-blur-md border-b border-white/10 shadow-xl">
           <div className="flex items-center gap-3 mb-4 md:mb-0 cursor-pointer group" onClick={() => navigate('/')}>
              <div className={`p-2 rounded-full ${isAnime ? 'bg-yellow-400' : isManga ? 'bg-emerald-500' : 'bg-pink-500'} text-slate-900 font-black text-xl group-hover:scale-110 transition-transform`}>
                UA
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-tighter uppercase italic text-white" style={{ textShadow: '2px 2px 0px #e11d48' }}>
                  My Hero <span className={isAnime ? 'text-yellow-400' : isManga ? 'text-emerald-500' : 'text-pink-500'}>
                      {isLibrary ? 'Archive' : 'Timeline'}
                  </span>
                </h1>
                <p className="text-xs text-slate-400 uppercase tracking-widest font-bold group-hover:text-white transition-colors">Return Home</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
                <button onClick={() => navigate('/')} className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors border border-white/10" title="Go Home">
                    <HomeIcon size={20} />
                </button>
                {/* Navigation Pills */}
                <div className="flex p-1 bg-slate-800 rounded-full border border-white/10 shadow-inner">
                    <button onClick={() => navigate('/anime')} className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-full font-bold uppercase text-xs transition-all duration-300 ${isAnime ? 'bg-yellow-400 text-black shadow-lg scale-105' : 'text-slate-400 hover:text-white'}`}>
                        <Tv size={14} /> <span className="hidden md:inline">Anime</span>
                    </button>
                    <button onClick={() => navigate('/manga')} className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-full font-bold uppercase text-xs transition-all duration-300 ${isManga ? 'bg-emerald-500 text-black shadow-lg scale-105' : 'text-slate-400 hover:text-white'}`}>
                        <BookOpen size={14} /> <span className="hidden md:inline">Manga</span>
                    </button>
                    <button onClick={() => navigate('/library')} className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-full font-bold uppercase text-xs transition-all duration-300 ${isLibrary ? 'bg-pink-500 text-white shadow-lg scale-105' : 'text-slate-400 hover:text-white'}`}>
                        <Library size={14} /> <span className="hidden md:inline">Archive</span>
                    </button>
                </div>
            </div>
        </header>
      )}

      {/* Scrollable Main Content */}
      <main className={`relative z-10 h-[calc(100vh-80px)] ${isLibrary ? 'overflow-hidden' : 'overflow-y-auto scroll-smooth perspective-container'} hide-scrollbar`}>
        {children}
      </main>

       {/* Scroll To Top Button (Global) */}
      <ScrollToTopButton /> 
    </div>
  );
};

// Helper for ScrollToTop logic (extracted from original App)
const ScrollToTopButton = () => {
    const [showScrollTop, setShowScrollTop] = useState(false);
    
    // We need to attach the scroll listener to the MAIN element, not window
    useEffect(() => {
        const mainElement = document.querySelector('main');
        if(!mainElement) return;

        const handleScroll = () => {
            setShowScrollTop(mainElement.scrollTop > 300);
        };
        mainElement.addEventListener('scroll', handleScroll);
        return () => mainElement.removeEventListener('scroll', handleScroll);
    }, []); // Run once on mount (though simpler to just put logic in Layout, this separates concerns)

    const scrollToTop = () => {
        const mainElement = document.querySelector('main');
        if(mainElement) mainElement.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <button 
            onClick={scrollToTop}
            className={`fixed bottom-8 right-8 z-30 p-4 rounded-full bg-red-600 text-white shadow-lg transition-all duration-500 hover:bg-red-500 hover:scale-110 active:scale-95 border-4 border-white ${showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
        >
            <ArrowUp size={24} strokeWidth={3} />
        </button>
    );
}

// Global Styles for Scrollbar
const GlobalStyles = () => (
    <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes slideDown { from { transform: translateY(-20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
    `}</style>
);

const App = () => {
  return (
    <Router>
      <GlobalStyles />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/anime" element={<Anime />} />
          <Route path="/manga" element={<Manga />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/watch/:seasonParam/:episodeParam" element={<Watch />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;