import { GameCard } from '../../components/cards/GameCard.jsx';
import { PartnerCard } from '../../components/cards/PartnerCard.jsx';
import { SynergyWidget } from '../../components/widgets/SynergyWidget.jsx';
import { GAMES, RECOMMENDED_PARTNERS } from '../../config/mockData.js';

export const DashboardView = () => {
   return (
      <>
         <div className="rounded-3xl border border-white/10 p-10 bg-[#0a0a0c] relative overflow-hidden animate-fade-in-up">
            <div className="relative z-10 max-w-xl">
               <h1 className="text-3xl font-semibold text-white mb-4 tracking-tight">
                  AI-Метчмейкінг
               </h1>
               <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  Алгоритм аналізує ваш стиль гри, вільний час та пінг для
                  ідеального підбору напарників. Жодного рандому.
               </p>
               <button className="bg-white text-black px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                  Знайти команду
               </button>
            </div>
            <div className="absolute top-0 right-0 bottom-0 w-1/2 bg-[url('https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=800&q=80')] bg-cover opacity-20 grayscale mask-image-l"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0c] via-[#0a0a0c]/80 to-transparent"></div>
         </div>

         <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 flex flex-col">
               <h2 className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-6">
                  Підібрано для вас
               </h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {RECOMMENDED_PARTNERS.map((partner, idx) => (
                     <PartnerCard
                        key={partner.id}
                        partner={partner}
                        index={idx}
                     />
                  ))}
               </div>
            </div>
            <div className="xl:col-span-1 pt-10">
               <SynergyWidget />
            </div>
         </div>

         <div>
            <h2 className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-6">
               Популярне
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               {GAMES.map((game, idx) => (
                  <GameCard key={game.id} game={game} index={idx} />
               ))}
            </div>
         </div>
      </>
   );
};
