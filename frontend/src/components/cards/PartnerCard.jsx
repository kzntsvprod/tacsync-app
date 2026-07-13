import { Badge } from '../ui/Badge.jsx';
import { Activity, Clock, Crosshair, UserPlus } from 'lucide-react';

export const PartnerCard = ({ partner, index }) => (
   <div
      className="group relative bg-[#0a0a0c] rounded-2xl p-5 border border-white/5 hover:border-white/20 transition-all duration-300 animate-fade-in-up flex flex-col h-full"
      style={{ animationDelay: `${index * 0.1}s` }}
   >
      <div className="relative z-10 flex items-start gap-4 mb-4">
         <div className="relative shrink-0">
            <img
               src={partner.avatar}
               alt={partner.name}
               className="w-12 h-12 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
            />
         </div>
         <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start gap-2">
               <h4 className="text-base font-semibold text-white truncate">
                  {partner.name}
               </h4>
               <span className="text-[10px] font-bold text-black bg-white px-2 py-1 rounded shrink-0">
                  {partner.synergy}% Match
               </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5 truncate">
               Рівень {partner.level}
            </p>
         </div>
      </div>

      <div className="flex flex-col gap-2 mb-6 flex-grow">
         <Badge
            variant="default"
            className="justify-start inline-flex rounded-lg"
         >
            <Activity className="w-3 h-3 mr-2 text-gray-400" />{' '}
            {partner.tags.exp}
         </Badge>
         <Badge
            variant="default"
            className="justify-start inline-flex rounded-lg"
         >
            <Clock className="w-3 h-3 mr-2 text-gray-400" /> {partner.tags.time}
         </Badge>
         <Badge
            variant="default"
            className="justify-start inline-flex rounded-lg"
         >
            <Crosshair className="w-3 h-3 mr-2 text-gray-400" />{' '}
            {partner.tags.goal}
         </Badge>
      </div>

      <button className="w-full bg-transparent hover:bg-white border border-white/10 hover:border-white text-white hover:text-black py-2 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2">
         <UserPlus className="w-4 h-4" /> Запросити
      </button>
   </div>
);
