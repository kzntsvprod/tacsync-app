import { NavLink } from 'react-router-dom';
import { TacsyncLogo } from '../ui/Icons.jsx';
import { CURRENT_USER } from '../../config/mockData.js';
import {
   Home,
   Map,
   MessageSquare,
   Search,
   Settings,
   Users,
} from 'lucide-react';

export const AppSidebar = () => {
   const navItems = [
      { id: 'dashboard', icon: Home, label: 'Огляд' },
      { id: 'lfg', icon: Search, label: 'Пошук гри' },
      {
         id: 'tactical-board',
         icon: Map,
         label: 'Тактична дошка',
         badge: 'New',
      },
      { id: 'messages', icon: MessageSquare, label: 'Повідомлення' },
      { id: 'friends', icon: Users, label: 'Команда' },
   ];

   return (
      <aside className="w-64 bg-[#050505] border-r border-white/5 flex flex-col h-screen sticky top-0 z-40">
         <div className="p-6 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
               <TacsyncLogo className="w-5 h-5 text-black" />
            </div>
            <span className="text-base font-semibold tracking-tight text-white">
               TACSYNC
            </span>
         </div>

         <nav className="flex-1 px-3 py-4 space-y-1">
            {navItems.map((item) => {
               const Icon = item.icon;
               return (
                  <NavLink
                     key={item.id}
                     to={`/app/${item.id}`}
                     className={({ isActive }) =>
                        `w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium ${
                           isActive
                              ? 'bg-white/10 text-white'
                              : 'text-gray-500 hover:bg-white/5 hover:text-gray-300'
                        }`
                     }
                  >
                     {({ isActive }) => (
                        <>
                           <div className="flex items-center gap-3">
                              <Icon
                                 className={`w-4 h-4 ${
                                    isActive ? 'text-white' : 'text-gray-500'
                                 }`}
                                 strokeWidth={2}
                              />
                              {item.label}
                           </div>
                           {item.badge && (
                              <span
                                 className={`text-[9px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded ${
                                    isActive
                                       ? 'bg-white text-black'
                                       : 'bg-white/10 text-gray-400'
                                 }`}
                              >
                                 {item.badge}
                              </span>
                           )}
                        </>
                     )}
                  </NavLink>
               );
            })}
         </nav>

         <div className="p-4 mt-auto border-t border-white/5">
            <NavLink
               to="/app/profile"
               className={({ isActive }) =>
                  `flex items-center gap-3 p-2 rounded-lg transition-colors cursor-pointer group ${
                     isActive ? 'bg-white/10' : 'hover:bg-white/5'
                  }`
               }
            >
               {({ isActive }) => (
                  <>
                     <img
                        src={CURRENT_USER.avatar}
                        alt="User"
                        className={`w-8 h-8 rounded-full object-cover transition-all ${
                           isActive
                              ? 'grayscale-0'
                              : 'grayscale group-hover:grayscale-0'
                        }`}
                     />
                     <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-medium text-gray-200 truncate">
                           {CURRENT_USER.name}
                        </p>
                        <p className="text-[10px] text-gray-500">PRO Акаунт</p>
                     </div>
                     <Settings
                        className={`w-4 h-4 transition-colors ${
                           isActive
                              ? 'text-white'
                              : 'text-gray-600 group-hover:text-white'
                        }`}
                     />
                  </>
               )}
            </NavLink>
         </div>
      </aside>
   );
};
