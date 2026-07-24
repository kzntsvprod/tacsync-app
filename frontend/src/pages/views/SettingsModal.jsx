import { useState } from 'react';
import axios from 'axios';
import {
   X,
   Lock,
   Mail,
   AlertCircle,
   CheckCircle2,
   Loader2,
   Eye,
   EyeOff,
} from 'lucide-react';

const API_URL = 'http://localhost:3000/api/users';

export const SettingsModal = ({ isOpen, type, onClose, onSuccess }) => {
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState(null);
   const [successMsg, setSuccessMsg] = useState(null);

   const [showOldPassword, setShowOldPassword] = useState(false);
   const [showNewPassword, setShowNewPassword] = useState(false);

   const [formData, setFormData] = useState({
      password: '',
      newPassword: '',
      newEmail: '',
   });

   if (!isOpen) return null;

   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
      if (error) setError(null);
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setError(null);
      setSuccessMsg(null);

      const token = localStorage.getItem('token');
      if (!token) {
         setError('Помилка авторизації. Увійдіть знову.');
         return;
      }

      setIsLoading(true);

      try {
         if (type === 'email') {
            if (!formData.password || !formData.newEmail) {
               setError('Заповніть всі поля.');
               setIsLoading(false);
               return;
            }

            const response = await axios.patch(
               `${API_URL}/profile/email`,
               {
                  password: formData.password,
                  newEmail: formData.newEmail,
               },
               { headers: { Authorization: `Bearer ${token}` } }
            );

            setSuccessMsg(response.data.message);
            setTimeout(() => {
               onSuccess({ email: response.data.email });
               onClose();
            }, 1500);
         } else if (type === 'password') {
            if (!formData.password || !formData.newPassword) {
               setError('Заповніть всі поля.');
               setIsLoading(false);
               return;
            }

            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
            if (!passwordRegex.test(formData.newPassword)) {
               setError(
                  'Новий пароль має містити щонайменше 8 символів, одну велику та одну маленьку літеру.'
               );
               setIsLoading(false);
               return;
            }

            const response = await axios.patch(
               `${API_URL}/profile/password`,
               {
                  oldPassword: formData.password,
                  newPassword: formData.newPassword,
               },
               { headers: { Authorization: `Bearer ${token}` } }
            );

            setSuccessMsg(response.data.message);
            setTimeout(() => {
               onClose();
            }, 1500);
         }
      } catch (err) {
         setError(err.response?.data?.message || 'Сталася помилка на сервері.');
      } finally {
         setIsLoading(false);
      }
   };

   const inputClasses =
      'w-full bg-[#0a0a0c] border border-white/10 text-white rounded-xl py-3 pl-11 pr-11 focus:outline-none focus:border-white/30 focus:bg-white/[0.02] transition-all duration-300 ease-in-out text-sm placeholder:text-gray-600 [&:-webkit-autofill]:shadow-[0_0_0px_1000px_#0a0a0c_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:white]';

   return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in-up">
         <div className="absolute inset-0" onClick={onClose}></div>
         <div className="relative w-full max-w-md bg-[#050505] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>

            <button
               onClick={onClose}
               className="absolute top-6 right-6 z-20 text-gray-500 hover:text-white transition-colors p-1.5 bg-black/50 rounded-full backdrop-blur-md border border-white/10 hover:bg-white/10"
            >
               <X className="w-4 h-4" />
            </button>

            <div className="p-8 relative z-10 overflow-hidden">
               <h2 className="text-xl font-bold tracking-tight text-white text-center mb-2">
                  {type === 'email'
                     ? 'Зміна Email адреси'
                     : 'Зміна ключа безпеки'}
               </h2>
               <p className="text-sm text-gray-400 text-center mb-8">
                  {type === 'email'
                     ? 'Для зміни пошти введіть поточний пароль для підтвердження.'
                     : 'Введіть старий пароль та придумайте новий.'}
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
                  {successMsg && (
                     <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-3 flex items-center gap-3">
                        <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                        <p className="text-sm text-green-400 font-medium">
                           {successMsg}
                        </p>
                     </div>
                  )}

                  {type === 'email' && (
                     <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-white transition-colors z-10" />
                        <input
                           type="email"
                           name="newEmail"
                           value={formData.newEmail}
                           onChange={handleChange}
                           placeholder="Нова E-mail адреса"
                           className={inputClasses}
                        />
                     </div>
                  )}

                  <div className="relative group">
                     <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-white transition-colors z-10" />
                     <input
                        type={showOldPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder={
                           type === 'email'
                              ? 'Поточний пароль'
                              : 'Старий пароль'
                        }
                        className={inputClasses}
                     />
                     <button
                        type="button"
                        onClick={() => setShowOldPassword(!showOldPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors focus:outline-none w-5 h-5 flex items-center justify-center z-10"
                     >
                        <div className="relative w-4 h-4 flex items-center justify-center">
                           <EyeOff
                              className={`absolute transition-all duration-300 ease-in-out ${
                                 showOldPassword
                                    ? 'opacity-100 scale-100 rotate-0'
                                    : 'opacity-0 scale-50 -rotate-90 pointer-events-none'
                              }`}
                           />
                           <Eye
                              className={`absolute transition-all duration-300 ease-in-out ${
                                 !showOldPassword
                                    ? 'opacity-100 scale-100 rotate-0'
                                    : 'opacity-0 scale-50 rotate-90 pointer-events-none'
                              }`}
                           />
                        </div>
                     </button>
                  </div>

                  {type === 'password' && (
                     <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-white transition-colors z-10" />
                        <input
                           type={showNewPassword ? 'text' : 'password'}
                           name="newPassword"
                           value={formData.newPassword}
                           onChange={handleChange}
                           placeholder="Новий пароль"
                           className={inputClasses}
                        />
                        <button
                           type="button"
                           onClick={() => setShowNewPassword(!showNewPassword)}
                           className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors focus:outline-none w-5 h-5 flex items-center justify-center z-10"
                        >
                           <div className="relative w-4 h-4 flex items-center justify-center">
                              <EyeOff
                                 className={`absolute transition-all duration-300 ease-in-out ${
                                    showNewPassword
                                       ? 'opacity-100 scale-100 rotate-0'
                                       : 'opacity-0 scale-50 -rotate-90 pointer-events-none'
                                 }`}
                              />
                              <Eye
                                 className={`absolute transition-all duration-300 ease-in-out ${
                                    !showNewPassword
                                       ? 'opacity-100 scale-100 rotate-0'
                                       : 'opacity-0 scale-50 rotate-90 pointer-events-none'
                                 }`}
                              />
                           </div>
                        </button>
                     </div>
                  )}

                  <button
                     type="submit"
                     disabled={isLoading || successMsg !== null}
                     className="w-full bg-white hover:bg-gray-200 active:scale-[0.98] text-black py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                     {isLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                     ) : (
                        'Зберегти зміни'
                     )}
                  </button>
               </form>
            </div>
         </div>
      </div>
   );
};
