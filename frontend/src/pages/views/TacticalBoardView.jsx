import { LOBBY_PLAYERS } from '../../config/mockData.js';
import { Eraser, Headphones, MapPin, Mic, MicOff, PenTool } from 'lucide-react';

export const TacticalBoardView = () => (
   <div className="h-[calc(100vh-6rem)] flex gap-6 animate-fade-in-up">
      <div className="flex-1 relative bg-[#050505] rounded-3xl border border-white/5 overflow-hidden flex flex-col">
         <div className="absolute top-4 left-4 right-4 h-12 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl z-20 flex items-center justify-between px-4">
            <div className="flex items-center gap-3">
               <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
               <h3 className="text-gray-300 text-xs font-medium uppercase tracking-widest">
                  Операція: Helldive #404
               </h3>
            </div>
            <div className="flex items-center gap-2">
               <button className="text-xs font-medium text-gray-400 hover:text-white px-3 py-1 transition-colors">
                  Очистити
               </button>
               <button className="text-xs font-medium bg-white text-black px-4 py-1.5 rounded hover:bg-gray-200 transition-colors">
                  Зберегти
               </button>
            </div>
         </div>

         <div className="absolute inset-0 tactical-grid opacity-20 pointer-events-none z-0"></div>
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1600&q=80')] opacity-10 bg-cover bg-center grayscale mix-blend-screen z-0"></div>

         <svg
            className="absolute inset-0 w-full h-full z-10 pointer-events-none"
            viewBox="0 0 800 600"
         >
            <path
               d="M 150 450 Q 300 400 400 250 T 650 150"
               fill="none"
               stroke="rgba(255,255,255,0.8)"
               strokeWidth="2"
               strokeDasharray="6,6"
               className="animate-[fillProgress_4s_linear_infinite]"
            />
            <circle cx="150" cy="450" r="6" fill="white" />
            <circle
               cx="650"
               cy="150"
               r="10"
               fill="none"
               stroke="white"
               strokeWidth="2"
            />
            <path
               d="M 642 142 L 658 158 M 658 142 L 642 158"
               stroke="white"
               strokeWidth="2"
            />
         </svg>

         <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/80 backdrop-blur-md border border-white/10 rounded-xl p-1.5 flex flex-col gap-1 z-20">
            <button className="p-2.5 bg-white text-black rounded-lg transition-colors">
               <PenTool className="w-4 h-4" />
            </button>
            <button className="p-2.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
               <Eraser className="w-4 h-4" />
            </button>
            <div className="h-px bg-white/10 w-full my-1"></div>
            <button className="p-2.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
               <MapPin className="w-4 h-4" />
            </button>
         </div>
      </div>

      <div className="w-72 flex flex-col gap-6">
         <div className="bg-[#0a0a0c] border border-white/5 rounded-3xl p-5 relative overflow-hidden flex flex-col">
            <div className="flex items-center justify-between mb-5">
               <h3 className="text-gray-300 text-xs font-medium uppercase tracking-widest flex items-center gap-2">
                  <Headphones className="w-4 h-4 text-white" /> Зв'язок
               </h3>
               <div className="flex gap-1 h-3 items-end">
                  <div
                     className="w-1 bg-white rounded-t-sm animate-wave"
                     style={{ animationDelay: '0ms' }}
                  ></div>
                  <div
                     className="w-1 bg-white rounded-t-sm animate-wave"
                     style={{ animationDelay: '150ms' }}
                  ></div>
                  <div
                     className="w-1 bg-white rounded-t-sm animate-wave"
                     style={{ animationDelay: '300ms' }}
                  ></div>
               </div>
            </div>

            <div className="space-y-2">
               {LOBBY_PLAYERS.map((player) => (
                  <div
                     key={player.id}
                     className="flex items-center justify-between bg-[#050505] rounded-xl p-2.5 border border-white/5"
                  >
                     <div className="flex items-center gap-3">
                        <img
                           src={player.avatar}
                           className={`w-7 h-7 rounded-full grayscale ${player.isSpeaking ? 'ring-1 ring-white grayscale-0' : ''}`}
                           alt="avatar"
                        />
                        <span
                           className={`text-xs font-medium ${player.isSpeaking ? 'text-white' : 'text-gray-500'}`}
                        >
                           {player.name}
                        </span>
                     </div>
                     {player.isMicOn ? (
                        <Mic className="w-3 h-3 text-gray-400" />
                     ) : (
                        <MicOff className="w-3 h-3 text-red-500" />
                     )}
                  </div>
               ))}
            </div>
            <button className="mt-4 w-full bg-white/5 hover:bg-white/10 text-white text-xs py-2.5 rounded-lg transition-colors border border-white/5">
               Налаштування звуку
            </button>
         </div>

         <div className="flex-1 bg-[#0a0a0c] border border-white/5 rounded-3xl p-5 flex flex-col">
            <h3 className="text-gray-300 text-xs font-medium uppercase tracking-widest mb-5">
               Готовність
            </h3>
            <div className="flex-1 flex flex-col gap-3">
               {LOBBY_PLAYERS.map((player) => (
                  <div
                     key={`status-${player.id}`}
                     className="flex items-center justify-between border-b border-white/5 pb-2"
                  >
                     <span className="text-xs text-gray-400">
                        {player.name}
                     </span>
                     {player.isReady ? (
                        <span className="text-[10px] text-black bg-white px-2 py-0.5 rounded">
                           Готовий
                        </span>
                     ) : (
                        <span className="text-[10px] text-gray-500 px-2 py-0.5 border border-white/10 rounded">
                           Очікує
                        </span>
                     )}
                  </div>
               ))}
            </div>
            <button className="w-full mt-auto bg-white hover:bg-gray-200 text-black text-sm font-semibold py-3 rounded-xl transition-all">
               Розпочати
            </button>
         </div>
      </div>
   </div>
);
