import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import StatsBar from "@/components/sections/StatsBar";
import AboutSection from "@/components/sections/AboutSection";
import IndustriesSection from "@/components/sections/IndustriesSection";
import WhySISSection from "@/components/sections/WhySISSection";
import RecruitmentSection from "@/components/sections/RecruitmentSection";
import WorldMapSection from "@/components/sections/WorldMapSection";
import CTASection from "@/components/sections/CTASection";
// import QuickForm from "@/components/ui/QuickForm";
import TechSection from "@/components/sections/TechSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ImpactSection from "@/components/sections/ImpactSection";
import WorkforceReadinessSection from "@/components/sections/WorkforceReadinessSection";
import ClientsSection from "@/components/sections/ClientsSection";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        {/* <ClientsSection /> */}
        {/* <StatsBar /> */}
        <AboutSection />
        <WhySISSection />
         <WorkforceReadinessSection />
        <TechSection />
        <TestimonialsSection /> 
        <ImpactSection />
       
        {/* <IndustriesSection /> */}
        
        {/* <RecruitmentSection /> */}
        {/* <WorldMapSection /> */}
        <CTASection />
      </main>
      <Footer />
      {/* <QuickForm /> */}
    </>
  );
}
