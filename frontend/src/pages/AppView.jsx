import { useState } from 'react';
import { AppSidebar } from '../components/layout/AppSidebar.jsx';
import { AppHeader } from '../components/layout/AppHeader.jsx';
import { DashboardView } from './views/DashboardView.jsx';
import { LFGView } from './views/LFGView.jsx';
import { TacticalBoardView } from './views/TacticalBoardView.jsx';
import { UnderConstructionView } from './views/UnderConstructionView.jsx';

export const AppView = () => {
   const [activeTab, setActiveTab] = useState('dashboard');

   return (
      <div className="flex w-full min-h-screen bg-black">
         <AppSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

         <div className="flex-1 flex flex-col min-w-0">
            <AppHeader />

            <main className="flex-1 overflow-y-auto p-8">
               <div className="max-w-[1200px] mx-auto space-y-12">
                  {activeTab === 'dashboard' && <DashboardView />}

                  {activeTab === 'lfg' && <LFGView />}

                  {activeTab === 'tactical-board' && <TacticalBoardView />}

                  {(activeTab === 'messages' || activeTab === 'friends') && (
                     <UnderConstructionView />
                  )}
               </div>
            </main>
         </div>
      </div>
   );
};
