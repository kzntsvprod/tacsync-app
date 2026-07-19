/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios'; // Не забудьте перевірити, чи встановлено пакет (npm i axios)

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
   const [isAuthenticated, setIsAuthenticated] = useState(false);
   const [user, setUser] = useState(null);
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      const fetchUserProfile = async () => {
         const token = localStorage.getItem('token');

         if (!token) {
            setIsLoading(false);
            return;
         }

         try {
            const response = await axios.get(
               'http://localhost:3000/api/users/profile',
               {
                  headers: {
                     Authorization: `Bearer ${token}`,
                  },
               }
            );

            setUser(response.data);
            setIsAuthenticated(true);
         } catch (error) {
            if (error.response) {
               console.error(
                  'Помилка валідації токена:',
                  error.response.status
               );
               logout();
            } else {
               console.error("Помилка з'єднання з сервером:", error.message);
            }
         } finally {
            setIsLoading(false);
         }
      };

      fetchUserProfile();
   }, []);

   const login = (token, userData) => {
      localStorage.setItem('token', token);
      setIsAuthenticated(true);
      setUser(userData);
   };

   const logout = () => {
      localStorage.removeItem('token');
      setIsAuthenticated(false);
      setUser(null);
   };

   const deleteUser = async () => {
      const token = localStorage.getItem('token');

      if (!token) return;

      try {
         setIsLoading(true);

         await axios.delete('http://localhost:3000/api/users/profile', {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         });

         logout();
      } catch (error) {
         if (error.response) {
            console.error('Помилка бекенду:', error.response.data.message);
            if (error.response.status === 401) logout();
         } else {
            console.error("Помилка з'єднання з сервером:", error.message);
         }
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <AuthContext.Provider
         value={{
            isAuthenticated,
            user,
            setUser,
            login,
            logout,
            deleteUser,
            isLoading,
         }}
      >
         {!isLoading && children}
      </AuthContext.Provider>
   );
};

export const useAuth = () => useContext(AuthContext);
