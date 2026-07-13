import { Badge } from '../ui/Badge.jsx';
import { ChevronRight, Clock, Gamepad2, Mic, MicOff } from 'lucide-react';

export const SessionCard = ({ session, index = 0 }) => (
   <div
      className="group relative bg-[#0a0a0c] rounded-2xl border border-white/5 hover:border-white/20 transition-all duration-500 overflow-hidden animate-fade-in-up flex flex-col"
      style={{ animationDelay: `${index * 0.1}s` }}
   >
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="p-6 relative z-10 flex flex-col h-full">
         <div className="flex justify-between items-start mb-5">
            <div className="flex items-center gap-3">
               <div className="relative">
                  <img
                     src={session.host.avatar}
                     alt={session.host.name}
                     className="w-10 h-10 rounded-full object-cover border border-white/10 group-hover:border-white/30 transition-colors duration-300"
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#0a0a0c]"></div>
               </div>
               <div>
                  <h4 className="text-gray-200 font-medium text-sm">
                     {session.host.name}
                  </h4>
                  <p className="text-gray-500 text-xs flex items-center gap-1 mt-0.5">
                     <Clock className="w-3 h-3" /> {session.time}
                  </p>
               </div>
            </div>
            <Badge
               variant={
                  session.spots.current === session.spots.max
                     ? 'danger'
                     : 'success'
               }
            >
               {session.spots.current}/{session.spots.max}
            </Badge>
         </div>

         <div className="mb-6 flex-grow">
            <h3 className="text-lg font-semibold text-white mb-2 leading-snug">
               {session.title}
            </h3>
            <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">
               {session.description}
            </p>
         </div>

         <div className="flex flex-wrap gap-2 mb-6">
            <Badge
               variant="default"
               className="flex items-center gap-1.5 text-xs"
            >
               <Gamepad2 className="w-3 h-3" /> {session.game.title}
            </Badge>
            <Badge
               variant="default"
               className="flex items-center gap-1.5 text-xs"
            >
               {session.micRequired ? (
                  <Mic className="w-3 h-3" />
               ) : (
                  <MicOff className="w-3 h-3 text-gray-500" />
               )}
               {session.micRequired ? 'Мікрофон' : 'Без мікро'}
            </Badge>
         </div>

         <button className="w-full py-2.5 rounded-xl text-sm font-medium text-white bg-white/5 hover:bg-white text-center transition-all duration-300 hover:text-black border border-white/10 flex items-center justify-center gap-2 group/btn">
            Відгукнутися{' '}
            <ChevronRight className="w-4 h-4 opacity-50 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all" />
         </button>
      </div>
   </div>
);
