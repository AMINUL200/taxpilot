import React from "react";
import HeroSection from "../../component/home_page/HeroSection";
import TrustedBrands from "../../component/home_page/TrustedBrands";
import ProductsSection from "../../component/home_page/ProductsSection";
import HowItWorks from "../../component/home_page/HowItWorks";
import Testimonial from "../../component/home_page/Testimonial";
import PricingSection from "../../component/home_page/PricingSection";
import BlogSection from "../../component/home_page/BlogSection";
import CTASection from "../../component/home_page/CTASection";

const LandingPage = () => {
  return (
    <div className="">
      <HeroSection />
     <TrustedBrands/>
     <ProductsSection/>
     <HowItWorks/>
     <Testimonial/>
     <PricingSection/>
     <BlogSection/>
     <CTASection/>
    </div>
  );
};

export default LandingPage;
