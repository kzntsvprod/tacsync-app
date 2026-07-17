/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
   const [isAuthenticated, setIsAuthenticated] = useState(() => {
      const token = localStorage.getItem('token');
      return !!token;
   });

   const [user, setUser] = useState(() => {
      const token = localStorage.getItem('token');
      const nickname = localStorage.getItem('nickname') || 'Alex_Tactics';

      if (token) {
         return {
            name: nickname,
            avatar:
               'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=150&q=80',
            level: 42,
            reputation: 4.9,
            email: 'alex.tactics@mail.com',
         };
      }
      return null;
   });

   const login = (token, nickname) => {
      localStorage.setItem('token', token);
      localStorage.setItem('nickname', nickname);
      setIsAuthenticated(true);

      setUser({
         name: nickname,
         avatar:
            'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=150&q=80',
         level: 42,
         reputation: 4.9,
         email: 'alex.tactics@mail.com',
      });
   };

   const logout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('nickname');
      setIsAuthenticated(false);
      setUser(null);
   };

   return (
      <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
         {children}
      </AuthContext.Provider>
   );
};

export const useAuth = () => useContext(AuthContext);
