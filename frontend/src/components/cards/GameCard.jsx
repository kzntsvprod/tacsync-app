import { Users } from 'lucide-react';

export const GameCard = ({ game, index = 0 }) => (
   <div
      className="group relative rounded-2xl overflow-hidden cursor-pointer h-64 border border-white/10 animate-fade-in-up"
      style={{ animationDelay: `${index * 0.1}s` }}
   >
      <img
         src={game.image}
         alt={game.title}
         className="absolute inset-0 w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90"></div>

      <div className="absolute inset-0 p-5 flex flex-col justify-end">
         <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold text-white tracking-tight">
               {game.title}
            </h3>
            <span className="text-xs font-medium text-gray-300 bg-black/50 px-2 py-1 rounded-md backdrop-blur-md border border-white/10 flex items-center gap-1.5">
               <Users className="w-3 h-3 text-white" /> {game.activePlayers}
            </span>
         </div>
         <div className="flex gap-2 flex-wrap">
            {game.tags.map((tag, idx) => (
               <span
                  key={idx}
                  className="text-[10px] tracking-wider text-gray-400 bg-white/5 px-2 py-1 rounded border border-white/5 backdrop-blur-sm"
               >
                  {tag}
               </span>
            ))}
         </div>
      </div>
   </div>
);
