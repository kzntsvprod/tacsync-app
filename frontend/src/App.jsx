import {
   BrowserRouter,
   Routes,
   Route,
   Navigate,
   useLocation,
   useNavigate,
   useSearchParams,
} from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import { ProtectedRoute } from './components/layout/ProtectedRoute.jsx';
import { LandingPage } from './pages/LandingPage.jsx';
import { AppView } from './pages/AppView.jsx';
import axios from 'axios';

import { DashboardView } from './pages/views/DashboardView.jsx';
import { LFGView } from './pages/views/LFGView.jsx';
import { TacticalBoardView } from './pages/views/TacticalBoardView.jsx';
import { UnderConstructionView } from './pages/views/UnderConstructionView.jsx';
import { ProfileView } from './pages/views/ProfileView.jsx';

export const SteamAuthHandler = () => {
   const [searchParams] = useSearchParams();
   const navigate = useNavigate();
   const { login } = useAuth();

   const hasProcessed = useRef(false);

   useEffect(() => {
      if (hasProcessed.current) return;

      const token = searchParams.get('token');
      const tempToken = searchParams.get('tempToken');
      const userParam = searchParams.get('user');

      if (token && userParam) {
         hasProcessed.current = true;

         const user = JSON.parse(decodeURIComponent(userParam));
         login(token, user);
         sessionStorage.removeItem('pendingSteamEmail');
         sessionStorage.removeItem('pendingSteamPassword');
         navigate('/app/dashboard', { replace: true });
      } else if (tempToken) {
         hasProcessed.current = true;

         const email = sessionStorage.getItem('pendingSteamEmail');
         const password = sessionStorage.getItem('pendingSteamPassword');

         if (email && password) {
            axios
               .post('http://localhost:3000/api/users/complete-steam', {
                  email,
                  password,
                  tempToken,
               })
               .then((res) => {
                  sessionStorage.removeItem('pendingSteamEmail');
                  sessionStorage.removeItem('pendingSteamPassword');
                  login(res.data.token, res.data.user);
                  navigate('/app/dashboard', { replace: true });
               })
               .catch((error) => {
                  console.error('Помилка реєстрації:', error);
               });
         } else {
            navigate(`/?tempToken=${tempToken}`, { replace: true });
         }
      }
   }, [searchParams, navigate, login]);

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
