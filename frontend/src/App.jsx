import { useState } from 'react';
import { LandingPage } from './pages/LandingPage.jsx';
import { AppView } from './pages/AppView.jsx';
import { AuthModal } from './components/ui/AuthModal.jsx';

export default function App() {
   const [showLanding, setShowLanding] = useState(true);
   const [showAuthModal, setShowAuthModal] = useState(false);

   return (
      <>
         {showLanding ? (
            <LandingPage onEnter={() => setShowAuthModal(true)} />
         ) : (
            <AppView />
         )}

         {showAuthModal && (
            <AuthModal
               onClose={() => setShowAuthModal(false)}
               onSuccess={() => {
                  setShowAuthModal(false);
                  setShowLanding(false);
               }}
            />
         )}
      </>
   );
}
