export const GridPattern = () => (
  <svg className="absolute inset-0 -z-10 opacity-5" width="100%" height="100%">
    <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
      <path
        d="M0 40V0h40"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
      />
    </pattern>
    <rect width="100%" height="100%" fill="url(#grid)" />
  </svg>
); 