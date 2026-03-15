import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { ScrollReveal } from '@/components/effects/ScrollReveal';
import { CDN } from '@/lib/cdn';

const GALLERY_ITEMS = [
  { type: 'image', src: CDN.beforeAfter, alt: 'סידור ארונות — לפני ואחרי', caption: 'סידור ארונות — לפני ואחרי' },
  { type: 'image', src: CDN.closet1, alt: 'ארון מאורגן', caption: 'ארון בגדים מאורגן' },
  { type: 'image', src: CDN.closet3, alt: 'סידור מגבות', caption: 'סידור מגבות וטקסטיל' },
  { type: 'video', src: CDN.video1, poster: CDN.closet2, alt: 'סידור ארון — סרטון' },
  { type: 'image', src: CDN.pantry, alt: 'מזווה מאורגן', caption: 'סידור מזווה' },
  { type: 'video', src: CDN.video2, poster: CDN.closet4, alt: 'סידור ארון ילדים — סרטון' },
  { type: 'image', src: CDN.closet5, alt: 'ארון מאורגן', caption: 'חדר ארונות מאורגן' },
  { type: 'video', src: CDN.video4, poster: CDN.closet1, alt: 'סרטון עבודה' },
];

const SWIPE_THRESHOLD = 50;

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
};

export const GallerySection = () => {
  const [lightbox, setLightbox] = useState(null);
  const [direction, setDirection] = useState(0);
  const touchStart = useRef(null);
  const touchDelta = useRef(0);

  const closeLightbox = useCallback(() => {
    setLightbox(null);
    setDirection(0);
  }, []);

  const goNext = useCallback(() => {
    setDirection(1);
    setLightbox((prev) => (prev + 1) % GALLERY_ITEMS.length);
  }, []);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setLightbox((prev) => (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
  }, []);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goNext();
      if (e.key === 'ArrowRight') goPrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox, closeLightbox, goNext, goPrev]);

  const onTouchStart = useCallback((e) => {
    touchStart.current = e.touches[0].clientX;
    touchDelta.current = 0;
  }, []);

  const onTouchMove = useCallback((e) => {
    if (touchStart.current === null) return;
    touchDelta.current = e.touches[0].clientX - touchStart.current;
  }, []);

  const onTouchEnd = useCallback(() => {
    if (Math.abs(touchDelta.current) > SWIPE_THRESHOLD) {
      if (touchDelta.current < 0) goNext();
      else goPrev();
    }
    touchStart.current = null;
    touchDelta.current = 0;
  }, [goNext, goPrev]);

  const currentItem = lightbox !== null ? GALLERY_ITEMS[lightbox] : null;

  return (
    <section id="gallery" className="py-32 md:py-40 bg-bg-alt relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <ScrollReveal>
          <div className="text-center mb-20">
            <span className="text-primary text-xs font-medium tracking-[0.2em] uppercase block mb-4">
              העבודות שלנו
            </span>
            <h2
              className="text-text text-3xl md:text-4xl lg:text-5xl font-medium"
              style={{ letterSpacing: '0.04em', lineHeight: 1.15 }}
            >
              התוצאות מדברות בעד עצמן
            </h2>
            <div className="w-12 h-[1px] bg-primary/30 mx-auto mt-6" />
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {GALLERY_ITEMS.map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.05}>
              <button
                onClick={() => { setDirection(0); setLightbox(i); }}
                className="relative overflow-hidden cursor-pointer group w-full aspect-square rounded-xl"
                style={{
                  boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.3), 0 4px 16px rgba(0,0,0,0.06)',
                  border: '1px solid rgba(255,255,255,0.4)',
                }}
              >
                {item.type === 'video' ? (
                  <>
                    <img
                      src={item.poster}
                      alt={item.alt}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                      <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                        <Play className="w-5 h-5 text-text ms-0.5" />
                      </div>
                    </div>
                  </>
                ) : (
                  <img
                    src={item.src}
                    alt={item.alt}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                )}
              </button>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightbox !== null && currentItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center select-none"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 end-4 text-white/80 hover:text-white p-3 cursor-pointer z-20"
            >
              <X className="w-8 h-8" />
            </button>

            <div className="absolute top-5 start-1/2 -translate-x-1/2 z-20">
              <span className="text-white/40 text-xs tracking-[0.15em] tabular-nums">
                {lightbox + 1} / {GALLERY_ITEMS.length}
              </span>
            </div>

            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute end-3 md:end-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center cursor-pointer transition-colors text-white/60 hover:text-white"
              style={{
                background: 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.15)',
              }}
              aria-label="הקודם"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute start-3 md:start-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center cursor-pointer transition-colors text-white/60 hover:text-white"
              style={{
                background: 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.15)',
              }}
              aria-label="הבא"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div
              className="flex-1 flex items-center justify-center w-full px-14 md:px-20 py-16"
              onClick={closeLightbox}
            >
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={lightbox}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="max-w-4xl w-full flex flex-col items-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  {currentItem.type === 'video' ? (
                    <video
                      key={currentItem.src}
                      src={currentItem.src}
                      controls
                      autoPlay
                      playsInline
                      className="w-full object-contain rounded-lg"
                      style={{ maxHeight: '75dvh' }}
                    />
                  ) : (
                    <>
                      <img
                        src={currentItem.src}
                        alt={currentItem.alt}
                        className="w-full object-contain rounded-lg"
                        style={{ maxHeight: '75dvh' }}
                        width={800}
                        height={800}
                        draggable={false}
                      />
                      {currentItem.caption && (
                        <p className="text-center text-white/50 text-sm mt-4">
                          {currentItem.caption}
                        </p>
                      )}
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="absolute bottom-5 start-1/2 -translate-x-1/2 z-20 flex">
              {GALLERY_ITEMS.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setDirection(i > lightbox ? 1 : -1);
                    setLightbox(i);
                  }}
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
                  aria-label={`תמונה ${i + 1}`}
                >
                  <span className={`block rounded-full transition-all duration-300 ${
                    i === lightbox
                      ? 'w-6 h-1.5 bg-white/80'
                      : 'w-1.5 h-1.5 bg-white/25'
                  }`} />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
