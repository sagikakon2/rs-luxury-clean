import { Users, Zap, Award } from 'lucide-react';
import { ScrollReveal } from '@/components/effects/ScrollReveal';
import { NumberTicker } from '@/components/effects/NumberTicker';

const DIFFERENTIATORS = [
  {
    icon: Users,
    title: 'צוות מקצועי',
    description: 'עובדות מנוסות מאוקראינה ורוסיה — מקצועיות, אמינות ודיסקרטיות מוחלטת.',
  },
  {
    icon: Zap,
    title: 'זמינות מיידית',
    description: 'צריכים עזרה עכשיו? אנחנו מגיעים. ללא המתנה, ללא עיכובים.',
  },
  {
    icon: Award,
    title: 'תוצאות ברמת יוקרה',
    description: 'לא סתם ניקיון — סטנדרט של יוקרה. כל פרט, כל פינה, ברמה הגבוהה ביותר.',
  },
];

const STATS = [
  { value: 500, suffix: '+', label: 'לקוחות מרוצים' },
  { value: 8, suffix: '', label: 'שנות ניסיון' },
  { value: 100, suffix: '%', label: 'שביעות רצון' },
];

export const WhyUsSection = () => (
  <section id="why-us" className="py-32 md:py-40 bg-bg relative">
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="gradient-blob w-80 h-80 bg-secondary/8 bottom-20 -start-32" />
    </div>

    <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
      <ScrollReveal>
        <div className="text-center mb-20">
          <span className="text-primary text-xs font-medium tracking-[0.2em] uppercase block mb-4">
            למה R.S LUXURY CLEAN
          </span>
          <h2
            className="text-text text-3xl md:text-4xl lg:text-5xl font-medium"
            style={{ letterSpacing: '0.04em', lineHeight: 1.15 }}
          >
            ניקיון שלא מתפשרים עליו
          </h2>
          <div className="w-12 h-[1px] bg-primary/30 mx-auto mt-6" />
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-24">
        {DIFFERENTIATORS.map((item, i) => (
          <ScrollReveal key={item.title} delay={i * 0.12}>
            <div className="glass-card rounded-2xl p-8 text-center h-full">
              <div className="w-14 h-14 mx-auto mb-6 rounded-xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(139,115,85,0.1), rgba(196,181,160,0.15))',
                  border: '1px solid rgba(139,115,85,0.12)',
                }}>
                <item.icon className="w-7 h-7 text-primary" strokeWidth={1} />
              </div>
              <h3
                className="text-text text-xl font-medium mb-3"
                style={{ letterSpacing: '0.02em' }}
              >
                {item.title}
              </h3>
              <p className="text-text-muted text-base leading-relaxed" style={{ fontWeight: 300 }}>
                {item.description}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal>
        <div className="glass-card rounded-2xl py-12 md:py-16 px-6">
          <div className="grid grid-cols-3 gap-4 md:gap-8 text-center">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <div
                  className="font-display text-primary mb-2"
                  style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 300, lineHeight: 1 }}
                >
                  <NumberTicker value={stat.value} suffix={stat.suffix} duration={3} />
                </div>
                <p className="text-text-muted text-[10px] md:text-xs tracking-[0.1em] md:tracking-[0.15em] uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>
);
