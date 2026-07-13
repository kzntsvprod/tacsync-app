export const TacsyncLogo = ({ className = '' }) => (
   <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
   >
      <path
         d="M16 2L30 10V22L16 30L2 22V10L16 2Z"
         stroke="currentColor"
         strokeWidth="2"
         strokeLinejoin="miter"
      />
      <path
         d="M16 6V12M16 20V26M6 16H12M20 16H26"
         stroke="currentColor"
         strokeWidth="2"
         strokeLinecap="square"
      />
      <rect x="14" y="14" width="4" height="4" fill="currentColor" />
      <path
         d="M8 10L11 13M24 10L21 13M8 22L11 19M24 22L21 19"
         stroke="currentColor"
         strokeWidth="1.5"
         strokeLinecap="square"
      />
   </svg>
);

export const SteamIcon = ({ className = '' }) => (
   <svg
      viewBox="0 0 16 16"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
   >
      <path d="M.329 10.333A8.01 8.01 0 0 0 7.99 16C12.414 16 16 12.418 16 8s-3.586-8-8.009-8A8.006 8.006 0 0 0 0 7.468l.003.006 4.304 1.769A2.2 2.2 0 0 1 5.62 8.88l1.96-2.844-.001-.04a3.046 3.046 0 0 1 3.042-3.043 3.046 3.046 0 0 1 3.042 3.043 3.047 3.047 0 0 1-3.111 3.044l-2.804 2a2.223 2.223 0 0 1-3.075 2.11 2.22 2.22 0 0 1-1.312-1.568L.33 10.333Z" />
      <path d="M4.868 12.683a1.715 1.715 0 0 0 1.318-3.165 1.7 1.7 0 0 0-1.263-.02l1.023.424a1.261 1.261 0 1 1-.97 2.33l-.99-.41a1.7 1.7 0 0 0 .882.84Zm3.726-6.687a2.03 2.03 0 0 0 2.027 2.029 2.03 2.03 0 0 0 2.027-2.029 2.03 2.03 0 0 0-2.027-2.027 2.03 2.03 0 0 0-2.027 2.027m2.03-1.527a1.524 1.524 0 1 1-.002 3.048 1.524 1.524 0 0 1 .002-3.048" />
   </svg>
);
