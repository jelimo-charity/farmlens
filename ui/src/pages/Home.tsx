import Navbar from "@/components/landing/Navbar";
import HowItWorks from "@/components/landing/HowItWorks";
import Features from "@/components/landing/Features";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";
import WhyFarmLens from "@/components/landing/WhyFarmLens";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <CTA />
      <WhyFarmLens />
   
      <HowItWorks />
      <Features />
      <Footer />
    </div>
  );
}