export const ShimmerButton = ({
  children,
  className = '',
  shimmerColor = 'rgba(255,255,255,0.07)',
  background = 'var(--color-cta)',
  onClick,
}) => (
  <button
    onClick={onClick}
    className={`shine btn-lift relative overflow-hidden cursor-pointer ${className}`}
    style={{ background, '--shine-color': shimmerColor }}
  >
    <span className="relative z-10 flex items-center justify-center gap-3">
      {children}
    </span>
  </button>
);
