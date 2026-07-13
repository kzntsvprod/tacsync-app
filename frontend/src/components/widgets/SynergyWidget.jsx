import { GAMES } from '../../config/mockData.js';
import { ShieldCheck } from 'lucide-react';

export const SynergyWidget = () => (
   <div className="relative overflow-hidden bg-[#0a0a0b] border border-white/5 rounded-3xl p-6 h-full flex flex-col">
      <div className="relative z-10 flex items-center justify-between mb-4">
         <h3 className="text-sm font-medium text-gray-400 flex items-center gap-2 uppercase tracking-widest shrink-0">
            Аналіз синергії
         </h3>
         <ShieldCheck className="w-4 h-4 text-white shrink-0" />
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center min-h-[160px]">
         <div className="relative w-40 h-40 flex items-center justify-center shrink-0">
            <svg
               viewBox="0 0 36 36"
               className="w-full h-full transform -rotate-90"
            >
               <path
                  className="text-white/5"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
               />
               <path
                  className="text-white animate-progress"
                  strokeDasharray="85, 100"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
               />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
               <span className="text-4xl font-light text-white tracking-tighter">
                  85<span className="text-xl text-gray-500">%</span>
               </span>
               <span className="text-[9px] uppercase tracking-[0.2em] text-gray-500 mt-2">
                  Сумісність
               </span>
            </div>
         </div>
      </div>

      <div className="relative z-10 mt-8 pt-6 border-t border-white/5">
         <p className="text-xs text-gray-400 mb-4 text-center">
            Спільні ігри з{' '}
            <span className="text-white font-medium">StealthNinja</span>
         </p>
         <div className="flex justify-center items-center gap-3">
            {GAMES.slice(0, 3).map((game, i) => (
               <img
                  key={i}
                  src={game.image}
                  className="w-10 h-10 rounded-lg object-cover border border-white/10 shadow-lg"
                  alt="Game"
               />
            ))}
            <div className="w-10 h-10 rounded-lg bg-[#13131a] border border-white/10 flex items-center justify-center text-xs font-bold text-gray-400">
               +4
            </div>
         </div>
      </div>
   </div>
);
