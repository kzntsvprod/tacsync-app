import { useEffect, useRef } from 'react';
import { TacsyncLogo } from '../components/ui/Icons.jsx';
import { Badge } from '../components/ui/Badge.jsx';
import { SynergyWidget } from '../components/widgets/SynergyWidget.jsx';
import {
   GAMES,
   CURRENT_USER,
   RECOMMENDED_PARTNERS,
} from '../config/mockData.js';
import {
   Activity,
   ArrowRight,
   Bell,
   Clock,
   Home,
   Map,
   MessageSquare,
   Mic,
   Network,
   Plus,
   Search,
   Settings,
   ShieldCheck,
   Users,
} from 'lucide-react';

export const LandingPage = ({ onEnter }) => {
   const containerRef = useRef(null);
   const progressLineRef = useRef(null);
   const heroTextRef = useRef(null);
   const mockupRef = useRef(null);
   const featuresRef = useRef(null);
   const synergyRef = useRef(null);
   const ctaRef = useRef(null);
   const bgRingsRef = useRef(null);
   const glowRef = useRef(null);

   const mapRange = (value, inMin, inMax, outMin, outMax) => {
      const p = (value - inMin) / (inMax - inMin);
      const clampedP = Math.max(0, Math.min(1, p));
      return outMin + clampedP * (outMax - outMin);
   };

   useEffect(() => {
      let rafId;
      const handleScroll = () => {
         rafId = requestAnimationFrame(() => {
            if (!containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            const viewHeight = window.innerHeight;
            const totalScroll = rect.height - viewHeight;
            const scrolled = -rect.top;

            const p = Math.max(0, Math.min(1, scrolled / totalScroll));

            if (progressLineRef.current) {
               progressLineRef.current.style.height = `${p * 100}%`;
            }

            if (bgRingsRef.current)
               bgRingsRef.current.style.transform = `scale(${1 + p * 0.5}) rotate(${p * 45}deg)`;
            if (glowRef.current)
               glowRef.current.style.opacity = mapRange(p, 0, 0.5, 0.02, 0.1);

            if (heroTextRef.current) {
               const opacity = mapRange(p, 0, 0.1, 1, 0);
               const scale = mapRange(p, 0, 0.1, 1, 0.85);
               const y = mapRange(p, 0, 0.1, 0, -100);

               heroTextRef.current.style.opacity = opacity;
               heroTextRef.current.style.transform = `translateY(${y}px) scale(${scale})`;
               heroTextRef.current.style.pointerEvents =
                  opacity > 0.5 ? 'auto' : 'none';
            }

            if (mockupRef.current) {
               const rotateX = mapRange(p, 0.05, 0.25, 20, 0);
               const scale = mapRange(p, 0.05, 0.25, 0.75, 1);
               const y = mapRange(p, 0.05, 0.25, 30, 0);
               const fadeOut = mapRange(p, 0.35, 0.45, 0, 1);

               mockupRef.current.style.transform = `perspective(1500px) rotateX(${rotateX}deg) scale(${scale}) translateY(${y}vh)`;
               mockupRef.current.style.opacity = 1 - fadeOut;
               mockupRef.current.style.filter = `blur(${fadeOut * 20}px)`;
            }

            if (featuresRef.current) {
               const inP = mapRange(p, 0.35, 0.45, 0, 1);
               const outP = mapRange(p, 0.55, 0.65, 0, 1);

               const opacity = inP * (1 - outP);
               const y =
                  mapRange(inP, 0, 1, 100, 0) + mapRange(outP, 0, 1, 0, -100);
               const scale = 0.95 + inP * 0.05 - outP * 0.05;

               featuresRef.current.style.opacity = opacity;
               featuresRef.current.style.transform = `translateY(${y}px) scale(${scale})`;
               featuresRef.current.style.pointerEvents =
                  opacity > 0.5 ? 'auto' : 'none';
            }

            if (synergyRef.current) {
               const inP = mapRange(p, 0.6, 0.7, 0, 1);
               const outP = mapRange(p, 0.75, 0.85, 0, 1);

               const opacity = inP * (1 - outP);
               const y =
                  mapRange(inP, 0, 1, 100, 0) + mapRange(outP, 0, 1, 0, -100);
               const scale = 0.95 + inP * 0.05 - outP * 0.05;

               synergyRef.current.style.opacity = opacity;
               synergyRef.current.style.transform = `translateY(${y}px) scale(${scale})`;
               synergyRef.current.style.pointerEvents =
                  opacity > 0.5 ? 'auto' : 'none';
            }

            if (ctaRef.current) {
               const inP = mapRange(p, 0.8, 0.95, 0, 1);

               ctaRef.current.style.opacity = inP;
               ctaRef.current.style.transform = `translateY(${mapRange(inP, 0, 1, 50, 0)}px) scale(${0.9 + inP * 0.1})`;
               ctaRef.current.style.pointerEvents = inP > 0.5 ? 'auto' : 'none';
            }
         });
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
      return () => {
         window.removeEventListener('scroll', handleScroll);
         cancelAnimationFrame(rafId);
      };
   }, []);

   return (
      <div
         ref={containerRef}
         className="relative bg-black text-white selection:bg-white selection:text-black w-full"
         style={{ height: '600vh' }}
      >
         <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">
            <nav className="absolute top-0 w-full z-50 px-8 py-6 flex justify-between items-center mix-blend-difference pointer-events-none">
               <div className="flex items-center gap-2">
                  <TacsyncLogo className="w-5 h-5 text-white" />
                  <span className="text-sm font-bold tracking-tight">
                     TACSYNC
                  </span>
               </div>
               <button
                  onClick={onEnter}
                  className="text-sm font-medium hover:opacity-70 transition-opacity flex items-center gap-2 pointer-events-auto"
               >
                  Увійти <ArrowRight className="w-4 h-4" />
               </button>
            </nav>

            <div className="absolute left-8 top-1/3 bottom-1/3 w-[2px] bg-white/10 rounded-full z-50 hidden md:block">
               <div
                  ref={progressLineRef}
                  className="w-full bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                  style={{ height: '0%' }}
               ></div>
            </div>

            <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
               <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-screen"></div>

               <div
                  ref={bgRingsRef}
                  className="absolute inset-0 flex items-center justify-center will-change-transform opacity-30"
               >
                  <div className="absolute w-[1200px] h-[1200px] border border-white/[0.03] rounded-full"></div>
                  <div className="absolute w-[800px] h-[800px] border border-white/[0.05] rounded-full border-dashed"></div>
                  <div className="absolute w-[400px] h-[400px] border border-white/[0.08] rounded-full"></div>
               </div>

               <div
                  ref={glowRef}
                  className="absolute w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-white blur-[150px] rounded-full mix-blend-screen opacity-5 will-change-opacity"
               ></div>
            </div>

            <div
               ref={heroTextRef}
               className="absolute inset-0 flex flex-col items-center justify-center z-40 px-4 text-center will-change-transform mt-[-10vh]"
            >
               <Badge
                  variant="accent"
                  className="mb-8 px-4 py-1.5 text-[11px] font-bold tracking-[0.2em] uppercase border-white/10 bg-white/5 backdrop-blur-md text-gray-300"
               >
                  <span className="flex items-center gap-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>
                     ELITE CO-OP TOOL
                  </span>
               </Badge>

               <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-medium tracking-tighter leading-[1.05] mb-8 text-white">
                  Грайте разом.
                  <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-gray-300 to-gray-700">
                     Перемагайте разом
                  </span>
               </h1>

               <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl font-light leading-relaxed">
                  Елітний інструмент для пошуку напарників. Гортайте вниз, щоб
                  побачити майбутнє кооперативного геймінгу.
               </p>

               <div className="animate-bounce mt-10">
                  <div className="w-8 h-12 rounded-full border-2 border-white/20 flex justify-center pt-2">
                     <div className="w-1.5 h-3 bg-white/50 rounded-full"></div>
                  </div>
               </div>
            </div>

            <div
               ref={mockupRef}
               className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[95vw] max-w-5xl h-[75vh] border-t border-x border-white/10 rounded-t-[2.5rem] bg-[#050505] shadow-[0_-30px_100px_rgba(255,255,255,0.05)] overflow-hidden z-30 flex will-change-transform"
               style={{
                  transformOrigin: 'bottom center',
                  transform:
                     'perspective(1500px) rotateX(20deg) scale(0.75) translateY(30vh)',
               }}
            >
               <div className="w-64 bg-[#050505] border-r border-white/5 flex flex-col h-full pointer-events-none hidden md:flex">
                  <div className="p-6 flex items-center gap-3">
                     <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                        <TacsyncLogo className="w-5 h-5 text-black" />
                     </div>
                     <span className="text-base font-semibold tracking-tight text-white">
                        TACSYNC
                     </span>
                  </div>
                  <div className="px-3 py-4 space-y-1 flex-1">
                     <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/10 text-white text-sm font-medium">
                        <Home className="w-4 h-4" /> Огляд
                     </div>
                     <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-500 text-sm font-medium">
                        <Search className="w-4 h-4" /> Пошук гри
                     </div>
                     <div className="flex items-center justify-between px-3 py-2.5 rounded-lg text-gray-500 text-sm font-medium">
                        <div className="flex items-center gap-3">
                           <Map className="w-4 h-4" /> Тактична дошка
                        </div>
                        <span className="text-[9px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded bg-white/10 text-gray-400">
                           New
                        </span>
                     </div>
                     <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-500 text-sm font-medium">
                        <MessageSquare className="w-4 h-4" /> Повідомлення
                     </div>
                     <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-500 text-sm font-medium">
                        <Users className="w-4 h-4" /> Команда
                     </div>
                  </div>
                  <div className="p-4 border-t border-white/5">
                     <div className="flex items-center gap-3 p-2 rounded-lg bg-white/5">
                        <img
                           src={CURRENT_USER.avatar}
                           alt="User"
                           className="w-8 h-8 rounded-full object-cover"
                        />
                        <div className="flex-1 overflow-hidden">
                           <p className="text-sm font-medium text-gray-200 truncate">
                              {CURRENT_USER.name}
                           </p>
                           <p className="text-[10px] text-gray-500">
                              PRO Акаунт
                           </p>
                        </div>
                        <Settings className="w-4 h-4 text-gray-600" />
                     </div>
                  </div>
               </div>

               <div className="flex-1 flex flex-col min-w-0 pointer-events-none bg-black">
                  <div className="h-20 px-8 flex items-center justify-between border-b border-white/5 bg-[#000000]/80 backdrop-blur-xl">
                     <div className="w-96 h-10 bg-white/5 rounded-lg border border-white/10 flex items-center px-4">
                        <Search className="w-4 h-4 text-gray-500" />
                        <span className="ml-3 text-sm text-gray-600">
                           Шукати...
                        </span>
                     </div>
                     <div className="flex items-center gap-4">
                        <Bell className="w-5 h-5 text-gray-400" />
                        <div className="bg-white text-black px-5 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2">
                           <Plus className="w-4 h-4" /> Створити
                        </div>
                     </div>
                  </div>

                  <div className="flex-1 p-8 space-y-6 overflow-hidden">
                     <div className="rounded-3xl border border-white/10 p-10 bg-[#0a0a0c] relative overflow-hidden flex flex-col justify-center h-48 shrink-0">
                        <div className="absolute top-0 right-0 bottom-0 w-1/2 bg-[url('https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=800&q=80')] bg-cover opacity-20 grayscale mask-image-l"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0c] via-[#0a0a0c]/80 to-transparent"></div>
                        <div className="relative z-10 max-w-xl">
                           <h1 className="text-3xl font-semibold text-white mb-4 tracking-tight">
                              AI-Метчмейкінг
                           </h1>
                           <p className="text-gray-400 text-sm leading-relaxed mb-6">
                              Алгоритм аналізує ваш стиль гри, вільний час та
                              пінг для ідеального підбору напарників. Жодного
                              рандому.
                           </p>
                           <div className="bg-white text-black px-6 py-2.5 rounded-lg text-sm font-medium w-max">
                              Знайти команду
                           </div>
                        </div>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 shrink-0">
                        <div className="md:col-span-2 grid grid-cols-2 gap-6">
                           {RECOMMENDED_PARTNERS.map((partner) => (
                              <div
                                 key={partner.id}
                                 className="bg-[#0a0a0c] rounded-2xl border border-white/5 p-5 flex flex-col"
                              >
                                 <div className="flex items-start gap-4 mb-4">
                                    <img
                                       src={partner.avatar}
                                       className="w-12 h-12 rounded-full object-cover shrink-0"
                                       alt="avatar"
                                    />
                                    <div className="flex-1 min-w-0">
                                       <div className="flex justify-between items-start gap-2">
                                          <h4 className="text-base font-semibold text-white truncate">
                                             {partner.name}
                                          </h4>
                                          <span className="text-[10px] font-bold text-black bg-white px-2 py-1 rounded shrink-0">
                                             {partner.synergy}%
                                          </span>
                                       </div>
                                       <p className="text-xs text-gray-500 mt-0.5 truncate">
                                          Рівень {partner.level}
                                       </p>
                                    </div>
                                 </div>
                                 <div className="flex flex-col gap-2 mb-4">
                                    <div className="bg-white/5 text-gray-300 border border-white/10 px-2.5 py-1 text-xs rounded-lg flex items-center">
                                       <Activity className="w-3 h-3 mr-2 text-gray-400" />
                                       {partner.tags.exp}
                                    </div>
                                    <div className="bg-white/5 text-gray-300 border border-white/10 px-2.5 py-1 text-xs rounded-lg flex items-center">
                                       <Clock className="w-3 h-3 mr-2 text-gray-400" />
                                       {partner.tags.time}
                                    </div>
                                 </div>
                              </div>
                           ))}
                        </div>
                        <div className="md:col-span-1 bg-[#0a0a0b] border border-white/5 rounded-3xl p-6 flex flex-col items-center justify-center relative overflow-hidden h-full min-h-[200px]">
                           <div className="absolute top-6 left-6 right-6 flex justify-between">
                              <h3 className="text-sm font-medium text-gray-400 uppercase tracking-widest shrink-0">
                                 Синергія
                              </h3>
                              <ShieldCheck className="w-4 h-4 text-white shrink-0" />
                           </div>
                           <div className="relative w-28 h-28 flex items-center justify-center mt-4 shrink-0">
                              <svg
                                 viewBox="0 0 36 36"
                                 className="w-full h-full transform -rotate-90"
                              >
                                 <path
                                    className="text-white/5"
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                 />
                                 <path
                                    className="text-white"
                                    strokeDasharray="85, 100"
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                 />
                              </svg>
                              <div className="absolute flex flex-col items-center justify-center text-center">
                                 <span className="text-2xl font-light text-white tracking-tighter">
                                    85
                                    <span className="text-xs text-gray-500">
                                       %
                                    </span>
                                 </span>
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className="grid grid-cols-2 md:grid-cols-4 gap-6 shrink-0 h-40">
                        {GAMES.map((game) => (
                           <div
                              key={game.id}
                              className="rounded-2xl border border-white/10 relative overflow-hidden h-full"
                           >
                              <img
                                 src={game.image}
                                 className="absolute inset-0 w-full h-full object-cover opacity-70"
                                 alt="game"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                              <div className="absolute bottom-4 left-4 right-4">
                                 <h3 className="text-sm font-bold text-white tracking-tight mb-2 truncate">
                                    {game.title}
                                 </h3>
                                 <div className="flex gap-1">
                                    <span className="text-[9px] tracking-wider text-gray-400 bg-white/5 px-1.5 py-0.5 rounded border border-white/5 backdrop-blur-sm">
                                       {game.tags[0]}
                                    </span>
                                    <span className="text-[9px] tracking-wider text-gray-400 bg-white/5 px-1.5 py-0.5 rounded border border-white/5 backdrop-blur-sm">
                                       ...
                                    </span>
                                 </div>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>

            <div
               ref={featuresRef}
               className="absolute inset-0 flex flex-col items-center justify-center z-40 px-8 max-w-[1200px] mx-auto will-change-transform opacity-0 pointer-events-none"
            >
               <div className="text-center mb-20">
                  <h2 className="text-4xl md:text-6xl font-medium tracking-tight mb-6">
                     Продумано до дрібниць
                  </h2>
                  <p className="text-gray-400 max-w-2xl mx-auto text-xl font-light">
                     Всі необхідні інструменти для серйозних гравців в одному
                     мінімалістичному просторі.
                  </p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                  {[
                     {
                        icon: Network,
                        title: 'Нейро-підбір',
                        desc: 'AI аналізує ваш профіль та знаходить напарників з сумісністю від 85%.',
                     },
                     {
                        icon: Map,
                        title: 'Тактична дошка',
                        desc: 'Синхронний canvas для планування штурмів, рейдів та стратегій у реальному часі.',
                     },
                     {
                        icon: Mic,
                        title: "Чистий зв'язок",
                        desc: 'Вбудовані лобі з перевіркою мікрофону та статусами готовності.',
                     },
                  ].map((feature, i) => (
                     <div
                        key={i}
                        className="p-10 rounded-3xl border border-white/10 bg-[#050505] shadow-xl relative overflow-hidden group"
                     >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <feature.icon
                           className="w-10 h-10 text-white mb-8"
                           strokeWidth={1.2}
                        />
                        <h3 className="text-2xl font-medium mb-4">
                           {feature.title}
                        </h3>
                        <p className="text-gray-500 text-base leading-relaxed font-light">
                           {feature.desc}
                        </p>
                     </div>
                  ))}
               </div>
            </div>

            <div
               ref={synergyRef}
               className="absolute inset-0 flex items-center justify-center z-40 px-8 w-full max-w-[1200px] mx-auto will-change-transform opacity-0 pointer-events-none"
            >
               <div className="flex flex-col md:flex-row items-center gap-16 w-full">
                  <div className="flex-1 flex flex-col items-start">
                     <Badge
                        variant="accent"
                        className="mb-3 bg-white/5 text-gray-300 border-white/10"
                     >
                        Матчмейкінг 2.0
                     </Badge>

                     <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-5">
                        Синергія — ключ до перемоги
                     </h2>

                     <p className="text-gray-400 text-lg font-light leading-relaxed mb-8">
                        Система враховує не лише ваш рівень, а й години.
                     </p>
                     <ul className="space-y-4">
                        {[
                           'Врахування прайм-тайму',
                           'Фільтр за цілями гри',
                           'Рейтингова система',
                        ].map((item, i) => (
                           <li
                              key={i}
                              className="flex items-center gap-3 text-base text-gray-300 font-light"
                           >
                              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>{' '}
                              {item}
                           </li>
                        ))}
                     </ul>
                  </div>
                  <div className="flex-1 relative w-full h-[500px]">
                     <div className="absolute inset-0 bg-[#0a0a0b] border border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-700">
                        <SynergyWidget />
                     </div>
                  </div>
               </div>
            </div>

            <div
               ref={ctaRef}
               className="absolute inset-0 flex flex-col items-center justify-center z-50 text-center will-change-transform opacity-0 pointer-events-none bg-black/50 backdrop-blur-sm"
            >
               <h2 className="text-5xl md:text-7xl font-medium tracking-tighter mb-10">
                  Готові до гри?
               </h2>
               <button
                  onClick={onEnter}
                  className="group relative inline-flex items-center justify-center gap-3 bg-white text-black px-12 py-5 rounded-full text-lg font-semibold transition-all hover:bg-gray-200 hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_60px_rgba(255,255,255,0.2)]"
               >
                  Увійти в систему
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
               </button>
            </div>
         </div>
      </div>
   );
};
