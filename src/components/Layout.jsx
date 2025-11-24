import React, { useRef, useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate, Link } from 'react-router-dom';
import { Home as HomeIcon, Tv, BookOpen, Library, ArrowUp } from 'lucide-react';

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Determine current view based on path
  const getView = () => {
    if (location.pathname === '/') return 'home';
    if (location.pathname.includes('anime')) return 'anime';
    if (location.pathname.includes('manga')) return 'manga';
    if (location.pathname.includes('library')) return 'library';
    if (location.pathname.includes('watch')) return 'watch';
    return 'home';
  };

  const view = getView();

  // Reset scroll on route change
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [location.pathname]);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      setShowScrollTop(scrollContainerRef.current.scrollTop > 300);
    }
  };

  const scrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="h-screen w-full bg-slate-900 overflow-hidden font-sans text-white selection:bg-red-600 selection:text-white relative">
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      </div>
      
      {/* Dynamic Backgrounds */}
      <div className={`absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none transition-all duration-700 
        ${view === 'anime' ? 'bg-[conic-gradient(at_center,_var(--tw-gradient-stops))] from-yellow-500 via-slate-900 to-yellow-500' : 
          view === 'manga' ? 'bg-[conic-gradient(at_center,_var(--tw-gradient-stops))] from-emerald-500 via-slate-900 to-emerald-500' :
          view === 'library' ? 'bg-[conic-gradient(at_center,_var(--tw-gradient-stops))] from-pink-500 via-slate-900 to-pink-500' :
          view === 'watch' ? 'bg-black' :
          'bg-slate-900'
        }`}>
      </div>

      {/* Header (Hidden on Home and Watch) */}
      {view !== 'home' && view !== 'watch' && (
          <header className="relative z-20 flex flex-col md:flex-row items-center justify-between px-6 py-4 bg-slate-950/80 backdrop-blur-md border-b border-white/10 shadow-xl">
            <div className="flex items-center gap-3 mb-4 md:mb-0 cursor-pointer group" onClick={() => navigate('/')}>
              <div className={`p-2 rounded-full ${view === 'anime' ? 'bg-yellow-400' : view === 'manga' ? 'bg-emerald-500' : 'bg-pink-500'} text-slate-900 font-black text-xl group-hover:scale-110 transition-transform`}>
                UA
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-tighter uppercase italic text-white" style={{ textShadow: '2px 2px 0px #e11d48' }}>
                  My Hero <span className={view === 'anime' ? 'text-yellow-400' : view === 'manga' ? 'text-emerald-500' : 'text-pink-500'}>
                      {view === 'library' ? 'Archive' : 'Timeline'}
                  </span>
                </h1>
                <p className="text-xs text-slate-400 uppercase tracking-widest font-bold group-hover:text-white transition-colors">Return Home</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
                <Link to="/" className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors border border-white/10" title="Go Home">
                    <HomeIcon size={20} />
                </Link>

                <div className="flex p-1 bg-slate-800 rounded-full border border-white/10 shadow-inner">
                    <Link to="/anime" className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-full font-bold uppercase text-xs transition-all duration-300 ${view === 'anime' ? 'bg-yellow-400 text-black shadow-lg scale-105' : 'text-slate-400 hover:text-white'}`}>
                        <Tv size={14} /> <span className="hidden md:inline">Anime</span>
                    </Link>
                    <Link to="/manga" className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-full font-bold uppercase text-xs transition-all duration-300 ${view === 'manga' ? 'bg-emerald-500 text-black shadow-lg scale-105' : 'text-slate-400 hover:text-white'}`}>
                        <BookOpen size={14} /> <span className="hidden md:inline">Manga</span>
                    </Link>
                    <Link to="/library" className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-full font-bold uppercase text-xs transition-all duration-300 ${view === 'library' ? 'bg-pink-500 text-white shadow-lg scale-105' : 'text-slate-400 hover:text-white'}`}>
                        <Library size={14} /> <span className="hidden md:inline">Archive</span>
                    </Link>
                </div>
            </div>
          </header>
      )}

      {/* Main Content Area */}
      <main 
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className={`relative z-10 h-[calc(100vh-80px)] ${view === 'library' ? 'overflow-hidden' : 'overflow-y-auto scroll-smooth perspective-container'} hide-scrollbar`}
      >
         <Outlet />
      </main>

      {/* Scroll to Top */}
      {view !== 'home' && view !== 'watch' && (
        <button 
            onClick={scrollToTop}
            className={`fixed bottom-8 right-8 z-30 p-4 rounded-full bg-red-600 text-white shadow-lg transition-all duration-500 hover:bg-red-500 hover:scale-110 active:scale-95 border-4 border-white ${showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
        >
            <ArrowUp size={24} strokeWidth={3} />
        </button>
      )}
    </div>
  );
};

export default Layout;