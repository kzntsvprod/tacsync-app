/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
   const [isAuthenticated, setIsAuthenticated] = useState(() => {
      const token = localStorage.getItem('token');
      return !!token;
   });

   const login = (token, nickname) => {
      localStorage.setItem('token', token);
      localStorage.setItem('nickname', nickname);
      setIsAuthenticated(true);
   };

   const logout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('nickname');
      setIsAuthenticated(false);
   };

   return (
      <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
         {children}
      </AuthContext.Provider>
   );
};

export const useAuth = () => useContext(AuthContext);
