import { MessageCircle } from 'lucide-react';

export const WhatsAppFAB = () => (
  <a
    href="https://wa.me/972539300202?text=%D7%94%D7%99%D7%99%2C%20%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%A7%D7%91%D7%9C%20%D7%A4%D7%A8%D7%98%D7%99%D7%9D%20%D7%A2%D7%9C%20%D7%A9%D7%99%D7%A8%D7%95%D7%AA%D7%99%20%D7%94%D7%A0%D7%99%D7%A7%D7%99%D7%95%D7%9F"
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 start-6 z-50 w-14 h-14 bg-whatsapp rounded-full flex items-center justify-center shadow-lg animate-pulse-gentle cursor-pointer hover:scale-110 transition-transform"
    aria-label="שלחו הודעת WhatsApp"
  >
    <MessageCircle className="w-6 h-6 text-white" />
  </a>
);
