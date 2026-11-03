import { BentoCard } from "./BentoCard";
import { TrustBox } from "./boxes/TrustBox";
import { TechMarqueeBox } from "./boxes/TechMarqueeBox";
import { GlobeBox } from "./boxes/GlobeBox";
import { ContactBox } from "./boxes/ContactBox";
import { FeaturedBox } from "./boxes/FeaturedBox";
import { WorkspaceBox } from "./boxes/WorkspaceBox";

export const BentoGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 max-w-5xl mx-auto px-3.5 sm:px-4">
      {/* TOP ROW */}
      <BentoCard className="col-span-1 min-h-[250px]" delay={0.1}>
         <TrustBox />
      </BentoCard>
      <BentoCard className="col-span-1 md:col-span-2 min-h-[250px]" delay={0.2}>
         <TechMarqueeBox />
      </BentoCard>

      {/* BOTTOM SECTION */}
      {/* Left Column (Tall Globe) */}
      <BentoCard className="col-span-1 min-h-[460px] sm:min-h-[500px]" delay={0.3}>
         <GlobeBox />
      </BentoCard>

      {/* Right Columns */}
      <div className="col-span-1 md:col-span-2 flex flex-col gap-3.5 sm:gap-4">
         {/* Let's work together & Featured */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 flex-1">
            <BentoCard delay={0.4}>
               <ContactBox />
            </BentoCard>
            <BentoCard delay={0.5}>
               <FeaturedBox />
            </BentoCard>
         </div>

         {/* Workspace */}
         <BentoCard className="min-h-[100px]" delay={0.6}>
            <WorkspaceBox />
         </BentoCard>
      </div>
    </div>
  );
};
