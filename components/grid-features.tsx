import { cn } from "@/lib/utils";
import {
  IconAdjustmentsBolt,
  IconCloud,
  IconCurrencyDollar,
  IconEaseInOut,
  IconHeart,
  IconHelp,
  IconRouteAltLeft,
  IconTerminal2,
} from "@tabler/icons-react";

export const GridFeatures = () => {
  const features = [
    {
      title: "Clone-ready Castles",
      description:
        "Pre-built AI SaaS templates—pick a niche and launch in minutes.",
      icon: <IconTerminal2 />,
    },
    {
      title: "100 % White-Label",
      description:
        "Your logo, domain & Stripe; Lynk stays invisible to end-users.",
      icon: <IconEaseInOut />,
    },
    {
      title: "Triple Revenue Streams",
      description:
        "€30 per signup, up to 75 % MRR, plus 20 % royalty on every clone.",
      icon: <IconCurrencyDollar />,
    },
    {
      title: "Multi-Channel AI",
      description: "Web, WhatsApp, Instagram DM & SMS—one brain sells everywhere.",
      icon: <IconCloud />,
    },
    {
      title: "Zero Code • Zero Ops",
      description: "We host, scale and support; you focus on marketing and profit.",
      icon: <IconRouteAltLeft />,
    },
    {
      title: "Live MRR Dashboard",
      description:
        "Track earnings, clone tree and leaderboard rankings in real time.",
      icon: <IconHelp />,
    },
    {
      title: "24/7 Hosting",
      description:
        "SOC 2 infrastructure, auto-updates and 99.9 % uptime baked in.",
      icon: <IconAdjustmentsBolt />,
    },
    {
      title: "Scarcity = Viral Growth",
      description: "Only 50 new builders per month—each clone fuels your royalty tree.",
      icon: <IconHeart />,
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10 py-10">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
};

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r  py-10 relative group dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover:opacity-100 transition duration-200 group absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover:opacity-100 transition duration-200 group absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10">{icon}</div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover:bg-blue-500 transition duration-200" />
        <span className="group-hover:translate-x-2 transition duration-200 inline-block">
          {title}
        </span>
      </div>
      <p className="text-sm text-muted dark:text-muted-dark max-w-xs mx-auto relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
