import React, { useEffect, useState } from "react";

import MtdVatHero from "../../../component/mtd-vat/MtdVatHero.jsx";
import MtdVatTrust from "../../../component/mtd-vat/MtdVatTrust.jsx";
import MtdVatOverview from "../../../component/mtd-vat/MtdVatOverview.jsx";
import MtdVatFeatures from "../../../component/mtd-vat/MtdVatFeatures.jsx";
import MtdVatBenefits from "../../../component/mtd-vat/MtdVatBenefits.jsx";
import MtdVatHowItWorks from "../../../component/mtd-vat/MtdVatHowItWorks.jsx";
import MtdVatWhoIsItFor from "../../../component/mtd-vat/MtdVatWhoIsItFor.jsx";
import MtdVatPricing from "../../../component/mtd-vat/MtdVatPricing.jsx";
import MtdVatFAQ from "../../../component/mtd-vat/MtdVatFAQ.jsx";
import MtdVatCTA from "../../../component/mtd-vat/MtdVatCTA.jsx";
import TaxPilotLoader from "../../../component/common/PageLoader.jsx";

const MtdVat = () => {
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
    <>
      <MtdVatHero />
      <MtdVatTrust />
      <MtdVatOverview />
      <MtdVatFeatures />
      <MtdVatBenefits />
      <MtdVatHowItWorks />
      <MtdVatWhoIsItFor />
      <MtdVatPricing />
      <MtdVatFAQ />
      <MtdVatCTA />
    </>
  );
};

export default MtdVat;
