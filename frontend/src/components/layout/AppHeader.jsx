import { Bell, Plus, Search } from 'lucide-react';

export const AppHeader = () => (
   <header className="h-20 px-8 flex items-center justify-between sticky top-0 z-30 bg-[#000000]/80 backdrop-blur-xl border-b border-white/5">
      <div className="relative w-96 group">
         <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
         <input
            type="text"
            placeholder="Шукати..."
            className="w-full bg-white/5 text-sm text-white border border-white/10 rounded-lg py-2.5 pl-11 pr-4 focus:outline-none focus:border-white/30 transition-all placeholder:text-gray-600"
         />
      </div>
      <div className="flex items-center gap-4">
         <button className="p-2 text-gray-400 hover:text-white transition-colors">
            <Bell className="w-5 h-5" />
         </button>
         <button className="bg-white hover:bg-gray-200 text-black px-5 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2">
            <Plus className="w-4 h-4" /> Створити
         </button>
      </div>
   </header>
);
