import { useState } from 'react';
import axios from 'axios';
import {
   X,
   Mail,
   Lock,
   Eye,
   EyeOff,
   AlertCircle,
   Loader2,
   Link2,
} from 'lucide-react';

const API_URL = 'http://localhost:3000/api/users';

export const SteamBindModal = ({ isOpen, onClose }) => {
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState(null);
   const [showPassword, setShowPassword] = useState(false);

   const [formData, setFormData] = useState({
      email: '',
      password: '',
   });

   if (!isOpen) return null;

   const handleClose = () => {
      setError(null);
      setFormData({ email: '', password: '' });
      setShowPassword(false);
      onClose();
   };

   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
      if (error) setError(null);
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setError(null);

      if (!formData.email.trim() || !formData.password.trim()) {
         setError('Заповніть всі поля.');
         return;
      }

      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      if (!passwordRegex.test(formData.password)) {
         setError(
            'Пароль має містити щонайменше 8 символів, одну велику та одну маленьку літеру.'
         );
         return;
      }

      try {
         setIsLoading(true);

         await axios.post(`${API_URL}/user/email`, {
            email: formData.email,
         });

         sessionStorage.setItem('pendingSteamEmail', formData.email);
         sessionStorage.setItem('pendingSteamPassword', formData.password);
         window.location.href = `${API_URL}/steam/register`;
      } catch (err) {
         setIsLoading(false);
         const errorMessage =
            err.response?.data?.message || 'Помилка під час перевірки пошти';
         setError(errorMessage);
      }
   };

   const togglePasswordVisibility = () => setShowPassword(!showPassword);

   const inputClasses =
      'w-full bg-[#0a0a0c] border border-white/10 text-white rounded-xl py-3 pl-11 pr-11 focus:outline-none focus:border-white/30 focus:bg-white/[0.02] transition-all duration-300 ease-in-out text-sm placeholder:text-gray-600 [&:-webkit-autofill]:shadow-[0_0_0px_1000px_#0a0a0c_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:white]';

   return (
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in-up">
         <div className="absolute inset-0" onClick={handleClose}></div>
         <div className="relative w-full max-w-md bg-[#050505] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-emerald-500/5 to-transparent pointer-events-none"></div>

            <button
               onClick={handleClose}
               className="cursor-pointer absolute top-6 right-6 z-20 text-gray-500 hover:text-white transition-colors p-1.5 bg-black/50 rounded-full backdrop-blur-md border border-white/10 hover:bg-white/10"
            >
               <X className="w-4 h-4" />
            </button>

            <div className="p-8 relative z-10 overflow-hidden">
               <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                  <Link2 className="w-6 h-6 text-white" />
               </div>

               <h2 className="text-xl font-bold tracking-tight text-white text-center mb-2">
                  Прив'язка акаунту
               </h2>
               <p className="text-sm text-gray-400 text-center mb-8">
                  Для коректної роботи TACSYNC необхідно прив'язати Email та
                  створити пароль перед входом через Steam.
               </p>

               <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {error && (
                     <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 flex items-center gap-3">
                        <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                        <p className="text-sm text-red-400 font-medium">
                           {error}
                        </p>
                     </div>
                  )}

                  <div className="relative group">
                     <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-white transition-colors z-10" />
                     <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="E-mail адреса"
                        className={inputClasses}
                     />
                  </div>

                  <div className="relative group">
                     <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-white transition-colors z-10" />
                     <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Придумайте пароль"
                        className={inputClasses}
                     />
                     <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors focus:outline-none w-5 h-5 flex items-center justify-center z-10"
                     >
                        <div className="relative w-4 h-4 flex items-center justify-center">
                           <EyeOff
                              className={`absolute transition-all duration-300 ease-in-out ${
                                 showPassword
                                    ? 'opacity-100 scale-100 rotate-0'
                                    : 'opacity-0 scale-50 -rotate-90 pointer-events-none'
                              }`}
                           />
                           <Eye
                              className={`absolute transition-all duration-300 ease-in-out ${
                                 !showPassword
                                    ? 'opacity-100 scale-100 rotate-0'
                                    : 'opacity-0 scale-50 rotate-90 pointer-events-none'
                              }`}
                           />
                        </div>
                     </button>
                  </div>

                  <button
                     type="submit"
                     disabled={isLoading}
                     className="cursor-pointer w-full bg-white hover:bg-gray-200 active:scale-[0.98] text-black py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                     {isLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                     ) : (
                        'Продовжити через Steam'
                     )}
                  </button>
               </form>
            </div>
         </div>
      </div>
   );
};
