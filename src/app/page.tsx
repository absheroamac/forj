import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { MethodSection } from "@/components/sections/MethodSection";
import { WeeklySchedule } from "@/components/sections/WeeklySchedule";
import { CoachSection } from "@/components/sections/CoachSection";
import { FoundingOffer } from "@/components/sections/FoundingOffer";
import { WaitlistSection } from "@/components/sections/WaitlistSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0A0A0A] text-white">
      <Navbar />
      <main className="flex-1">
        <Hero price={999} seats={20} />
        <MethodSection />
        <WeeklySchedule />
        <CoachSection />
        <FoundingOffer price={999} seats={20} showOpenFlags={true} />
        <WaitlistSection />
      </main>
      <Footer />
    </div>
  );
}
