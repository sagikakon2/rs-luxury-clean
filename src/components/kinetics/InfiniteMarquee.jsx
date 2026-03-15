import FastMarquee from 'react-fast-marquee';

export const InfiniteMarquee = ({
  children,
  speed = 40,
  direction = 'left',
  pauseOnHover = true,
  gap = '2rem',
  className = '',
}) => (
  <div dir="ltr" style={{ direction: 'ltr', unicodeBidi: 'isolate' }} className={className}>
    <FastMarquee
      speed={speed}
      gradient={false}
      pauseOnHover={pauseOnHover}
      autoFill
      direction={direction}
    >
      <span className="flex items-center" style={{ gap, paddingInlineEnd: gap }} dir="rtl">
        {children}
      </span>
    </FastMarquee>
  </div>
);
