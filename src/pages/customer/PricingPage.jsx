import React, { useEffect, useState } from "react";
import PricingHero from "../../component/pricing/PricingHero";
import BillingToggle from "../../component/pricing/BillingToggle";
import PricingPlans from "../../component/pricing/PricingPlans";
import ProductPricing from "../../component/pricing/ProductPricing";
import CompareFeatures from "../../component/pricing/CompareFeatures";
import PricingFAQ from "../../component/pricing/PricingFAQ";
import PricingCTA from "../../component/pricing/PricingCTA";
import TaxPilotLoader from "../../component/common/PageLoader";

const PricingPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <TaxPilotLoader />;
  }
  return (
    <div>
      <PricingHero />
      <BillingToggle />
      <PricingPlans />
      <ProductPricing />
      <CompareFeatures />
      <PricingFAQ />
      <PricingCTA />
    </div>
  );
};

export default PricingPage;
