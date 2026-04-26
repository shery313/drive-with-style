import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const phoneNumber = "923125430959";

  return (
    <a
      href={`https://wa.me/${phoneNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Drive With Style on WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-3 rounded-full border border-white/12 bg-[#07111d]/88 px-4 py-3 text-white shadow-[0_24px_60px_rgba(0,0,0,0.35)] backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:bg-[#0c1828] sm:bottom-6 sm:right-6"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[linear-gradient(135deg,#16a34a,#22c55e)] shadow-[0_12px_35px_rgba(34,197,94,0.28)]">
        <MessageCircle className="h-5 w-5" />
      </span>
      <span className="hidden pr-1 text-left sm:block">
        <span className="block text-xs uppercase tracking-[0.2em] text-emerald-200">Quick help</span>
        <span className="block text-sm font-semibold">WhatsApp us</span>
      </span>
    </a>
  );
};

export default WhatsAppButton;
