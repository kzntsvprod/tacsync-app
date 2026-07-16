import { Outlet } from 'react-router-dom';
import { AppSidebar } from '../components/layout/AppSidebar.jsx';
import { AppHeader } from '../components/layout/AppHeader.jsx';

export const AppView = () => {
   return (
      <div className="flex w-full min-h-screen bg-black">
         <AppSidebar />

         <div className="flex-1 flex flex-col min-w-0">
            <AppHeader />

            <main className="flex-1 overflow-y-auto p-8">
               <div className="max-w-[1200px] mx-auto space-y-12">
                  <Outlet />
               </div>
            </main>
         </div>
      </div>
   );
};
