import React, { useEffect, useState } from "react";
import HeroSection from "../../component/home_page/HeroSection";
import TrustedBrands from "../../component/home_page/TrustedBrands";
import ProductsSection from "../../component/home_page/ProductsSection";
import HowItWorks from "../../component/home_page/HowItWorks";
import Testimonial from "../../component/home_page/Testimonial";
import PricingSection from "../../component/home_page/PricingSection";
import BlogSection from "../../component/home_page/BlogSection";
import CTASection from "../../component/home_page/CTASection";
import WorkspaceCards from "../../component/home_page/WorkspaceCards";
import StepsSection from "../../component/home_page/StepsSection";
import AudienceSection from "../../component/home_page/AudienceSection";
import FAQSection from "../../component/home_page/FAQSection";
import TaxPilotLoader from "../../component/common/PageLoader";

const LandingPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if(loading){
    return <TaxPilotLoader/>
  }

  return (
    <div className="">
      <HeroSection />
      <WorkspaceCards />
      <StepsSection />

      <AudienceSection />
      <PricingSection />
      <FAQSection />
      <CTASection />

      {/* <TrustedBrands/>
     <ProductsSection/>
     <HowItWorks/>
     <Testimonial/>
     <BlogSection/> */}
    </div>
  );
};

export default LandingPage;
