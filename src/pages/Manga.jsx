import React from 'react';
import { useNavigate } from 'react-router-dom';
import TimelineCard from '../components/TimelineCard';
import { mangaData } from '../data.js';

const Manga = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto py-24 px-4 space-y-4">
      {mangaData.map((item, index) => (
        <TimelineCard 
          key={index} 
          item={item} 
          index={index} 
          themeColor="bg-emerald-500"
          borderColor="border-emerald-500"
          textColor="text-emerald-500"
          shadowColor="shadow-emerald-500/50"
          // Manga doesn't usually play video, so onClick might not be needed or can open a reader
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

export default Manga;