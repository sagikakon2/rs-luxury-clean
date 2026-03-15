export const ShimmerButton = ({
  children,
  className = '',
  shimmerColor = 'rgba(255,255,255,0.15)',
  background = 'var(--color-cta)',
  onClick,
}) => (
  <button
    onClick={onClick}
    className={`relative overflow-hidden cursor-pointer ${className}`}
    style={{ background }}
  >
    <div
      className="absolute inset-0"
      style={{
        background: `linear-gradient(110deg, transparent 33%, ${shimmerColor} 50%, transparent 67%)`,
        backgroundSize: '300% 100%',
        animation: 'shimmer-sweep 3s ease-in-out infinite',
      }}
    />
    <span className="relative z-10 flex items-center justify-center gap-3">
      {children}
    </span>
  </button>
);
