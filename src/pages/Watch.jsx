import React, { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, AlertCircle, SkipBack, SkipForward } from 'lucide-react';
import { animeData } from '../data.js';

const Watch = () => {
    const navigate = useNavigate();
    // 1. Get parameters from the URL (defined in App.js as /:seasonParam/:episodeParam)
    const { seasonParam, episodeParam } = useParams(); 

    // Helper: Convert "Season 2" -> "s2" for URLs, and comparison
    // In Watch.jsx

const formatSeasonToId = (seasonString) => {
    if (!seasonString) return '';
    return seasonString.toLowerCase()
        .replace(/season\s*/g, 's')
        .replace(/the\s*movie/g, 'movie')
        .replace(/\s/g, '');
};

    // 2. Find the current episode based on URL params
    // We search the animeData array for a match
    const currentEpisodeIndex = useMemo(() => {
        return animeData.findIndex(ep => {
            // Create an ID from the data to compare with URL
            const epSeasonId = formatSeasonToId(ep.season);
            const epNumString = `e${ep.episodeNumber}`;
            
            // Handle case where URL might be just number (3) or formatted (e3)
            const paramEpMatch = episodeParam === epNumString || episodeParam === String(ep.episodeNumber);
            
            return epSeasonId === seasonParam && paramEpMatch;
        });
    }, [seasonParam, episodeParam]);

    const episode = animeData[currentEpisodeIndex];

    // Redirect if invalid URL (episode not found)
    useEffect(() => {
        if (currentEpisodeIndex === -1) {
            // Optional: Navigate back to home if URL is bad
             navigate('/anime'); 
        }
    }, [currentEpisodeIndex, navigate]);

    if (!episode) return null;

    // Convert view link to preview link logic
    let embedUrl = episode.videoUrl;
    if (embedUrl && embedUrl.includes('drive.google.com') && embedUrl.includes('/view')) {
        embedUrl = embedUrl.replace('/view', '/preview');
    }

    // 3. Handle Next/Prev Logic - Now using URL navigation
    const handleNavigate = (direction) => {
        const nextIndex = direction === 'next' ? currentEpisodeIndex + 1 : currentEpisodeIndex - 1;

        if (nextIndex >= 0 && nextIndex < animeData.length) {
            const nextEp = animeData[nextIndex];
            
            // Generate the new URL parts
            const nextSeasonId = formatSeasonToId(nextEp.season); // e.g., "s2"
            const nextEpId = `e${nextEp.episodeNumber}`; // e.g., "e3"

            // Navigate to the new URL
            navigate(`/watch/${nextSeasonId}/${nextEpId}`);
        }
    };

    const getThemeClasses = (theme) => {
        switch(theme) {
            case 'blue': return { text: 'text-blue-400', bg: 'bg-blue-500', hoverBg: 'hover:bg-blue-400', shadow: 'shadow-blue-500/20' };
            // ... paste other cases ...
            default: return { text: 'text-yellow-400', bg: 'bg-yellow-500', hoverBg: 'hover:bg-yellow-400', shadow: 'shadow-yellow-500/20' };
        }
    };

    const themeColors = getThemeClasses(episode.theme);

    return (
        <div className="min-h-screen w-full flex flex-col bg-black overflow-y-auto">
            {/* Header */}
            <div className="w-full p-4 z-50 flex justify-between items-center bg-slate-900 border-b border-white/10 sticky top-0 shadow-lg">
                <button 
                    onClick={() => navigate('/anime')}
                    className={`flex items-center gap-2 text-white/80 hover:${themeColors.text} transition-colors`}
                >
                    <ChevronLeft size={24} />
                    <span className="font-bold uppercase text-sm tracking-widest">Back to Timeline</span>
                </button>
                <div className="text-right">
                    <h2 className={`${themeColors.text} font-black uppercase italic text-lg`}>{episode.season}</h2>
                    <p className="text-white font-bold text-sm hidden md:block">{episode.title}</p>
                </div>
            </div>

            {/* Player Container */}
            <div className="flex-1 flex flex-col items-center justify-center w-full py-8 px-4 md:px-8">
                {embedUrl ? (
                    <div className="w-full max-w-5xl aspect-video relative rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                        <iframe 
                            src={embedUrl} 
                            className={`w-full h-full border-0 ${themeColors.shadow}`}
                            allow="autoplay; fullscreen"
                            allowFullScreen
                            title={episode.title}
                        ></iframe>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center text-slate-500 gap-4 p-8 border-2 border-slate-700 border-dashed rounded-xl m-10">
                        <AlertCircle size={48} />
                        <div className="text-center">
                            <h3 className="text-xl font-bold text-slate-300 mb-1">Stream Unavailable</h3>
                            <p className="text-sm">The video source for this episode hasn't been added to the archives yet.</p>
                        </div>
                    </div>
                )}
                <h1 className="md:hidden text-white font-black uppercase italic text-xl mt-6 text-center">{episode.title}</h1>
            </div>

            {/* Footer / Navigation */}
            <div className="w-full bg-slate-900 border-t border-white/10 p-4 md:p-6 z-20 mt-auto">
                <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
                    <button 
                        onClick={() => handleNavigate('prev')}
                        // Disable if we are at the very first item in the array
                        disabled={currentEpisodeIndex === 0}
                        className="flex items-center gap-2 px-4 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <SkipBack size={20} />
                        <span className="hidden md:inline font-bold text-sm uppercase">Previous Ep</span>
                    </button>

                    <div className="text-center hidden md:block">
                        <span className="block text-slate-400 text-[10px] uppercase tracking-widest font-bold">Now Watching</span>
                        <span className="block text-white font-black text-lg uppercase italic truncate max-w-[200px] md:max-w-md">
                            {episode.title}
                        </span>
                    </div>

                    <button 
                        onClick={() => handleNavigate('next')}
                        // Disable if we are at the very last item in the array
                        disabled={currentEpisodeIndex === animeData.length - 1}
                        className={`flex items-center gap-2 px-4 py-3 rounded-lg ${themeColors.bg} ${themeColors.hoverBg} text-white transition-all active:scale-95 shadow-lg ${themeColors.shadow} disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                        <span className="hidden md:inline font-bold text-sm uppercase">Next Ep</span>
                        <SkipForward size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Watch;