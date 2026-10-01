import React, { useEffect, useState } from "react";

import SelfAssessmentHero from "../../../component/self-assessment/SelfAssessmentHero.jsx";
import SelfAssessmentTrust from "../../../component/self-assessment/SelfAssessmentTrust.jsx";
import SelfAssessmentOverview from "../../../component/self-assessment/SelfAssessmentOverview.jsx";
import SelfAssessmentFeatures from "../../../component/self-assessment/SelfAssessmentFeatures.jsx";
import SelfAssessmentBenefits from "../../../component/self-assessment/SelfAssessmentBenefits.jsx";
import SelfAssessmentHowItWorks from "../../../component/self-assessment/SelfAssessmentHowItWorks.jsx";
import SelfAssessmentWhoIsItFor from "../../../component/self-assessment/SelfAssessmentWhoIsItFor.jsx";
import SelfAssessmentPricing from "../../../component/self-assessment/SelfAssessmentPricing.jsx";
import SelfAssessmentFAQ from "../../../component/self-assessment/SelfAssessmentFAQ.jsx";
import SelfAssessmentCTA from "../../../component/self-assessment/SelfAssessmentCTA.jsx";
import TaxPilotLoader from "../../../component/common/PageLoader.jsx";

const SelfAssessment = () => {
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
      <SelfAssessmentHero />
      <SelfAssessmentTrust />
      <SelfAssessmentOverview />
      <SelfAssessmentFeatures />
      <SelfAssessmentBenefits />
      <SelfAssessmentHowItWorks />
      <SelfAssessmentWhoIsItFor />
      <SelfAssessmentPricing />
      <SelfAssessmentFAQ />
      <SelfAssessmentCTA />
    </>
  );
};

export default SelfAssessment;
