import React from "react";

import AnnualAccountsHero from "../../../component/annual-accounts/AnnualAccountsHero.jsx";
import AnnualAccountsTrust from "../../../component/annual-accounts/AnnualAccountsTrust.jsx";
import AnnualAccountsOverview from "../../../component/annual-accounts/AnnualAccountsOverview.jsx";
import AnnualAccountsFeatures from "../../../component/annual-accounts/AnnualAccountsFeatures.jsx";
import AnnualAccountsBenefits from "../../../component/annual-accounts/AnnualAccountsBenefits.jsx";
import AnnualAccountsHowItWorks from "../../../component/annual-accounts/AnnualAccountsHowItWorks.jsx";
import AnnualAccountsWhoIsItFor from "../../../component/annual-accounts/AnnualAccountsWhoIsItFor.jsx";
import AnnualAccountsPricing from "../../../component/annual-accounts/AnnualAccountsPricing.jsx";
import AnnualAccountsFAQ from "../../../component/annual-accounts/AnnualAccountsFAQ.jsx";
import AnnualAccountsCTA from "../../../component/annual-accounts/AnnualAccountsCTA.jsx";

const AnnualAccounts = () => {
  return (
    <>
      <AnnualAccountsHero />
      <AnnualAccountsTrust />
      <AnnualAccountsOverview />
      <AnnualAccountsFeatures />
      <AnnualAccountsBenefits />
      <AnnualAccountsHowItWorks />
      <AnnualAccountsWhoIsItFor />
      <AnnualAccountsPricing />
      <AnnualAccountsFAQ />
      <AnnualAccountsCTA />
    </>
  );
};

export default AnnualAccounts;