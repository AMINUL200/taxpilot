import React from "react";

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

const SelfAssessment = () => {
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