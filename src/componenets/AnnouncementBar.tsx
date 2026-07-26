import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ArrowRight, Megaphone } from "lucide-react";

import { SERVER_URL } from "../constant";

type Promotion = {
  id: number;
  title: string;
  promotion_type: string;
  summary: string;
  promo_code: string;
  cta_label: string;
  cta_url: string;
  show_in_announcement_bar: boolean;
};

const AnnouncementBar = () => {
  const [promotions, setPromotions] = useState<Promotion[]>([]);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await axios.get<Promotion[]>(`${SERVER_URL}/api/v1/promotions/`);
        setPromotions(response.data);
      } catch (error) {
        console.error("Error fetching announcement bar:", error);
      }
    };

    fetchPromotions();
  }, []);

  const announcement = useMemo(() => {
    return promotions.find((promotion) => promotion.show_in_announcement_bar);
  }, [promotions]);

  if (!announcement) return null;

  const label = announcement.cta_label || "View offer";
  const codeText = announcement.promo_code ? `Code ${announcement.promo_code}` : announcement.promotion_type.replace("_", " ");
  const content = (
    <>
      <span className="inline-flex items-center gap-2 font-semibold text-[#121714]">
        <Megaphone className="h-4 w-4 text-[#f05a28]" />
        {announcement.title}
      </span>
      <span className="hidden text-[#69746f] md:inline">{announcement.summary}</span>
      <span className="rounded-full border border-[#f05a28]/20 bg-[#f05a28]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#9a3412]">
        {codeText}
      </span>
      <span className="inline-flex items-center gap-1 font-semibold text-[#006d77]">
        {label}
        <ArrowRight className="h-4 w-4" />
      </span>
    </>
  );

  if (announcement.cta_url?.startsWith("http")) {
    return (
      <a
        href={announcement.cta_url}
        target="_blank"
        rel="noopener noreferrer"
        className="block border-b border-black/10 bg-[#fff4df] px-4 py-2.5 text-sm"
      >
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-4 gap-y-2">
          {content}
        </div>
      </a>
    );
  }

  return (
    <Link to={announcement.cta_url || "/book"} className="block border-b border-black/10 bg-[#fff4df] px-4 py-2.5 text-sm">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-4 gap-y-2">
        {content}
      </div>
    </Link>
  );
};

export default AnnouncementBar;
