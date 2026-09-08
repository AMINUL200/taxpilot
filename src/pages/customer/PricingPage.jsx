import React from 'react'
import PricingHero from '../../component/pricing/PricingHero'
import BillingToggle from '../../component/pricing/BillingToggle'
import PricingPlans from '../../component/pricing/PricingPlans'
import ProductPricing from '../../component/pricing/ProductPricing'
import CompareFeatures from '../../component/pricing/CompareFeatures'
import PricingFAQ from '../../component/pricing/PricingFAQ'
import PricingCTA from '../../component/pricing/PricingCTA'

const PricingPage = () => {
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
  )
}

export default PricingPage
