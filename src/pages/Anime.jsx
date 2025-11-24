import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import component
import TimelineCard from '../components/TimelineCard';
import { animeData } from '../data.js'; // Import data

const Anime = () => {
  const navigate = useNavigate();

  const handleEpisodeClick = (item) => {
  // 1. Convert "Season 1" to "s1" (Must match the logic in Watch.jsx)
  // In Anime.jsx (inside handleEpisodeClick)

const seasonId = item.season.toLowerCase()
    .replace(/season\s*/g, 's') // Converts "Season 1" -> "s1"
    .replace(/the\s*movie/g, 'm') // (Optional) Converts "The Movie" -> "movie"
    .replace(/\s/g, ''); // Removes any remaining spaces ("OVA 1" -> "ova1")
  
  // 2. Create the episode ID (e.g., "e1")
  const episodeId = `e${item.episodeNumber}`;

  // 3. Navigate using backticks ` ` to insert variables
  // CORRECT: /watch/s1/e1
  // WRONG: /watch/:seasonParam/:episodeParam
  navigate(`/watch/${seasonId}/${episodeId}`);
};

  return (
    <div className="max-w-2xl mx-auto py-24 px-4 space-y-4">
      {animeData.map((item, index) => (
        <TimelineCard 
          key={index} 
          item={item} 
          index={index} 
          themeColor="bg-yellow-400"
          borderColor="border-yellow-400"
          textColor="text-yellow-400"
          shadowColor="shadow-yellow-400/50"
          onClick={handleEpisodeClick}
        />
      ))}
      
      <div className="h-64 flex flex-col items-center justify-center text-slate-500 gap-4 opacity-50">
        <p className="text-sm font-bold uppercase tracking-widest">End of Timeline</p>
        <button onClick={() => navigate('/')} className="text-xs border border-slate-600 px-4 py-2 rounded-full hover:bg-slate-800 hover:text-white transition-colors">
            Back to Home
        </button>
      </div>
    </div>
  );
};

export default Anime;