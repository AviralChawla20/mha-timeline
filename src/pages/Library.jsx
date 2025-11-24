// ... imports
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { libraryData } from '../data';
import { BookOpen, Tv, ArrowUp, Star, Zap, Circle, Film, Book, AlertCircle, Home as HomeIcon, ChevronRight, Library, X, Calendar, User, Globe, Play, ChevronLeft, SkipForward, SkipBack } from 'lucide-react';


const LibraryPage = () => {
    const [selectedBook, setSelectedBook] = useState(null);
    
    // State to track which categories are open. 
    const [expandedSections, setExpandedSections] = useState({
        "Main Series": false, 
        "Movie Tie-In": false,
        "Variant Cover": false
    });

    const toggleSection = (category) => {
        setExpandedSections(prev => ({
            ...prev,
            [category]: !prev[category]
        }));
    };

    // Helper: Group books by category
    const getGroupedBooks = () => {
        const groups = {};
        libraryData.forEach(book => {
            if (!groups[book.category]) {
                groups[book.category] = [];
            }
            groups[book.category].push(book);
        });
        return groups;
    };

    const groupedLibrary = getGroupedBooks();
    const categories = Object.keys(groupedLibrary).sort((a, b) => {
        if (a === "Main Series") return -1;
        if (b === "Main Series") return 1;
        return a.localeCompare(b);
    });

    return (
        <div className="h-full w-full relative bg-slate-900">
            
            {/* SCROLLABLE AREA */}
            <div className="absolute inset-0 w-full h-full overflow-y-auto hide-scrollbar px-6 py-24 perspective-container">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12 animate-[slideDown_0.5s_ease-out]">
                        <h2 className="text-pink-400 font-black tracking-widest uppercase text-lg mb-2">My Hero Academia</h2>
                        <h1 className="text-5xl font-black uppercase italic text-white" style={{ textShadow: '4px 4px 0px #be185d' }}>
                            Complete Literary Archive
                        </h1>
                    </div>

                    {/* CATEGORY LOOPS */}
                    <div className="pb-32 space-y-8">
                        {categories.map((category) => (
                            <div key={category} className="w-full">
                                {/* THE BAR (Clickable Header) */}
                                <button 
                                    onClick={() => toggleSection(category)}
                                    className="w-full flex items-center justify-between p-5 bg-gradient-to-r from-slate-800 to-slate-900 border-l-4 border-pink-500 rounded-r-xl shadow-lg hover:shadow-pink-500/10 hover:brightness-110 transition-all duration-300 group mb-4"
                                >
                                    <div className="flex items-center gap-4">
                                        <Book size={24} className="text-pink-500" />
                                        <h3 className="text-2xl font-black uppercase italic text-white tracking-tight group-hover:text-pink-400 transition-colors">
                                            {category}
                                        </h3>
                                        <span className="text-slate-500 text-xs font-bold bg-slate-950 px-2 py-1 rounded-md">
                                            {groupedLibrary[category].length} ITEMS
                                        </span>
                                    </div>
                                    <ChevronRight 
                                        size={24} 
                                        className={`text-slate-400 transition-transform duration-300 ${expandedSections[category] ? 'rotate-90 text-pink-500' : ''}`}
                                    />
                                </button>

                                {/* THE GRID (Conditional Render) */}
                                <div 
                                    className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 transition-all duration-700 ease-in-out overflow-hidden ${
                                        expandedSections[category] ? 'opacity-100 max-h-[50000px] py-4 pb-12' : 'opacity-0 max-h-0'
                                    }`}
                                >
                                    {groupedLibrary[category].map((book) => (
                                        <div 
                                            key={book.id}
                                            onClick={() => setSelectedBook(book)}
                                            className="group/card relative cursor-pointer"
                                        >
                                            <div className="aspect-[2/3] w-full rounded-lg overflow-hidden border-2 border-white/10 shadow-2xl transition-all duration-300 group-hover/card:scale-105 group-hover/card:border-pink-500 group-hover/card:shadow-pink-500/50 relative bg-slate-800">
                                                <img 
                                                    src={book.image} 
                                                    alt={book.title}
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity flex items-end p-4">
                                                    <span className="text-white font-bold text-sm uppercase tracking-wider">View File</span>
                                                </div>
                                            </div>
                                            <h3 className="mt-4 text-center font-bold text-slate-300 group-hover/card:text-pink-400 transition-colors uppercase text-sm px-2">
                                                {book.title}
                                            </h3>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* FLOATING RETURN BUTTON */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-40 pointer-events-none">
                <button 
                    onClick={() => Maps('/')} 
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-slate-800 border border-white/20 hover:bg-slate-700 transition-colors shadow-lg pointer-events-auto"
                >
                    <HomeIcon size={18} />
                    <span className="text-xs font-bold uppercase tracking-widest">Return Home</span>
                </button>
            </div>

            {/* MODAL (Now using Portal to break out of z-index traps) */}
            {selectedBook && createPortal(
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/95 backdrop-blur-md animate-[fadeIn_0.2s_ease-out]">
                    <div className="bg-slate-900 border border-pink-500/50 w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden relative flex flex-col md:flex-row">
                        <button 
                            onClick={() => setSelectedBook(null)}
                            className="absolute top-3 right-3 z-50 p-2 bg-black/60 hover:bg-pink-600 rounded-full text-white transition-colors border border-white/10"
                        >
                            <X size={24} />
                        </button>

                        {/* Image Side */}
                        <div className="w-full md:w-2/5 h-64 md:h-auto bg-slate-800 relative shrink-0">
                            <img 
                                src={selectedBook.image} 
                                alt={selectedBook.title}
                                className="w-full h-full object-cover object-center"
                            />
                        </div>

                        {/* Info Side */}
                        <div className="flex-1 p-6 md:p-8 overflow-y-auto custom-scrollbar">
                            <div className="mb-6">
                                <span className="inline-block px-3 py-1 rounded bg-pink-600/20 border border-pink-500 text-pink-400 text-xs font-bold uppercase tracking-widest mb-2">
                                    {selectedBook.category}
                                </span>
                                <h2 className="text-2xl md:text-4xl font-black italic uppercase text-white leading-tight mb-4 pr-8">
                                    {selectedBook.title}
                                </h2>
                                
                                <div className="flex flex-wrap gap-4 text-sm text-slate-400 mb-6 font-mono">
                                    <div className="flex items-center gap-2">
                                        <User size={16} className="text-pink-500" />
                                        <span>{selectedBook.author}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar size={16} className="text-pink-500" />
                                        <span>{selectedBook.date}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Globe size={16} className="text-pink-500" />
                                        <span>{selectedBook.language}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="prose prose-invert prose-pink max-w-none">
                                <p className="text-slate-300 leading-relaxed whitespace-pre-line text-sm md:text-base">
                                    {selectedBook.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
};

export default LibraryPage;