import { ScrollReveal } from '@/components/effects/ScrollReveal';

export const ParallaxDivider = ({
  image,
  overlayClass = 'bg-black/60',
  quote,
  author,
  height = 'h-[50dvh] md:h-[60dvh]',
}) => (
  <section className={`relative ${height} flex items-center justify-center overflow-hidden`}>
    <img
      src={image}
      alt=""
      className="absolute inset-0 w-full h-full object-cover"
      loading="lazy"
      width={1920}
      height={1080}
    />
    <div className={`absolute inset-0 ${overlayClass}`} />

    {quote && (
      <ScrollReveal className="relative z-10 max-w-3xl mx-auto px-6 md:px-12 text-center">
        <blockquote
          className="text-white text-2xl md:text-3xl lg:text-4xl font-medium leading-snug"
          style={{ letterSpacing: '0.03em', lineHeight: 1.3 }}
        >
          "{quote}"
        </blockquote>
        {author && (
          <p className="mt-6 text-white/50 text-sm tracking-[0.2em] uppercase">
            — {author}
          </p>
        )}
      </ScrollReveal>
    )}
  </section>
);
