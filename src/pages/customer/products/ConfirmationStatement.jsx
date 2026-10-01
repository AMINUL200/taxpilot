import React, { useEffect, useState } from "react";

import ConfirmationStatementHero from "../../../component/confirmation-statement/ConfirmationStatementHero.jsx";
import ConfirmationStatementTrust from "../../../component/confirmation-statement/ConfirmationStatementTrust.jsx";
import ConfirmationStatementOverview from "../../../component/confirmation-statement/ConfirmationStatementOverview.jsx";
import ConfirmationStatementFeatures from "../../../component/confirmation-statement/ConfirmationStatementFeatures.jsx";
import ConfirmationStatementBenefits from "../../../component/confirmation-statement/ConfirmationStatementBenefits.jsx";
import ConfirmationStatementHowItWorks from "../../../component/confirmation-statement/ConfirmationStatementHowItWorks.jsx";
import ConfirmationStatementWhoIsItFor from "../../../component/confirmation-statement/ConfirmationStatementWhoIsItFor.jsx";
import ConfirmationStatementPricing from "../../../component/confirmation-statement/ConfirmationStatementPricing.jsx";
import ConfirmationStatementFAQ from "../../../component/confirmation-statement/ConfirmationStatementFAQ.jsx";
import ConfirmationStatementCTA from "../../../component/confirmation-statement/ConfirmationStatementCTA.jsx";
import TaxPilotLoader from "../../../component/common/PageLoader.jsx";

const ConfirmationStatement = () => {
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
      <ConfirmationStatementHero />
      <ConfirmationStatementTrust />
      <ConfirmationStatementOverview />
      <ConfirmationStatementFeatures />
      <ConfirmationStatementBenefits />
      <ConfirmationStatementHowItWorks />
      <ConfirmationStatementWhoIsItFor />
      <ConfirmationStatementPricing />
      <ConfirmationStatementFAQ />
      <ConfirmationStatementCTA />
    </>
  );
};

export default ConfirmationStatement;
