export const CURRENT_USER = {
   name: 'Alex_Tactics',
   avatar:
      'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=150&q=80',
   level: 42,
   reputation: 4.9,
};

export const GAMES = [
   {
      id: 1,
      title: 'Forza Horizon 5',
      image: 'https://images.unsplash.com/photo-1614204424926-196a80bf0be8?auto=format&fit=crop&w=600&q=80',
      tags: ['Гонки', 'Відкритий світ', 'Кооп'],
      activePlayers: '12.4k',
      accent: 'from-zinc-500 to-zinc-400',
   },
   {
      id: 2,
      title: 'Minecraft',
      image: 'https://images.unsplash.com/photo-1607513746994-51f730a44832?auto=format&fit=crop&w=600&q=80',
      tags: ['Виживання', 'Пісочниця', 'Будівництво'],
      activePlayers: '45.1k',
      accent: 'from-zinc-500 to-zinc-400',
   },
   {
      id: 3,
      title: 'We Were Here',
      image: 'https://images.unsplash.com/photo-1605901309584-818e25960b8f?auto=format&fit=crop&w=600&q=80',
      tags: ['Головоломка', 'Тільки Кооп'],
      activePlayers: '2.3k',
      accent: 'from-zinc-500 to-zinc-400',
   },
   {
      id: 4,
      title: 'Helldivers 2',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80',
      tags: ['Шутер', 'Тактика', 'PVE'],
      activePlayers: '89.2k',
      accent: 'from-zinc-500 to-zinc-400',
   },
];

export const LFG_SESSIONS = [
   {
      id: 101,
      game: GAMES[1],
      host: {
         name: 'BuilderBob',
         avatar:
            'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80',
      },
      title: 'Шукаю архітектора для мега-бази',
      description:
         'Планую будувати величезний замок у стилі готики. Потрібна людина з почуттям стилю.',
      micRequired: true,
      language: 'UA/EN',
      time: 'Сьогодні, 20:00',
      spots: { current: 1, max: 2 },
      playstyle: 'Chill / Creative',
   },
   {
      id: 102,
      game: GAMES[3],
      host: {
         name: 'CommanderShep',
         avatar:
            'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=100&q=80',
      },
      title: 'Helldive Складність - Фарм Медалей',
      description:
         "Шукаю жорстких тактиків. Комунікація обов'язкова, без зайвого шуму. Працюємо швидко.",
      micRequired: true,
      language: 'UA',
      time: 'Зараз',
      spots: { current: 3, max: 4 },
      playstyle: 'Hardcore / Tactical',
   },
   {
      id: 103,
      game: GAMES[0],
      host: {
         name: 'SpeedDemon_99',
         avatar:
            'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&q=80',
      },
      title: 'Чілові покатушки по Мексиці',
      description:
         'Просто катаємось, робимо красиві скріншоти та проходимо сезонні івенти.',
      micRequired: false,
      language: 'Будь-яка',
      time: 'Сьогодні, 22:30',
      spots: { current: 2, max: 6 },
      playstyle: 'Casual',
   },
];

export const RECOMMENDED_PARTNERS = [
   {
      id: 201,
      name: 'StealthNinja',
      avatar:
         'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80',
      level: 67,
      synergy: 94,
      tags: {
         exp: 'Досвідчений',
         time: '19:00 - 23:00',
         goal: 'Для досягнень',
      },
   },
   {
      id: 202,
      name: 'CoopNewbie',
      avatar:
         'https://images.unsplash.com/photo-1528892952291-009c663ce843?auto=format&fit=crop&w=150&q=80',
      level: 14,
      synergy: 81,
      tags: {
         exp: 'Новачок: 0-2 год',
         time: '20:00 - 22:00',
         goal: 'Без спойлерів',
      },
   },
];

export const LOBBY_PLAYERS = [
   {
      id: 301,
      name: 'Alex_Tactics',
      avatar: CURRENT_USER.avatar,
      isReady: true,
      isMicOn: true,
      isSpeaking: true,
   },
   {
      id: 302,
      name: 'CommanderShep',
      avatar:
         'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=100&q=80',
      isReady: true,
      isMicOn: true,
      isSpeaking: false,
   },
   {
      id: 303,
      name: 'GhostRecon',
      avatar:
         'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&q=80',
      isReady: false,
      isMicOn: false,
      isSpeaking: false,
   },
];
