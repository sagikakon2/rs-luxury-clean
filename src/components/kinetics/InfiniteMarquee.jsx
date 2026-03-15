import { useRef, useEffect, useState } from 'react';

export const InfiniteMarquee = ({
  children,
  speed = 40,
  gap = '2rem',
  className = '',
}) => {
  const trackRef = useRef(null);
  const [duration, setDuration] = useState(10);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => {
      const singleWidth = track.firstElementChild?.offsetWidth;
      if (singleWidth && singleWidth > 0) {
        setDuration(singleWidth / speed);
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [speed]);

  const inner = (
    <span className="flex items-center shrink-0" style={{ gap, paddingInlineEnd: gap }} dir="rtl">
      {children}
    </span>
  );

  return (
    <div dir="ltr" style={{ direction: 'ltr', unicodeBidi: 'isolate' }} className={`${className} overflow-hidden`}>
      <div
        ref={trackRef}
        className="flex w-max hover:[animation-play-state:paused]"
        style={{
          animation: `marquee-scroll ${duration}s linear infinite`,
        }}
      >
        {inner}
        {inner}
        {inner}
        {inner}
      </div>
    </div>
  );
};
