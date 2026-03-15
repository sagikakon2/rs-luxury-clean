import { useRef, useEffect, useCallback } from 'react';

const isTouchDevice =
  typeof window !== 'undefined' &&
  ('ontouchstart' in window || navigator.maxTouchPoints > 0);

export const SparklesCore = ({
  className = '',
  background = 'transparent',
  particleColor,
  particleDensity = 80,
  minSize = 0.6,
  maxSize = 1.8,
  speed = 0.4,
}) => {
  const canvasRef = useRef(null);

  if (isTouchDevice) {
    return <div className={`absolute inset-0 w-full h-full ${className}`} style={{ background }} />;
  }
  const particles = useRef([]);
  const animFrame = useRef(null);
  const visible = useRef(true);

  const initParticles = useCallback((canvas) => {
    const isMobile = window.innerWidth < 768;
    const density = isMobile ? Math.min(particleDensity, 30) : particleDensity;
    const arr = [];
    const count = Math.floor((canvas.width * canvas.height) / (10000 / density * 100));
    for (let i = 0; i < count; i++) {
      arr.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: minSize + Math.random() * (maxSize - minSize),
        speedX: (Math.random() - 0.5) * speed,
        speedY: (Math.random() - 0.5) * speed,
        opacity: Math.random() * 0.6 + 0.2,
        fadeDir: Math.random() > 0.5 ? 1 : -1,
      });
    }
    return arr;
  }, [particleDensity, minSize, maxSize, speed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const observer = new IntersectionObserver(([e]) => {
      visible.current = e.isIntersecting;
    }, { threshold: 0 });
    observer.observe(canvas);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      particles.current = initParticles({ width: rect.width, height: rect.height });
    };

    let resizeTimer;
    const onResize = () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(resize, 200); };
    resize();
    window.addEventListener('resize', onResize);

    const restartAnimation = () => {
      if (animFrame.current) return;
      animFrame.current = requestAnimationFrame(animate);
    };

    const visibilityObserver = new IntersectionObserver(([e]) => {
      visible.current = e.isIntersecting;
      if (e.isIntersecting) restartAnimation();
    }, { threshold: 0 });

    observer.disconnect();
    visibilityObserver.observe(canvas);

    const animate = () => {
      if (!visible.current) { animFrame.current = null; return; }
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      particles.current.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.opacity += p.fadeDir * 0.003;
        if (p.opacity >= 0.8) p.fadeDir = -1;
        if (p.opacity <= 0.1) p.fadeDir = 1;
        if (p.x < 0) p.x = rect.width;
        if (p.x > rect.width) p.x = 0;
        if (p.y < 0) p.y = rect.height;
        if (p.y > rect.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      animFrame.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', onResize);
      visibilityObserver.disconnect();
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
      animFrame.current = null;
    };
  }, [initParticles, particleColor]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ background, pointerEvents: 'none' }}
    />
  );
};
