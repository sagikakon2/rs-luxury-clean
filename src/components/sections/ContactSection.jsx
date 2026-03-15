import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, ArrowLeft, Loader2, ChevronDown, CheckCircle2 } from 'lucide-react';
import { ScrollReveal } from '@/components/effects/ScrollReveal';

const schema = z.object({
  name: z.string().min(1, 'שם מלא הוא שדה חובה'),
  phone: z.string().regex(/^[\d\-+() ]{7,15}$/, 'מספר טלפון לא תקין'),
  service: z.string().min(1, 'נא לבחור סוג שירות'),
  message: z.string().optional(),
});

const SERVICES_OPTIONS = [
  'ניקיון משרדים',
  'משק בית',
  'ניקיון לפני/אחרי שיפוץ',
  'סידור ארונות ומזווים',
  'אחר',
];

export const ContactSection = () => {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    const msg = `שלום, שמי ${data.name}.\nמעוניין/ת בשירות: ${data.service}.\n${data.message || ''}`;
    const url = `https://wa.me/972539300202?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
    setSubmitted(true);
  };

  const inputClass =
    'w-full bg-white border border-black/10 text-text placeholder:text-text-muted/50 px-4 py-3.5 text-base outline-none focus:border-primary transition-colors';

  return (
    <section className="py-32 md:py-40 bg-bg-alt relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">
          <ScrollReveal>
            <div className="text-center md:text-start">
              <span className="text-primary text-xs font-medium tracking-[0.2em] uppercase block mb-4">
                צרו קשר
              </span>
              <h2
                className="text-text text-3xl md:text-4xl lg:text-5xl font-medium mb-6"
                style={{ letterSpacing: '0.04em', lineHeight: 1.15 }}
              >
                נשמח לשמוע מכם
              </h2>
              <div className="w-12 h-[1px] bg-primary/30 mb-8 mx-auto md:mx-0" />
              <p className="text-text-muted text-lg mb-10" style={{ fontWeight: 300 }}>
                השאירו פרטים ונחזור אליכם בהקדם עם הצעת מחיר מותאמת אישית.
              </p>

              <div className="flex flex-col gap-6">
                <a href="tel:0539300202" className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-11 h-11 flex items-center justify-center text-primary rounded-xl"
                    style={{
                      background: 'linear-gradient(135deg, rgba(139,115,85,0.12), rgba(196,181,160,0.18))',
                      boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4), 0 2px 8px rgba(0,0,0,0.06)',
                      border: '1px solid rgba(139,115,85,0.12)',
                    }}>
                    <Phone className="w-5 h-5" strokeWidth={1} />
                  </div>
                  <div>
                    <p className="text-text-muted text-xs tracking-[0.1em] uppercase">טלפון</p>
                    <p className="text-text font-medium group-hover:text-primary transition-colors">053-930-0202</p>
                  </div>
                </a>

                <a href="mailto:rsclean21@gmail.com" className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-11 h-11 flex items-center justify-center text-primary rounded-xl"
                    style={{
                      background: 'linear-gradient(135deg, rgba(139,115,85,0.12), rgba(196,181,160,0.18))',
                      boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4), 0 2px 8px rgba(0,0,0,0.06)',
                      border: '1px solid rgba(139,115,85,0.12)',
                    }}>
                    <Mail className="w-5 h-5" strokeWidth={1} />
                  </div>
                  <div>
                    <p className="text-text-muted text-xs tracking-[0.1em] uppercase">אימייל</p>
                    <p className="text-text font-medium group-hover:text-primary transition-colors">rsclean21@gmail.com</p>
                  </div>
                </a>

                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 flex items-center justify-center text-primary rounded-xl"
                    style={{
                      background: 'linear-gradient(135deg, rgba(139,115,85,0.12), rgba(196,181,160,0.18))',
                      boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4), 0 2px 8px rgba(0,0,0,0.06)',
                      border: '1px solid rgba(139,115,85,0.12)',
                    }}>
                    <MapPin className="w-5 h-5" strokeWidth={1} />
                  </div>
                  <div>
                    <p className="text-text-muted text-xs tracking-[0.1em] uppercase">אזור שירות</p>
                    <p className="text-text font-medium">אזור המרכז</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <div id="contact" className="glass-card rounded-2xl p-8 md:p-10 scroll-mt-28">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-text text-xl font-medium mb-2">תודה רבה!</h3>
                  <p className="text-text-muted">הפנייה שלכם התקבלה, נחזור אליכם בהקדם.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                  <div>
                    <label className="block text-sm font-medium text-text mb-1.5">
                      שם מלא <span className="text-red-400">*</span>
                    </label>
                    <input
                      {...register('name')}
                      placeholder="הכניסו את שמכם"
                      className={inputClass}
                    />
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text mb-1.5">
                      טלפון <span className="text-red-400">*</span>
                    </label>
                    <input
                      {...register('phone')}
                      type="tel"
                      placeholder="050-0000000"
                      className={inputClass}
                    />
                    {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text mb-1.5">
                      סוג שירות <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <select
                        {...register('service')}
                        className={`${inputClass} appearance-none pe-12 cursor-pointer`}
                      >
                        <option value="">בחירת שירות...</option>
                        {SERVICES_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute end-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted pointer-events-none" />
                    </div>
                    {errors.service && <p className="text-red-400 text-xs mt-1">{errors.service.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text mb-1.5">
                      הודעה
                    </label>
                    <textarea
                      {...register('message')}
                      rows={4}
                      placeholder="ספרו לנו במה נוכל לעזור..."
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-cta text-cta-text text-sm tracking-[0.15em] uppercase px-8 py-4 min-h-[48px] cursor-pointer hover:opacity-90 transition-opacity mt-2 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        שליחה
                        <ArrowLeft className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
          </div>
        </div>
      </div>
    </section>
  );
};
