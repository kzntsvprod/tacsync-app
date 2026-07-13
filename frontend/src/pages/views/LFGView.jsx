import { SessionCard } from '../../components/cards/SessionCard.jsx';
import { LFG_SESSIONS } from '../../config/mockData.js';

export const LFGView = () => {
   return (
      <div className="space-y-6 animate-fade-in-up">
         <div className="flex items-center justify-between">
            <div>
               <h1 className="text-2xl font-semibold text-white tracking-tight mb-2">
                  Глобальний пошук
               </h1>
               <p className="text-gray-400 text-sm">
                  Знайдіть відкриті сесії за вашими критеріями.
               </p>
            </div>
            <div className="flex gap-3">
               <select className="bg-[#0a0a0c] text-sm text-white border border-white/10 rounded-lg px-4 py-2 outline-none">
                  <option>Всі ігри</option>
               </select>
               <select className="bg-[#0a0a0c] text-sm text-white border border-white/10 rounded-lg px-4 py-2 outline-none">
                  <option>Будь-який стиль</option>
               </select>
            </div>
         </div>
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {LFG_SESSIONS.map((session, idx) => (
               <SessionCard key={session.id} session={session} index={idx} />
            ))}
            {LFG_SESSIONS.map((session, idx) => (
               <SessionCard
                  key={`dup-${session.id}`}
                  session={{ ...session, id: session.id + 100 }}
                  index={idx + 3}
               />
            ))}
         </div>
      </div>
   );
};
