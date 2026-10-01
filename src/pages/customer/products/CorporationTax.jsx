import React, { useEffect, useState } from "react";

import CorporationTaxHero from "../../../component/corporation-tax/CorporationTaxHero.jsx";
import CorporationTaxTrust from "../../../component/corporation-tax/CorporationTaxTrust.jsx";
import CorporationTaxOverview from "../../../component/corporation-tax/CorporationTaxOverview.jsx";
import CorporationTaxFeatures from "../../../component/corporation-tax/CorporationTaxFeatures.jsx";
import CorporationTaxBenefits from "../../../component/corporation-tax/CorporationTaxBenefits.jsx";
import CorporationTaxHowItWorks from "../../../component/corporation-tax/CorporationTaxHowItWorks.jsx";
import CorporationTaxWhoIsItFor from "../../../component/corporation-tax/CorporationTaxWhoIsItFor.jsx";
import CorporationTaxPricing from "../../../component/corporation-tax/CorporationTaxPricing.jsx";
import CorporationTaxFAQ from "../../../component/corporation-tax/CorporationTaxFAQ.jsx";
import CorporationTaxCTA from "../../../component/corporation-tax/CorporationTaxCTA.jsx";
import TaxPilotLoader from "../../../component/common/PageLoader.jsx";

const CorporationTax = () => {
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
    <>
      <CorporationTaxHero />
      <CorporationTaxTrust />
      <CorporationTaxOverview />
      <CorporationTaxFeatures />
      <CorporationTaxBenefits />
      <CorporationTaxHowItWorks />
      <CorporationTaxWhoIsItFor />
      <CorporationTaxPricing />
      <CorporationTaxFAQ />
      <CorporationTaxCTA />
    </>
  );
};

export default CorporationTax;