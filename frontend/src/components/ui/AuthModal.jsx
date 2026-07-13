import { useState, useRef } from 'react';
import { TacsyncLogo, SteamIcon } from './Icons.jsx';
import {
   AlertCircle,
   Loader2,
   Lock,
   Mail,
   User,
   X,
   ShieldCheck,
} from 'lucide-react';

export const AuthModal = ({ onClose, onSuccess }) => {
   const [isLogin, setIsLogin] = useState(true);
   const [isLoading, setIsLoading] = useState(false);

   const [step, setStep] = useState('form');
   const [otp, setOtp] = useState(['', '', '', '', '', '']);
   const inputRefs = useRef([]);

   const [formData, setFormData] = useState({
      email: '',
      password: '',
      username: '',
      steamId: '',
   });
   const [error, setError] = useState(null);

   const handleSubmit = (e) => {
      e.preventDefault();
      setError(null);

      if (
         !formData.email.trim() ||
         !formData.password.trim() ||
         (!isLogin && (!formData.username.trim() || !formData.steamId.trim()))
      ) {
         setError("Помилка доступу: заповніть всі обов'язкові поля.");
         return;
      }

      setIsLoading(true);
      setTimeout(() => {
         setIsLoading(false);
         if (!isLogin) {
            setStep('verification');
         } else {
            onSuccess();
         }
      }, 1500);
   };

   const handleVerify = (e) => {
      e.preventDefault();
      setError(null);

      if (otp.some((digit) => digit === '')) {
         setError('Помилка синхронізації: введіть усі 6 цифр.');
         return;
      }

      setIsLoading(true);
      setTimeout(() => {
         setIsLoading(false);
         onSuccess();
      }, 1500);
   };

   const handleOtpChange = (index, value) => {
      if (error) setError(null);
      if (!/^\d*$/.test(value)) return;

      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value !== '' && index < 5) {
         inputRefs.current[index + 1].focus();
      }
   };

   const handleOtpKeyDown = (index, e) => {
      if (e.key === 'Backspace' && !otp[index] && index > 0) {
         inputRefs.current[index - 1].focus();
      }
   };

   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
      if (error) setError(null);
   };

   return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
         <div className="absolute inset-0" onClick={onClose}></div>
         <div className="relative w-full max-w-md bg-[#050505] border border-white/10 rounded-3xl overflow-hidden shadow-2xl animate-fade-in-up">
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] pointer-events-none"></div>

            <button
               onClick={onClose}
               className="absolute top-6 right-6 z-20 text-gray-500 hover:text-white transition-colors p-1.5 bg-black/50 rounded-full backdrop-blur-md border border-white/10 hover:bg-white/10"
            >
               <X className="w-4 h-4" />
            </button>

            <div className="p-8 relative z-10 overflow-hidden">
               <div className="flex items-center justify-center gap-3 mb-8">
                  <TacsyncLogo className="w-8 h-8 text-white" />
                  <span className="text-xl font-bold tracking-tight text-white">
                     TACSYNC
                  </span>
               </div>

               {step === 'form' ? (
                  <div className="animate-fade-in-up">
                     <div className="flex bg-[#0a0a0c] p-1 rounded-xl mb-8 border border-white/5">
                        <button
                           onClick={() => setIsLogin(true)}
                           className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${isLogin ? 'bg-white/10 text-white shadow-sm border border-white/10' : 'text-gray-500 hover:text-gray-300 border border-transparent'}`}
                        >
                           Вхід
                        </button>
                        <button
                           onClick={() => setIsLogin(false)}
                           className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${!isLogin ? 'bg-white/10 text-white shadow-sm border border-white/10' : 'text-gray-500 hover:text-gray-300 border border-transparent'}`}
                        >
                           Реєстрація
                        </button>
                     </div>

                     <form
                        onSubmit={handleSubmit}
                        className="space-y-4"
                        noValidate
                     >
                        {error && (
                           <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 flex items-center gap-3 animate-fade-in-up">
                              <div className="bg-red-500/20 p-1.5 rounded-lg shrink-0">
                                 <AlertCircle className="w-4 h-4 text-red-400" />
                              </div>
                              <p className="text-sm text-red-400 font-medium">
                                 {error}
                              </p>
                           </div>
                        )}

                        {!isLogin && (
                           <>
                              <div className="relative group">
                                 <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-white transition-colors" />
                                 <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    placeholder="Ім'я гравця (Nickname)"
                                    className="w-full bg-[#0a0a0c] border border-white/10 text-white rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-white/30 transition-all text-sm placeholder:text-gray-600"
                                 />
                              </div>
                              <div className="relative group">
                                 <SteamIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-white transition-colors" />
                                 <input
                                    type="text"
                                    name="steamId"
                                    value={formData.steamId}
                                    onChange={handleChange}
                                    placeholder="Steam ID"
                                    className="w-full bg-[#0a0a0c] border border-white/10 text-white rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-white/30 transition-all text-sm placeholder:text-gray-600"
                                 />
                              </div>
                           </>
                        )}

                        <div className="relative group">
                           <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-white transition-colors" />
                           <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="E-mail адреса"
                              className="w-full bg-[#0a0a0c] border border-white/10 text-white rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-white/30 transition-all text-sm placeholder:text-gray-600"
                           />
                        </div>
                        <div className="relative group">
                           <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-white transition-colors" />
                           <input
                              type="password"
                              name="password"
                              value={formData.password}
                              onChange={handleChange}
                              placeholder="Пароль"
                              className="w-full bg-[#0a0a0c] border border-white/10 text-white rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-white/30 transition-all text-sm placeholder:text-gray-600"
                           />
                        </div>

                        <button
                           type="submit"
                           disabled={isLoading}
                           className="w-full bg-white hover:bg-gray-200 text-black py-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                           {isLoading ? (
                              <Loader2 className="w-5 h-5 animate-spin" />
                           ) : isLogin ? (
                              'Увійти в систему'
                           ) : (
                              'Створити профіль'
                           )}
                        </button>
                     </form>

                     <div className="mt-8">
                        <div className="relative flex items-center mb-6">
                           <div className="flex-grow border-t border-white/10"></div>
                           <span className="flex-shrink-0 mx-4 text-xs text-gray-500 uppercase tracking-widest">
                              Або через
                           </span>
                           <div className="flex-grow border-t border-white/10"></div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                           <button className="col-span-2 justify-self-center group flex items-center justify-center gap-2 py-2.5 px-8 rounded-xl bg-[#0a0a0c] hover:bg-white/10 border border-white/5 hover:border-white/30 transition-all text-sm font-medium text-gray-300 hover:text-white">
                              <SteamIcon className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                              Steam
                           </button>
                        </div>
                     </div>
                  </div>
               ) : (
                  <div className="animate-fade-in-up">
                     <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                        <ShieldCheck className="w-6 h-6 text-white" />
                     </div>
                     <h2 className="text-xl font-semibold text-white text-center mb-2">
                        Перевірка доступу
                     </h2>
                     <p className="text-sm text-gray-400 text-center mb-8">
                        Ми відправили 6-значний код на <br />
                        <span className="text-white font-medium">
                           {formData.email || 'вашу пошту'}
                        </span>
                     </p>

                     <form onSubmit={handleVerify} className="space-y-6">
                        {error && (
                           <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 flex items-center gap-3 animate-fade-in-up">
                              <div className="bg-red-500/20 p-1.5 rounded-lg shrink-0">
                                 <AlertCircle className="w-4 h-4 text-red-400" />
                              </div>
                              <p className="text-sm text-red-400 font-medium">
                                 {error}
                              </p>
                           </div>
                        )}

                        <div className="flex justify-between gap-2">
                           {otp.map((digit, index) => (
                              <input
                                 key={index}
                                 ref={(el) => (inputRefs.current[index] = el)}
                                 type="text"
                                 inputMode="numeric"
                                 maxLength={1}
                                 value={digit}
                                 onChange={(e) =>
                                    handleOtpChange(index, e.target.value)
                                 }
                                 onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                 className="w-12 h-14 bg-[#0a0a0c] border border-white/10 text-white rounded-xl text-center text-2xl font-medium focus:outline-none focus:border-white/50 focus:bg-white/5 transition-all shadow-inner"
                              />
                           ))}
                        </div>

                        <button
                           type="submit"
                           disabled={isLoading}
                           className="w-full bg-white hover:bg-gray-200 text-black py-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(255,255,255,0.1)] mt-2"
                        >
                           {isLoading ? (
                              <Loader2 className="w-5 h-5 animate-spin" />
                           ) : (
                              'Завершити ідентифікацію'
                           )}
                        </button>
                     </form>

                     <div className="mt-6 text-center">
                        <button
                           onClick={() => {
                              setStep('form');
                              setOtp(['', '', '', '', '', '']);
                              setError(null);
                           }}
                           className="text-xs text-gray-500 hover:text-white transition-colors"
                        >
                           Скасувати та повернутися назад
                        </button>
                     </div>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};
