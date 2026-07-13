import { Terminal } from 'lucide-react';

export const UnderConstructionView = () => {
   return (
      <div className="flex flex-col items-center justify-center h-[50vh] text-center opacity-50">
         <Terminal className="w-12 h-12 text-white mb-4" strokeWidth={1} />
         <p className="text-white text-sm tracking-widest uppercase">
            Модуль в розробці
         </p>
      </div>
   );
};
