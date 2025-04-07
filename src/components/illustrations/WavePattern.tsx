export const WavePattern = () => (
  <svg className="absolute inset-0 -z-10 opacity-10" width="100%" height="100%">
    <pattern id="wave" x="0" y="0" width="100" height="20" patternUnits="userSpaceOnUse">
      <path
        d="M0 10 Q 12.5 0, 25 10 T 50 10 T 75 10 T 100 10"
        stroke="currentColor"
        fill="none"
        strokeWidth="1"
      />
    </pattern>
    <rect width="100%" height="100%" fill="url(#wave)" />
  </svg>
); 