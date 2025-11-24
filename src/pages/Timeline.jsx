import React from 'react';
import { useNavigate } from 'react-router-dom';
import TimelineCard from '../components/TimelineCard'; // Import your Card Component
// import { animeData, mangaData } from './data.js'; // Import data
import { animeData , mangaData} from '../data.js';

const TimelinePage = ({ type }) => {
  const navigate = useNavigate();
  
  const data = type === 'anime' ? animeData : mangaData;
  const themeColor = type === 'anime' ? 'bg-yellow-400' : 'bg-emerald-500';
  const textColor = type === 'anime' ? 'text-yellow-400' : 'text-emerald-500';
  const borderColor = type === 'anime' ? 'border-yellow-400' : 'border-emerald-500';
  const shadowColor = type === 'anime' ? 'shadow-yellow-400/50' : 'shadow-emerald-500/50';

  const handleEpisodeClick = (item) => {
    // Navigate to watch page with episode data in state
    navigate('/watch', { state: { episode: item } });
  };

  return (
    <div className="max-w-2xl mx-auto py-24 px-4 space-y-4">
      {data.map((item, index) => (
        <TimelineCard 
          key={index} 
          item={item} 
          index={index} 
          themeColor={themeColor}
          borderColor={borderColor}
          textColor={textColor}
          shadowColor={shadowColor}
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

export default TimelinePage;