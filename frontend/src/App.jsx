import {
   BrowserRouter,
   Routes,
   Route,
   Navigate,
   useLocation,
   useNavigate,
} from 'react-router-dom';
import { useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import { ProtectedRoute } from './components/layout/ProtectedRoute.jsx';
import { LandingPage } from './pages/LandingPage.jsx';
import { AppView } from './pages/AppView.jsx';

import { DashboardView } from './pages/views/DashboardView.jsx';
import { LFGView } from './pages/views/LFGView.jsx';
import { TacticalBoardView } from './pages/views/TacticalBoardView.jsx';
import { UnderConstructionView } from './pages/views/UnderConstructionView.jsx';
import { ProfileView } from './pages/views/ProfileView.jsx';

const SteamAuthHandler = () => {
   const { login } = useAuth();
   const location = useLocation();
   const navigate = useNavigate();

   useEffect(() => {
      const params = new URLSearchParams(location.search);
      const token = params.get('token');
      const userString = params.get('user');

      if (token && userString) {
         try {
            const user = JSON.parse(decodeURIComponent(userString));
            window.history.replaceState(
               {},
               document.title,
               window.location.pathname
            );
            login(token, user);
            navigate('/app/dashboard', { replace: true });
         } catch (error) {
            console.error('Помилка парсингу даних зі Steam:', error);
            navigate('/', { replace: true });
         }
      }
   }, [location.search, navigate]);

   return null;
};

export default function App() {
   return (
      <AuthProvider>
         <BrowserRouter>
            <SteamAuthHandler />
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
                     <Route path="profile" element={<ProfileView />} />
                  </Route>
               </Route>

               <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
         </BrowserRouter>
      </AuthProvider>
   );
}
