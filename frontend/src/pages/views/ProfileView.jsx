import {
   Edit3,
   Mail,
   Lock,
   Shield,
   AlertCircle,
   LogOut,
   ChevronRight,
   Trash2,
   Activity,
   Star,
   Zap,
} from 'lucide-react';

import { SteamIcon } from '../../components/ui/Icons.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

export const ProfileView = () => {
   const { user, logout } = useAuth();

   if (!user) return null;

   return (
      <div className="h-[calc(100vh-9rem)] w-full flex items-center justify-center animate-fade-in-up overflow-hidden">
         <div className="w-full max-w-[1000px] space-y-8">
            <div className="bg-[#0a0a0c] rounded-[24px] border border-white/5 p-8 md:p-10 flex flex-col md:flex-row gap-10 items-center md:items-start transition-all hover:border-white/10">
               <div className="relative group shrink-0 cursor-pointer">
                  <div className="w-32 h-32 rounded-full overflow-hidden border border-white/10 relative">
                     <img
                        src={user.avatar}
                        className="w-full h-full object-cover"
                        alt="profile"
                     />
                     <button className="absolute inset-0 bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm cursor-pointer">
                        <Edit3
                           className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
                           strokeWidth={1.5}
                        />
                     </button>
                  </div>
               </div>

               <div className="flex-1 w-full text-center md:text-left">
                  <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-4 mb-6">
                     <div>
                        <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                           <h2 className="text-3xl font-bold text-white tracking-tight">
                              {user.name}
                           </h2>
                           <span className="bg-white text-black text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                              PRO
                           </span>
                        </div>
                        <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-gray-400">
                           <SteamIcon className="w-4 h-4 opacity-70" />
                           <span>ID: 76561198012345678</span>
                        </div>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-white/5">
                     <div className="flex flex-col items-center md:items-start gap-1">
                        <div className="flex items-center gap-2 text-gray-500 mb-1">
                           <Activity className="w-4 h-4" strokeWidth={1.5} />
                           <span className="text-[10px] uppercase tracking-[0.15em] font-medium">
                              Рівень
                           </span>
                        </div>
                        <span className="text-2xl font-semibold text-white">
                           {user.level || 42}
                        </span>
                     </div>

                     <div className="flex flex-col items-center md:items-start gap-1">
                        <div className="flex items-center gap-2 text-gray-500 mb-1">
                           <Star className="w-4 h-4" strokeWidth={1.5} />
                           <span className="text-[10px] uppercase tracking-[0.15em] font-medium">
                              Репутація
                           </span>
                        </div>
                        <span className="text-2xl font-semibold text-white">
                           {user.reputation || 4.9}
                        </span>
                     </div>

                     <div className="flex flex-col items-center md:items-start gap-1">
                        <div className="flex items-center gap-2 text-gray-500 mb-1">
                           <Zap
                              className="w-4 h-4 text-emerald-500/70"
                              strokeWidth={1.5}
                           />
                           <span className="text-[10px] uppercase tracking-[0.15em] font-medium">
                              Синергія
                           </span>
                        </div>
                        <span className="text-2xl font-semibold text-emerald-400">
                           94%
                        </span>
                     </div>
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="bg-[#0a0a0c] rounded-[24px] border border-white/5 p-8 flex flex-col relative overflow-hidden group hover:border-emerald-500/20 transition-colors duration-500">
                  <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px] pointer-events-none transition-all group-hover:bg-emerald-500/10"></div>

                  <div className="flex items-center justify-between mb-6 relative z-10">
                     <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.15em] flex items-center gap-2">
                        <Shield className="w-4 h-4" strokeWidth={1.5} /> Безпека
                        акаунту
                     </h3>
                  </div>

                  <div className="space-y-3 flex-1 relative z-10">
                     <div className="flex items-center justify-between p-4 rounded-xl bg-black/40 border border-white/5 hover:border-white/10 transition-colors">
                        <div className="flex items-center gap-4">
                           <Mail
                              className="w-5 h-5 text-gray-400"
                              strokeWidth={1.5}
                           />
                           <div>
                              <p className="text-sm text-gray-200 font-medium">
                                 Email адреса
                              </p>
                              <p className="text-[13px] text-gray-500">
                                 {user.email || 'alex.tactics@mail.com'}
                              </p>
                           </div>
                        </div>
                        <span className="text-[10px] uppercase tracking-wider font-bold bg-white/5 text-gray-300 px-2 py-1 rounded">
                           Підтверджено
                        </span>
                     </div>

                     <div className="flex items-center justify-between p-4 rounded-xl bg-black/40 border border-white/5 hover:border-white/10 transition-colors">
                        <div className="flex items-center gap-4">
                           <Lock
                              className="w-5 h-5 text-gray-400"
                              strokeWidth={1.5}
                           />
                           <div>
                              <p className="text-sm text-gray-200 font-medium">
                                 Ключ безпеки
                              </p>
                              <p className="text-[13px] text-gray-500">
                                 Оновлено 12 днів тому
                              </p>
                           </div>
                        </div>
                        <button className="text-[13px] font-medium text-gray-400 hover:text-white transition-all duration-300 cursor-pointer hover:bg-white/5 px-3 py-1.5 rounded-lg active:scale-95">
                           Змінити
                        </button>
                     </div>
                  </div>
               </div>

               <div className="bg-[#0a0a0c] rounded-[24px] border border-white/5 p-8 flex flex-col relative overflow-hidden group hover:border-red-500/20 transition-colors duration-500">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-[80px] pointer-events-none transition-all group-hover:bg-red-500/10"></div>

                  <div className="flex items-center justify-between mb-6 relative z-10">
                     <h3 className="text-[11px] font-bold text-red-500/70 uppercase tracking-[0.15em] flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" strokeWidth={1.5} />{' '}
                        Зона ризику
                     </h3>
                  </div>

                  <div className="space-y-3 flex-1 relative z-10">
                     <button
                        onClick={logout}
                        className="w-full flex items-center justify-between p-4 rounded-xl bg-black/40 border border-white/5 hover:bg-white/5 hover:border-white/10 transition-all duration-300 group/btn text-left cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
                     >
                        <div className="flex items-center gap-4 text-gray-400 group-hover/btn:text-white transition-colors">
                           <LogOut className="w-5 h-5" strokeWidth={1.5} />
                           <div>
                              <p className="text-sm text-gray-200 font-medium transition-colors group-hover/btn:text-white">
                                 Вийти з системи
                              </p>
                              <p className="text-[13px] text-gray-500">
                                 Завершити поточну сесію
                              </p>
                           </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-600 group-hover/btn:text-white transition-colors" />
                     </button>

                     <button className="w-full flex items-center justify-between p-4 rounded-xl bg-red-500/5 border border-red-500/10 hover:bg-red-500/10 hover:border-red-500/30 transition-all duration-300 group/delete text-left cursor-pointer hover:scale-[1.01] active:scale-[0.99]">
                        <div className="flex items-center gap-4 text-red-400/80 group-hover/delete:text-red-400 transition-colors">
                           <Trash2 className="w-5 h-5" strokeWidth={1.5} />
                           <div>
                              <p className="text-sm font-medium">
                                 Ліквідувати профіль
                              </p>
                              <p className="text-[13px] text-red-500/50 group-hover/delete:text-red-400/70 transition-colors">
                                 Безповоротне видалення даних
                              </p>
                           </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-red-900/50 group-hover/delete:text-red-400 transition-colors" />
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};
