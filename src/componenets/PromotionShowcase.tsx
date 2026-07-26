import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import {
  ArrowRight,
  BadgePercent,
  CalendarDays,
  Globe2,
  Megaphone,
  Sparkles,
  Ticket,
} from "lucide-react";

import { SERVER_URL } from "../constant";

type Promotion = {
  id: number;
  slug: string;
  title: string;
  promotion_type: "announcement" | "discount" | "special_event" | "global_campaign";
  eyebrow: string;
  summary: string;
  description: string;
  poster: string | null;
  discount_percent: number | null;
  discount_amount: string | null;
  promo_code: string;
  applies_to_name: string | null;
  applies_to_slug: string | null;
  audience_region: string;
  cta_label: string;
  cta_url: string;
  terms: string;
  starts_at: string | null;
  ends_at: string | null;
  is_featured: boolean;
  show_in_announcement_bar: boolean;
  priority: number;
};

const typeMeta = {
  announcement: {
    label: "Announcement",
    icon: Megaphone,
    tone: "bg-[#006d77]/10 text-[#064f57] border-[#006d77]/20",
  },
  discount: {
    label: "Discount",
    icon: BadgePercent,
    tone: "bg-[#f05a28]/10 text-[#9a3412] border-[#f05a28]/20",
  },
  special_event: {
    label: "Special Event",
    icon: CalendarDays,
    tone: "bg-[#3f2d56]/10 text-[#3f2d56] border-[#3f2d56]/20",
  },
  global_campaign: {
    label: "Global Campaign",
    icon: Globe2,
    tone: "bg-[#2f7d5c]/10 text-[#2f7d5c] border-[#2f7d5c]/20",
  },
};

const formatDate = (value: string | null) => {
  if (!value) return null;

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
};

const getOfferText = (promotion: Promotion) => {
  if (promotion.discount_percent) return `${promotion.discount_percent}% off`;
  if (promotion.discount_amount) return `Rs. ${Math.round(Number(promotion.discount_amount)).toLocaleString()} off`;
  if (promotion.promo_code) return promotion.promo_code;
  return typeMeta[promotion.promotion_type].label;
};

const ActionLink = ({ promotion, className }: { promotion: Promotion; className: string }) => {
  const label = promotion.cta_label || "Book now";

  if (promotion.cta_url?.startsWith("http")) {
    return (
      <a href={promotion.cta_url} target="_blank" rel="noopener noreferrer" className={className}>
        {label}
        <ArrowRight className="h-4 w-4" />
      </a>
    );
  }

  return (
    <Link to={promotion.cta_url || "/book"} className={className}>
      {label}
      <ArrowRight className="h-4 w-4" />
    </Link>
  );
};

const PromotionShowcase = () => {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await axios.get<Promotion[]>(`${SERVER_URL}/api/v1/promotions/`);
        setPromotions(response.data);
      } catch (error) {
        console.error("Error fetching promotions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPromotions();
  }, []);

  const featured = useMemo(() => {
    return promotions.find((promotion) => promotion.is_featured) || promotions[0];
  }, [promotions]);

  const secondary = useMemo(() => {
    if (!featured) return [];
    return promotions.filter((promotion) => promotion.id !== featured.id).slice(0, 3);
  }, [featured, promotions]);

  if (loading || !featured) {
    return null;
  }

  const featuredMeta = typeMeta[featured.promotion_type];
  const FeaturedIcon = featuredMeta.icon;
  const activeDates = [formatDate(featured.starts_at), formatDate(featured.ends_at)]
    .filter(Boolean)
    .join(" - ");

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="promotions-heading">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="dws-label">
              <Sparkles className="h-4 w-4" />
              Live offers and updates
            </div>
            <h2 id="promotions-heading" className="mt-6 text-3xl font-semibold text-[#121714] sm:text-5xl">
              Fresh announcements, special events, and limited-time rental offers.
            </h2>
          </div>
          <Link to="/book" className="dws-button-secondary px-6 py-4 text-sm">
            Reserve with offer
          </Link>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <motion.article
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-lg border border-black/10 bg-[#fffdf7] shadow-[0_18px_55px_rgba(28,39,34,0.13)]"
          >
            <div className="grid min-h-[420px] lg:grid-cols-[0.95fr_1.05fr]">
              <div className="relative min-h-[280px] bg-[#121714]">
                {featured.poster ? (
                  <img
                    src={featured.poster}
                    alt={`${featured.title} poster`}
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="absolute inset-0 bg-[linear-gradient(135deg,#006d77,#3f2d56_62%,#f05a28)]" />
                )}
                <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(18,23,20,0.58),rgba(18,23,20,0.08))]" />
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
                    <Ticket className="h-4 w-4" />
                    {getOfferText(featured)}
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-between p-6 sm:p-8">
                <div>
                  <div className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.13em] ${featuredMeta.tone}`}>
                    <FeaturedIcon className="h-4 w-4" />
                    {featured.eyebrow || featuredMeta.label}
                  </div>

                  <h3 className="mt-6 text-3xl font-semibold leading-tight text-[#121714] sm:text-4xl">
                    {featured.title}
                  </h3>
                  <p className="mt-4 text-base leading-8 text-[#69746f]">{featured.summary}</p>
                  {featured.description && (
                    <p className="mt-3 text-sm leading-7 text-[#69746f]">{featured.description}</p>
                  )}
                </div>

                <div className="mt-8 space-y-5">
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="rounded-lg border border-black/10 bg-[#f4f7f2] p-4">
                      <p className="text-xs uppercase tracking-[0.14em] text-[#69746f]">Region</p>
                      <p className="mt-2 text-sm font-semibold text-[#121714]">{featured.audience_region}</p>
                    </div>
                    <div className="rounded-lg border border-black/10 bg-[#f4f7f2] p-4">
                      <p className="text-xs uppercase tracking-[0.14em] text-[#69746f]">Code</p>
                      <p className="mt-2 text-sm font-semibold text-[#121714]">
                        {featured.promo_code || "No code needed"}
                      </p>
                    </div>
                    <div className="rounded-lg border border-black/10 bg-[#f4f7f2] p-4">
                      <p className="text-xs uppercase tracking-[0.14em] text-[#69746f]">Dates</p>
                      <p className="mt-2 text-sm font-semibold text-[#121714]">{activeDates || "Open now"}</p>
                    </div>
                  </div>

                  {featured.terms && <p className="text-xs leading-6 text-[#69746f]">{featured.terms}</p>}

                  <ActionLink
                    promotion={featured}
                    className="dws-button-primary inline-flex gap-2 px-6 py-4 text-sm"
                  />
                </div>
              </div>
            </div>
          </motion.article>

          <div className="grid gap-4">
            {secondary.length > 0 ? (
              secondary.map((promotion, index) => {
                const meta = typeMeta[promotion.promotion_type];
                const Icon = meta.icon;

                return (
                  <motion.article
                    key={promotion.id}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    className="rounded-lg border border-black/10 bg-[#fffdf7] p-5 shadow-[0_14px_40px_rgba(18,23,20,0.08)]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border ${meta.tone}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="rounded-full border border-black/10 bg-[#f4f7f2] px-3 py-1 text-xs font-semibold text-[#24302b]">
                        {getOfferText(promotion)}
                      </span>
                    </div>
                    <h3 className="mt-5 text-xl font-semibold text-[#121714]">{promotion.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-[#69746f]">{promotion.summary}</p>
                    <div className="mt-5 flex items-center justify-between gap-3">
                      <span className="text-xs uppercase tracking-[0.13em] text-[#69746f]">
                        {promotion.audience_region}
                      </span>
                      <ActionLink
                        promotion={promotion}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#006d77] hover:text-[#064f57]"
                      />
                    </div>
                  </motion.article>
                );
              })
            ) : (
              <div className="rounded-lg border border-black/10 bg-[#fffdf7] p-6">
                <h3 className="text-xl font-semibold text-[#121714]">More offers coming soon</h3>
                <p className="mt-3 text-sm leading-7 text-[#69746f]">
                  New travel updates, event transport packages, and seasonal campaigns can now be published from the admin panel.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromotionShowcase;
