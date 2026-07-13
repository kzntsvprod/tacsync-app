export const Badge = ({ children, variant = 'default', className = '' }) => {
   const variants = {
      default: 'bg-white/5 text-gray-300 border border-white/10',
      success:
         'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
      warning: 'bg-orange-500/10 text-orange-400 border border-orange-500/20',
      danger: 'bg-red-500/10 text-red-400 border border-red-500/20',
      accent: 'bg-white/10 text-white border border-white/20',
   };

   return (
      <span
         className={`px-2.5 py-1 text-xs font-medium rounded-full backdrop-blur-md ${variants[variant]} ${className}`}
      >
         {children}
      </span>
   );
};
