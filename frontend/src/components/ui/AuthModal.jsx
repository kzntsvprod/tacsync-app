import { useState, useRef } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext.jsx';
import { TacsyncLogo, SteamIcon } from './Icons.jsx';
import {
   AlertCircle,
   Loader2,
   Lock,
   Mail,
   User,
   X,
   ShieldCheck,
   Eye,
   EyeOff,
   KeyRound,
   CheckCircle2,
} from 'lucide-react';

const API_URL = 'http://localhost:3000/api/users';

export const AuthModal = ({ onClose, onSuccess }) => {
   const { login } = useAuth();

   const [isLogin, setIsLogin] = useState(true);
   const [isLoading, setIsLoading] = useState(false);
   const [showPassword, setShowPassword] = useState(false);

   const [step, setStep] = useState('form');
   const [otp, setOtp] = useState(['', '', '', '', '', '']);
   const inputRefs = useRef([]);

   const [formData, setFormData] = useState({
      email: '',
      password: '',
      username: '',
   });
   const [error, setError] = useState(null);
   const [successMsg, setSuccessMsg] = useState(null);

   const handleSubmit = async (e) => {
      e.preventDefault();
      setError(null);
      setSuccessMsg(null);

      if (
         !formData.email.trim() ||
         !formData.password.trim() ||
         (!isLogin && !formData.username.trim())
      ) {
         setError("Помилка доступу: заповніть всі обов'язкові поля.");
         return;
      }

      if (!isLogin) {
         const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
         if (!passwordRegex.test(formData.password)) {
            setError(
               'Пароль має містити щонайменше 8 символів, одну велику та одну маленьку літеру.'
            );
            return;
         }
      }

      setIsLoading(true);

      if (!isLogin) {
         try {
            await axios.post(`${API_URL}/send-otp`, {
               email: formData.email,
            });

            setStep('verification');
         } catch (err) {
            const errMsg =
               err.response?.data?.message ||
               'Помилка при перевірці даних або надсиланні коду.';
            setError(errMsg);
         } finally {
            setIsLoading(false);
         }
      } else {
         try {
            const response = await axios.post(`${API_URL}/login`, {
               email: formData.email,
               password: formData.password,
            });

            const data = response.data;
            login(data.token, data.user);
            onSuccess(data);
         } catch (err) {
            const errMsg =
               err.response?.data?.message || 'Не вдалося увійти в систему.';
            setError(errMsg);
         } finally {
            setIsLoading(false);
         }
      }
   };

   const handleVerify = async (e) => {
      e.preventDefault();
      setError(null);

      if (otp.some((digit) => digit === '')) {
         setError('Помилка синхронізації: введіть усі 6 цифр.');
         return;
      }

      const otpCode = otp.join('');
      setIsLoading(true);

      try {
         await axios.post(`${API_URL}/register`, {
            nickname: formData.username,
            email: formData.email,
            password: formData.password,
            otp: otpCode,
         });

         const response = await axios.post(`${API_URL}/login`, {
            email: formData.email,
            password: formData.password,
         });

         const data = response.data;
         login(data.token, data.user);
         onSuccess(data);
      } catch (err) {
         const errMsg =
            err.response?.data?.message || 'Помилка при перевірці коду.';
         setError(errMsg);
      } finally {
         setIsLoading(false);
      }
   };

   const handleForgotPasswordRequest = async (e) => {
      e.preventDefault();
      setError(null);

      if (!formData.email.trim()) {
         setError('Введіть вашу E-mail адресу.');
         return;
      }

      setIsLoading(true);
      try {
         await axios.post(`${API_URL}/send-reset-otp`, {
            email: formData.email,
         });
         setStep('reset-password');
         setOtp(['', '', '', '', '', '']);
         setFormData({ ...formData, password: '' });
      } catch (err) {
         setError(
            err.response?.data?.message || 'Помилка при надсиланні коду.'
         );
      } finally {
         setIsLoading(false);
      }
   };

   const handleResetPassword = async (e) => {
      e.preventDefault();
      setError(null);

      if (otp.some((digit) => digit === '')) {
         setError('Введіть усі 6 цифр коду.');
         return;
      }

      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      if (!passwordRegex.test(formData.password)) {
         setError(
            'Пароль має містити щонайменше 8 символів, одну велику та одну маленьку літеру.'
         );
         return;
      }

      const otpCode = otp.join('');
      setIsLoading(true);

      try {
         await axios.post(`${API_URL}/reset-password`, {
            email: formData.email,
            otp: otpCode,
            newPassword: formData.password,
         });

         setSuccessMsg('Пароль успішно змінено! Тепер ви можете увійти.');
         setStep('form');
         setIsLogin(true);
      } catch (err) {
         setError(err.response?.data?.message || 'Помилка відновлення пароля.');
      } finally {
         setIsLoading(false);
      }
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

   const handlePaste = (e) => {
      e.preventDefault();
      const pastedData = e.clipboardData.getData('text');
      const pastedNumbers = pastedData.replace(/\D/g, '').slice(0, 6).split('');

      if (pastedNumbers.length > 0) {
         const newOtp = [...otp];
         pastedNumbers.forEach((digit, i) => {
            newOtp[i] = digit;
         });
         setOtp(newOtp);
         if (error) setError(null);

         const focusIndex = Math.min(pastedNumbers.length, 5);
         if (inputRefs.current[focusIndex]) {
            inputRefs.current[focusIndex].focus();
         }
      }
   };

   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
      if (error) setError(null);
   };

   const togglePasswordVisibility = () => setShowPassword(!showPassword);

   const inputClasses =
      'w-full bg-[#0a0a0c] border border-white/10 text-white rounded-xl py-3 pl-11 focus:outline-none focus:border-white/30 focus:bg-white/[0.02] transition-all duration-300 ease-in-out text-sm placeholder:text-gray-600 [&:-webkit-autofill]:shadow-[0_0_0px_1000px_#0a0a0c_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:white]';

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

               {step === 'form' && (
                  <div className="animate-fade-in-up">
                     <div className="flex bg-[#0a0a0c] p-1 rounded-xl mb-8 border border-white/5 relative">
                        <div
                           className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white/10 border border-white/10 rounded-lg transition-transform duration-300 ease-in-out ${
                              !isLogin
                                 ? 'translate-x-[calc(100%+4px)]'
                                 : 'translate-x-0'
                           }`}
                        ></div>
                        <button
                           onClick={() => {
                              setIsLogin(true);
                              setError(null);
                              setSuccessMsg(null);
                           }}
                           className={`relative z-10 flex-1 py-2.5 text-sm font-medium rounded-lg transition-colors duration-300 ${
                              isLogin
                                 ? 'text-white'
                                 : 'text-gray-500 hover:text-gray-300'
                           }`}
                        >
                           Вхід
                        </button>
                        <button
                           onClick={() => {
                              setIsLogin(false);
                              setError(null);
                              setSuccessMsg(null);
                           }}
                           className={`relative z-10 flex-1 py-2.5 text-sm font-medium rounded-lg transition-colors duration-300 ${
                              !isLogin
                                 ? 'text-white'
                                 : 'text-gray-500 hover:text-gray-300'
                           }`}
                        >
                           Реєстрація
                        </button>
                     </div>

                     <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-4"
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
                        {successMsg && (
                           <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-3 flex items-center gap-3 animate-fade-in-up">
                              <div className="bg-green-500/20 p-1.5 rounded-lg shrink-0">
                                 <CheckCircle2 className="w-4 h-4 text-green-400" />
                              </div>
                              <p className="text-sm text-green-400 font-medium">
                                 {successMsg}
                              </p>
                           </div>
                        )}

                        <div
                           className={`grid transition-all duration-500 ease-in-out ${isLogin ? 'grid-rows-[0fr] opacity-0' : 'grid-rows-[1fr] opacity-100'}`}
                        >
                           <div className="overflow-hidden flex flex-col gap-4">
                              <div className="relative group py-1">
                                 <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-white transition-colors duration-300 z-10" />
                                 <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    placeholder="Ім'я гравця (Nickname)"
                                    className={`${inputClasses} pr-4`}
                                    tabIndex={isLogin ? -1 : 0}
                                 />
                              </div>
                           </div>
                        </div>

                        <div className="relative group">
                           <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-white transition-colors duration-300 z-10" />
                           <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="E-mail адреса"
                              className={`${inputClasses} pr-4`}
                           />
                        </div>

                        <div>
                           <div className="relative group">
                              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-white transition-colors duration-300 z-10" />
                              <input
                                 type={showPassword ? 'text' : 'password'}
                                 name="password"
                                 value={formData.password}
                                 onChange={handleChange}
                                 placeholder="Пароль"
                                 className={`${inputClasses} pr-11`}
                              />
                              <button
                                 type="button"
                                 onClick={togglePasswordVisibility}
                                 className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors focus:outline-none w-5 h-5 flex items-center justify-center z-10"
                              >
                                 <div className="relative w-4 h-4 flex items-center justify-center">
                                    <EyeOff
                                       className={`absolute transition-all duration-300 ease-in-out ${showPassword ? 'opacity-100 scale-100' : 'opacity-0 scale-50 pointer-events-none'}`}
                                    />
                                    <Eye
                                       className={`absolute transition-all duration-300 ease-in-out ${!showPassword ? 'opacity-100 scale-100' : 'opacity-0 scale-50 pointer-events-none'}`}
                                    />
                                 </div>
                              </button>
                           </div>

                           {isLogin && (
                              <div className="flex justify-end mt-2">
                                 <button
                                    type="button"
                                    onClick={() => {
                                       setStep('forgot-password');
                                       setError(null);
                                       setSuccessMsg(null);
                                    }}
                                    className="text-xs text-gray-500 hover:text-white transition-colors"
                                 >
                                    Забули пароль?
                                 </button>
                              </div>
                           )}
                        </div>

                        <button
                           type="submit"
                           disabled={isLoading}
                           className="w-full bg-white hover:bg-gray-200 active:scale-[0.98] text-black py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
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
                              <SteamIcon className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />{' '}
                              Steam
                           </button>
                        </div>
                     </div>
                  </div>
               )}

               {step === 'verification' && (
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
                           <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 flex items-center gap-3">
                              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
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
                                 onPaste={handlePaste}
                                 className="w-12 h-14 bg-[#0a0a0c] border border-white/10 text-white rounded-xl text-center text-2xl font-medium focus:border-white/50 focus:bg-white/[0.05] transition-all outline-none"
                              />
                           ))}
                        </div>
                        <button
                           type="submit"
                           disabled={isLoading}
                           className="w-full bg-white hover:bg-gray-200 active:scale-[0.98] text-black py-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
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

               {step === 'forgot-password' && (
                  <div className="animate-fade-in-up">
                     <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                        <KeyRound className="w-6 h-6 text-white" />
                     </div>
                     <h2 className="text-xl font-semibold text-white text-center mb-2">
                        Відновлення пароля
                     </h2>
                     <p className="text-sm text-gray-400 text-center mb-8">
                        Введіть адресу електронної пошти, пов'язану з вашим
                        акаунтом, щоб отримати код відновлення.
                     </p>

                     <form
                        onSubmit={handleForgotPasswordRequest}
                        className="flex flex-col gap-4"
                     >
                        {error && (
                           <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 flex items-center gap-3">
                              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                              <p className="text-sm text-red-400 font-medium">
                                 {error}
                              </p>
                           </div>
                        )}
                        <div className="relative group">
                           <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-white transition-colors duration-300 z-10" />
                           <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="E-mail адреса"
                              className={`${inputClasses} pr-4`}
                           />
                        </div>
                        <button
                           type="submit"
                           disabled={isLoading}
                           className="w-full bg-white hover:bg-gray-200 active:scale-[0.98] text-black py-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                           {isLoading ? (
                              <Loader2 className="w-5 h-5 animate-spin" />
                           ) : (
                              'Надіслати код'
                           )}
                        </button>
                     </form>
                     <div className="mt-6 text-center">
                        <button
                           onClick={() => {
                              setStep('form');
                              setError(null);
                           }}
                           className="text-xs text-gray-500 hover:text-white transition-colors"
                        >
                           Повернутися до входу
                        </button>
                     </div>
                  </div>
               )}

               {step === 'reset-password' && (
                  <div className="animate-fade-in-up">
                     <h2 className="text-xl font-semibold text-white text-center mb-2">
                        Створення нового пароля
                     </h2>
                     <p className="text-sm text-gray-400 text-center mb-8">
                        Введіть 6-значний код з пошти та придумайте новий
                        пароль.
                     </p>

                     <form onSubmit={handleResetPassword} className="space-y-6">
                        {error && (
                           <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 flex items-center gap-3">
                              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
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
                                 onPaste={handlePaste}
                                 className="w-12 h-14 bg-[#0a0a0c] border border-white/10 text-white rounded-xl text-center text-2xl font-medium focus:border-white/50 focus:bg-white/[0.05] transition-all outline-none"
                              />
                           ))}
                        </div>

                        <div className="relative group">
                           <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-white transition-colors duration-300 z-10" />
                           <input
                              type={showPassword ? 'text' : 'password'}
                              name="password"
                              value={formData.password}
                              onChange={handleChange}
                              placeholder="Новий пароль"
                              className={`${inputClasses} pr-11`}
                           />
                           <button
                              type="button"
                              onClick={togglePasswordVisibility}
                              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors focus:outline-none w-5 h-5 flex items-center justify-center z-10"
                           >
                              <div className="relative w-4 h-4 flex items-center justify-center">
                                 <EyeOff
                                    className={`absolute transition-all duration-300 ease-in-out ${showPassword ? 'opacity-100 scale-100' : 'opacity-0 scale-50 pointer-events-none'}`}
                                 />
                                 <Eye
                                    className={`absolute transition-all duration-300 ease-in-out ${!showPassword ? 'opacity-100 scale-100' : 'opacity-0 scale-50 pointer-events-none'}`}
                                 />
                              </div>
                           </button>
                        </div>

                        <button
                           type="submit"
                           disabled={isLoading}
                           className="w-full bg-white hover:bg-gray-200 active:scale-[0.98] text-black py-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                           {isLoading ? (
                              <Loader2 className="w-5 h-5 animate-spin" />
                           ) : (
                              'Зберегти новий пароль'
                           )}
                        </button>
                     </form>
                     <div className="mt-6 text-center">
                        <button
                           onClick={() => {
                              setStep('forgot-password');
                              setOtp(['', '', '', '', '', '']);
                              setError(null);
                           }}
                           className="text-xs text-gray-500 hover:text-white transition-colors"
                        >
                           Назад
                        </button>
                     </div>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};
