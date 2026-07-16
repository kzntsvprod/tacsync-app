import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { ProtectedRoute } from './components/layout/ProtectedRoute.jsx';
import { LandingPage } from './pages/LandingPage.jsx';
import { AppView } from './pages/AppView.jsx';

import { DashboardView } from './pages/views/DashboardView.jsx';
import { LFGView } from './pages/views/LFGView.jsx';
import { TacticalBoardView } from './pages/views/TacticalBoardView.jsx';
import { UnderConstructionView } from './pages/views/UnderConstructionView.jsx';

export default function App() {
   return (
      <AuthProvider>
         <BrowserRouter>
            <Routes>
               <Route path="/" element={<LandingPage />} />

               <Route element={<ProtectedRoute />}>
                  <Route path="/app" element={<AppView />}>
                     <Route
                        index
                        element={<Navigate to="dashboard" replace />}
                     />

                     <Route path="dashboard" element={<DashboardView />} />
                     <Route path="lfg" element={<LFGView />} />
                     <Route
                        path="tactical-board"
                        element={<TacticalBoardView />}
                     />
                     <Route
                        path="messages"
                        element={<UnderConstructionView />}
                     />
                     <Route
                        path="friends"
                        element={<UnderConstructionView />}
                     />
                  </Route>
               </Route>

               <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
         </BrowserRouter>
      </AuthProvider>
   );
}
