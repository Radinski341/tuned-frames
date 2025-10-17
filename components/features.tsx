import React from "react";
import { Heading } from "./heading";
import { Subheading } from "./subheading";
import { cn } from "@/lib/utils";
import { GridLineHorizontal, GridLineVertical } from "./grid-lines";
import { SkeletonOne } from "./skeletons/first";
import { SkeletonTwo } from "./skeletons/second";
import { SkeletonFour } from "./skeletons/fourth";
import { SkeletonThree } from "./skeletons/third";

export const Features = () => {
  const features = [
    {
      title: "Clone a Castle in two clicks",
      description:
        "Pick a niche template - fitness, legal, SMMA, coaching. AI prompts, landing page, CRM & Stripe come pre-wired.",
      skeleton: <SkeletonOne />,
      className:
        "col-span-1 lg:col-span-4 border-b border-r dark:border-neutral-800",
    },
    {
      title: "Zero-code brand customiser",
      description:
        "Drop in your logo, colours and domain. Lynk re-skins the chatbot, site, and emails instantly - no code needed.",
      skeleton: <SkeletonTwo />,
      className: "border-b col-span-1 lg:col-span-2 dark:border-neutral-800",
    },
    {
      title: "Go live & earn in < 48 h",
      description:
        "Set price, press Publish. Lynk hosts, scales, and supports while you collect up to 75 % MRR.",
      skeleton: <SkeletonThree />,
      className: "col-span-1 lg:col-span-3 border-r dark:border-neutral-800",
    },
    {
      title: "Multi-channel AI out of the box",
      description:
        "Web chat, WhatsApp, Instagram DM, SMS - one brain, everywhere your buyers hang out.",
      skeleton: <SkeletonFour />,
      className: "col-span-1 lg:col-span-3",
    },
  ];
  return (
    <div className="relative z-20 py-10 lg:py-10 overflow-hidden lg:overflow-visible">
      <Heading as="h2">AI SaaS, Ready to Sell.</Heading>
      <Subheading className="text-center ">
        From cloned Castle to first subscriber in 48 h. <br></br>
        Lynk handles the AI, hosting and payments - you keep the revenue.

      </Subheading>

      <div className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-6 mt-12">
          {features.map((feature) => (
            <FeatureCard key={feature.title} className={feature.className}>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
              <div className=" h-full w-full">{feature.skeleton}</div>
            </FeatureCard>
          ))}
        </div>
        <GridLineHorizontal
          style={{
            top: 0,
            left: "-10%",
            width: "120%",
          }}
        />

        <GridLineHorizontal
          style={{
            bottom: 0,
            left: "-10%",
            width: "120%",
          }}
        />

        <GridLineVertical
          style={{
            top: "-10%",
            right: 0,
            height: "120%",
          }}
        />
        <GridLineVertical
          style={{
            top: "-10%",
            left: 0,
            height: "120%",
          }}
        />
      </div>
    </div>
  );
};

const FeatureCard = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn(`p-4 sm:p-8 relative overflow-hidden`, className)}>
      {children}
    </div>
  );
};

const FeatureTitle = ({ children }: { children?: React.ReactNode }) => {
  return (
    <Heading as="h3" size="sm" className="text-left">
      {children}
    </Heading>
  );
};

const FeatureDescription = ({ children }: { children?: React.ReactNode }) => {
  return (
    <Subheading className="text-left max-w-sm mx-0 lg:text-sm my-2">
      {children}
    </Subheading>
  );
};
