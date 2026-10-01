import React, { useMemo, useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  FileCheck2,
  FileText,
  Info,
  Save,
  ShieldCheck,
} from "lucide-react";

/* ============================================================
   DEMO COMPANY
============================================================ */

const demoCompany = {
  id: 1,
  companyName: "SKIL FOUR LIMITED",
  companyNumber: "05513948",
  taxReference: "1234567890",
  status: "Active",
  accountingPeriodStart: "01/04/2025",
  accountingPeriodEnd: "31/03/2026",
};

/* ============================================================
   FIELD HELPERS
============================================================ */

const money = (name, label, box, extra = {}) => ({
  name,
  label,
  box,
  type: "number",
  prefix: "£",
  ...extra,
});

const checkbox = (name, label, box, extra = {}) => ({
  name,
  label,
  box,
  type: "checkbox",
  ...extra,
});

const text = (name, label, box, extra = {}) => ({
  name,
  label,
  box,
  type: "text",
  ...extra,
});

const date = (name, label, box, extra = {}) => ({
  name,
  label,
  box,
  type: "date",
  ...extra,
});

/* ============================================================
   CT600 FORM CONFIGURATION (unchanged)
============================================================ */

const ct600Sections = [
  {
    id: "company-information",
    page: 1,
    title: "Company information",
    description: "Basic information about the company and this return.",
    icon: Building2,
    fields: [
      text("companyName", "Company name", "1", { defaultValue: demoCompany.companyName }),
      text("companyRegistrationNumber", "Company registration number", "2", { defaultValue: demoCompany.companyNumber }),
      text("taxReference", "Tax reference", "3", { defaultValue: demoCompany.taxReference }),
      {
        name: "companyType",
        label: "Type of company",
        box: "4",
        type: "select",
        options: ["Limited company", "Public limited company", "Limited liability partnership", "Other"],
        defaultValue: "Limited company",
      },
      checkbox("niTradingActivity", "NI trading activity", "5"),
      checkbox("sme", "SME", "6"),
      checkbox("niEmployer", "NI employer", "7"),
      checkbox("specialCircumstances", "Special circumstances", "8"),
      date("periodStart", "Accounting period — from", "30", { defaultValue: "2025-04-01" }),
      date("periodEnd", "Accounting period — to", "35", { defaultValue: "2026-03-31" }),
      checkbox("repaymentDue", "A repayment is due for this return period", "40"),
      checkbox("claimEarlierPeriod", "Claim or relief affecting an earlier period", "45"),
      checkbox("multipleReturns", "Making more than one return for this company now", "50"),
      checkbox("estimatedFigures", "This return contains estimated figures", "55"),
      checkbox("largeGroup", "Company part of a group that is not small", "60"),
      checkbox("disclosableAvoidance", "Notice of disclosable avoidance schemes", "65"),
      checkbox("compensatingAdjustment", "Compensating adjustment claimed", "70"),
      checkbox("smeExemption", "Company qualifies for SME exemption", "75"),
    ],
  },
  {
    id: "accounts-supplementary",
    page: 2,
    title: "Accounts and supplementary pages",
    description: "Tell us which accounts and supplementary pages are included.",
    icon: FileText,
    fields: [
      checkbox("attachAccounts", "I attach accounts and computations for the period to which this return relates", "80"),
      checkbox("attachDifferentPeriod", "I attach accounts and computations for a different period", "85"),
      text("accountsExplanation", "If you are not attaching the accounts and computations, explain why", "90", { multiline: true }),
      checkbox("ct600a", "Loans and arrangements to participators by close companies — CT600A", "95"),
      checkbox("ct600b", "Controlled foreign companies, foreign permanent establishment exemptions, hybrid and other mismatches — CT600B", "100"),
      checkbox("ct600c", "Group and consortium — CT600C", "105"),
      checkbox("ct600d", "Insurance — CT600D", "110"),
      checkbox("ct600e", "Charities and Community Amateur Sports Clubs — CT600E", "115"),
      checkbox("ct600f", "Tonnage tax — CT600F", "120"),
      checkbox("ct600g", "Northern Ireland — CT600G", "125"),
      checkbox("ct600h", "Cross-border royalties — CT600H", "130"),
      checkbox("ct600i", "Supplementary charge in respect of ring fence trades — CT600I", "135"),
      checkbox("ct600j", "Disclosure of Tax Avoidance Schemes — CT600J", "140"),
      checkbox("ct600k", "Restitution tax — CT600K", "141"),
      checkbox("ct600l", "Research and Development — CT600L", "142"),
      checkbox("ct600m", "Freeports and Investment Zones — CT600M", "143"),
      checkbox("ct600n", "Residential Property Developer Tax — CT600N", "144"),
      checkbox("ct600p", "Creative industries — CT600P", "96"),
      money("turnover", "Total turnover from trade", "145"),
      checkbox("financialConcern", "Banks, building societies, insurance companies and other financial concerns", "150"),
      money("tradingProfits", "Trading profits", "155"),
      money("tradingLossesBroughtForward", "Trading losses brought forward set against trading profits", "160"),
      money("netTradingProfits", "Net trading profits", "165", { calculated: true }),
      money("nonTradingInterest", "Bank, building society or other interest, and profits from non-trading loan relationships", "170"),
      checkbox("laterPeriodDeficit", "Figure in box 170 is net of carrying back a deficit from a later accounting period", "172"),
    ],
  },
  {
    id: "income-gains-reliefs",
    page: 3,
    title: "Income, chargeable gains and deductions",
    description: "Enter income, chargeable gains, profits and applicable deductions.",
    icon: FileText,
    fields: [
      money("annualPayments", "Annual payments not otherwise charged to Corporation Tax and from which Income Tax has not been deducted", "175"),
      money("nonExemptDividends", "Non-exempt dividends or distributions from non-UK resident companies", "180"),
      money("incomeTaxDeducted", "Income from which Income Tax has been deducted", "185"),
      money("propertyBusinessIncome", "Income from a property business", "190"),
      money("nonTradingIntangibleGains", "Non-trading gains on intangible fixed assets", "195"),
      money("tonnageTaxProfits", "Tonnage tax profits", "200"),
      money("otherIncome", "Income not falling under any other heading", "205"),
      money("grossChargeableGains", "Gross chargeable gains", "210"),
      money("allowableLosses", "Allowable losses including losses brought forward", "215"),
      money("netChargeableGains", "Net chargeable gains", "220", { calculated: true }),
      money("lossesAgainstInvestmentIncome", "Losses brought forward against certain investment income", "225"),
      money("nonTradeDeficitsBroughtForward", "Non-trade deficits on loan relationships and derivative contracts brought forward set against non-trading profits", "230"),
      money("profitsBeforeReliefs", "Profits before other deductions and reliefs", "235", { calculated: true }),
      money("unquotedShareLosses", "Losses on unquoted shares", "240"),
      money("managementExpenses", "Management expenses", "245"),
      money("ukPropertyLosses", "UK property business losses for this or previous accounting period", "250"),
      money("managementCapitalAllowances", "Capital allowances for the purposes of management of the business", "255"),
      money("nonTradeDeficitsCurrent", "Non-trade deficits for this accounting period from loan relationships and derivative contracts", "260"),
    ],
  },
  {
    id: "deductions-tax-calculation",
    page: 4,
    title: "Deductions, reliefs and tax calculation",
    description: "Complete deductions, qualifying donations, group relief and tax rate information.",
    icon: FileCheck2,
    fields: [
      money("carriedForwardNonTradeDeficits", "Carried forward non-trade deficits from loan relationships and derivative contracts", "263"),
      money("nonTradingIntangibleLosses", "Non-trading losses on intangible fixed assets", "265"),
      money("totalTradingLosses", "Total trading losses of this or a later accounting period", "275"),
      checkbox("lossesCarriedBack", "Amounts carried back from later accounting periods are included in box 275", "280"),
      money("tradingLossesCarriedForward", "Trading losses carried forward and claimed against total profits", "285"),
      money("nonTradeCapitalAllowances", "Non-trade capital allowances", "290"),
      money("totalDeductions", "Total of deductions and reliefs", "295", { calculated: true }),
      money("profitsBeforeDonations", "Profits before qualifying donations and group relief", "300", { calculated: true }),
      money("qualifyingDonations", "Qualifying donations", "305"),
      money("groupRelief", "Group relief", "310"),
      money("groupReliefCarriedForward", "Group relief for carried forward losses", "312"),
      money("profitsChargeable", "Profits chargeable to Corporation Tax", "315", { calculated: true }),
      money("ringFenceProfits", "Ring fence profits included", "320"),
      money("northernIrelandProfits", "Northern Ireland profits included", "325"),
      money("associatedCompaniesPeriod", "Number of associated companies in this period", "326"),
      money("associatedCompaniesYear1", "Number of associated companies in the first financial year", "327"),
      money("associatedCompaniesYear2", "Number of associated companies in the second financial year", "328"),
      checkbox("smallProfitRate", "Company is chargeable at the small profit rate or is entitled to marginal relief", "329"),
    ],
    taxRows: [
      { id: 1, financialYear: "2025", profitBox: "335", rateBox: "340", taxBox: "345" },
      { id: 2, financialYear: "2025", profitBox: "350", rateBox: "355", taxBox: "360" },
      { id: 3, financialYear: "2025", profitBox: "365", rateBox: "370", taxBox: "375" },
      { id: 4, financialYear: "2025", profitBox: "380", rateBox: "385", taxBox: "390" },
      { id: 5, financialYear: "2025", profitBox: "400", rateBox: "405", taxBox: "410" },
      { id: 6, financialYear: "2025", profitBox: "415", rateBox: "420", taxBox: "425" },
    ],
  },
  {
    id: "tax-reliefs",
    page: 5,
    title: "Tax calculation and reliefs",
    description: "Complete Corporation Tax, reliefs, deductions and tax outstanding calculations.",
    icon: FileCheck2,
    fields: [
      money("corporationTax", "Corporation Tax", "430"),
      money("marginalRelief", "Marginal relief", "435"),
      money("corporationTaxChargeable", "Corporation Tax chargeable", "440", { calculated: true }),
      money("communityInvestmentTaxRelief", "Community Investment Tax Relief", "445"),
      money("doubleTaxationRelief", "Double Taxation Relief", "450"),
      checkbox("underlyingRateRelief", "Box 450 includes an underlying rate relief claim", "455"),
      checkbox("reliefCarriedBack", "Box 450 includes an amount carried back from a later period", "460"),
      money("advanceCorporationTax", "Advance Corporation Tax", "465"),
      money("totalTaxReliefs", "Total reliefs and deductions in terms of tax", "470", { calculated: true }),
      money("cjrsReceived", "Coronavirus Job Retention Scheme received", "471"),
      money("cjrsEntitlement", "CJRS entitlement", "472"),
      money("cjrsOverpaymentAssessed", "CJRS overpayment already assessed or voluntarily disclosed", "473"),
      money("otherCoronavirusOverpayments", "Other coronavirus overpayments", "474"),
      money("netCorporationTaxLiability", "Net Corporation Tax liability", "475", { calculated: true }),
      money("loansParticipatorsTax", "Tax payable on loans and arrangements to participators", "480"),
      checkbox("ct600aCompleted", "Completed box A70 in supplementary pages CT600A", "485"),
      money("cfcTax", "Controlled Foreign Companies tax payable", "490"),
      money("bankLevy", "Bank levy payable", "495"),
      money("bankSurcharge", "Bank surcharge payable", "496"),
      money("rpdtPayable", "Residential Property Developer Tax payable", "497"),
      money("eogpl", "Energy (Oil and Gas) Profits Levy amounts liable", "986"),
      money("egl", "Electricity Generator Levy exceptional generation receipts", "987"),
    ],
  },
  {
    id: "tax-outstanding",
    page: 6,
    title: "Tax outstanding or overpaid",
    description: "Complete the calculation of tax payable and tax reconciliation.",
    icon: FileCheck2,
    fields: [
      money("cfcBankRpdtTotal", "CFC tax, bank levy, bank surcharge and RPDT payable", "500"),
      money("eogplPayable", "EOGPL payable", "501"),
      money("eglPayable", "EGL payable", "502"),
      money("supplementaryCharge", "Supplementary charge payable", "505"),
      money("taxChargeable", "Tax chargeable", "510", { calculated: true }),
      money("incomeTaxDeductedFromProfits", "Income Tax deducted from gross income included in profits", "515"),
      money("incomeTaxRepayable", "Income Tax repayable to the company", "520"),
      money("selfAssessmentBeforeRestitution", "Self-assessment of tax payable before restitution tax and coronavirus support scheme overpayments", "525", { calculated: true }),
      money("coronavirusOverpaymentDue", "Coronavirus support schemes overpayment now due", "526"),
      money("restitutionTax", "Restitution tax", "527"),
      money("selfAssessmentTaxPayable", "Self-assessment of tax payable", "528", { calculated: true }),
      money("rdCredit", "Research and Development credit", "530"),
      money("notCurrentlyUsed", "Not currently used", "535"),
      money("creativesTaxCredit", "Creatives tax credit", "540"),
      money("avecVgec", "Audio-Visual expenditure credit and Video Games expenditure credit", "541"),
      money("totalRDCreativesCredit", "Total R&D credit, creatives tax credit and AVEC/VGEC", "545", { calculated: true }),
      money("landRemediationCredit", "Land remediation tax credit", "550"),
      money("lifeAssuranceCredit", "Life assurance company tax credit", "555"),
      money("totalLandLifeCredit", "Total land remediation and life assurance company tax credit", "560", { calculated: true }),
      money("capitalAllowancesFirstYearCredit", "Capital allowances first-year tax credit", "565"),
      money("surplusRDCredits", "Surplus R&D credits and creatives tax credit payable", "570"),
    ],
  },
  {
    id: "tax-reconciliation",
    page: 7,
    title: "Tax reconciliation and indicators",
    description: "Complete tax credits, tax already paid, exporter information and indicators.",
    icon: FileCheck2,
    fields: [
      money("landLifeCreditPayable", "Land remediation or life assurance company tax credit payable", "575"),
      money("capitalAllowanceCreditPayable", "Capital allowances first-year tax credit payable", "580"),
      money("ringFenceCorporationTax", "Ring fence Corporation Tax included", "585"),
      money("niCorporationTax", "NI Corporation Tax included", "586"),
      money("ringFenceSupplementaryCharge", "Ring fence supplementary charge included", "590"),
      money("taxAlreadyPaid", "Tax already paid and not already repaid", "595"),
      money("taxOutstanding", "Tax outstanding", "600", { calculated: true }),
      money("taxOverpaid", "Tax overpaid including surplus or payable credits", "605", { calculated: true }),
      money("groupTaxRefunds", "Group tax refunds surrendered to this company", "610"),
      money("avecVgecSurrendered", "Audio-Visual expenditure credit and Video Games expenditure credit surrendered to this company", "614"),
      money("rdCreditsSurrendered", "Research and Development expenditure credits surrendered to this company", "615"),
      money("frankedInvestmentIncome", "Franked investment income / Exempt ABGH distributions", "620"),
      money("groupCompanies51Percent", "Number of 51% group companies", "625"),
      checkbox("largeCompanyInstalments", "Should have made instalment payments as a large company", "630"),
      checkbox("veryLargeCompanyInstalments", "Should have made instalment payments as a very large company", "631"),
      checkbox("groupPaymentsArrangement", "Is within a group payments arrangement for the period", "635"),
      checkbox("intangibleAssets", "Has written down or sold intangible assets", "640"),
      checkbox("crossBorderRoyalties", "Has made cross-border royalty payments", "645"),
      money("eatOutDiscounts", "Eat Out to Help Out Scheme: reimbursed discounts included as taxable income", "647"),
      {
        name: "exports",
        label: "During the return period, did the company export goods and/or services outside the UK?",
        type: "radio",
        options: [
          { value: "goods", label: "Yes — goods", box: "616" },
          { value: "services", label: "Yes — services", box: "617" },
          { value: "neither", label: "No — neither", box: "618" },
        ],
      },
    ],
  },
  {
    id: "rd-capital-allowances",
    page: 8,
    title: "Enhanced expenditure and capital allowances",
    description: "R&D, creatives expenditure and capital allowance information.",
    icon: FileText,
    fields: [
      checkbox("rdSmeClaim", "R&D claim made by an SME / SME subcontractor / creatives claim", "650"),
      checkbox("rdIntensiveSme", "Claim is made by an R&D intensive SME", "653"),
      checkbox("rdLargeCompany", "Claim is made by a large company", "655"),
      checkbox("rdNotificationSubmitted", "R&D claim notification form has been submitted", "656"),
      checkbox("rdAdditionalInformationSubmitted", "R&D additional information form has been submitted", "657"),
      checkbox("creativesAdditionalInformation", "Creatives additional information form has been submitted", "658"),
      money("rdQualifyingExpenditure", "R&D expenditure qualifying for SME / R&D intensive SME relief", "659"),
      money("rdEnhancedExpenditure", "R&D enhanced expenditure", "660"),
      money("creativesCoreExpenditure", "Creatives core expenditure", "663"),
      money("creativesAdditionalDeduction", "Creatives additional deduction", "665"),
      money("rdCreativesEnhancedTotal", "R&D enhanced expenditure and creatives additional deduction", "670", { calculated: true }),
      money("rdSubcontractedLargeCompany", "R&D enhanced expenditure of an SME on work subcontracted to it by a large company", "675"),
      money("vaccineResearch", "Vaccine research expenditure", "680"),
      money("landRemediationEnhanced", "Total enhanced expenditure", "685"),
      money("annualInvestmentAllowance", "Annual investment allowance", "690"),
      money("fullExpensing", "Full expensing", "688"),
      money("fullExpensingBalancing", "Full expensing — balancing charges", "689"),
      money("superDeduction", "Machinery and plant — super-deduction", "691"),
      money("superDeductionBalancing", "Super-deduction — balancing charges", "692"),
      money("specialRateAllowance", "Machinery and plant — special rate allowance", "693"),
      money("specialRateBalancing", "Special rate allowance — balancing charges", "694"),
      money("specialRatePool", "Machinery and plant — special rate pool", "695"),
      money("specialRatePoolBalancing", "Special rate pool — balancing charges", "700"),
      money("mainPool", "Machinery and plant — main pool", "705"),
      money("mainPoolBalancing", "Machinery and plant — main pool balancing charges", "710"),
      money("structuresBuildings", "Structures and buildings", "711"),
      money("businessPremisesRenovation", "Business premises renovation", "715"),
      money("businessPremisesBalancing", "Business premises renovation — balancing charges", "720"),
      money("otherAllowances", "Other allowances and charges", "725"),
      money("otherAllowancesBalancing", "Other allowances and charges — balancing charges", "730"),
    ],
  },
  {
    id: "capital-allowances-continued",
    page: 9,
    title: "Capital allowances — continued",
    description: "Additional capital allowances, balancing charges and disposal values.",
    icon: FileText,
    fields: [
      money("electricVehicleChargePoints", "Electric vehicle charge-points — capital allowances", "713"),
      money("electricVehicleChargePointsDisposal", "Electric vehicle charge-points — disposal value", "714"),
      money("enterpriseZones", "Enterprise zones — capital allowances", "721"),
      money("enterpriseZonesDisposal", "Enterprise zones — disposal value", "722"),
      money("zeroEmissionGoodsVehicles", "Zero-emission goods vehicles — capital allowances", "723"),
      money("zeroEmissionGoodsVehiclesDisposal", "Zero-emission goods vehicles — disposal value", "724"),
      money("zeroEmissionCars", "Zero-emission cars — capital allowances", "726"),
      money("zeroEmissionCarsDisposal", "Zero-emission cars — disposal value", "727"),
      money("annualInvestmentAllowanceOutsideTrading", "Annual investment allowance", "735"),
      money("structuresBuildingsOutsideTrading", "Structures and buildings", "736"),
      money("fullExpensingOutsideTrading", "Full expensing", "733"),
      money("fullExpensingOutsideTradingBalancing", "Full expensing — balancing charges", "734"),
      money("businessPremisesOutsideTrading", "Business premises renovation", "740"),
      money("businessPremisesOutsideTradingDisposal", "Business premises renovation — balancing charges", "745"),
      money("superDeductionOutsideTrading", "Machinery and plant — super-deduction", "741"),
      money("superDeductionOutsideTradingBalancing", "Super-deduction — balancing charges", "742"),
      money("specialRateOutsideTrading", "Machinery and plant — special rate allowance", "743"),
      money("specialRateOutsideTradingBalancing", "Special rate allowance — balancing charges", "744"),
      money("otherOutsideTrading", "Other allowances and charges", "750"),
      money("otherOutsideTradingBalancing", "Other allowances and charges — balancing charges", "755"),
      money("electricVehicleOutsideTrading", "Electric vehicle charge-points", "737"),
      money("electricVehicleOutsideTradingDisposal", "Electric vehicle charge-points — disposal value", "738"),
      money("enterpriseZonesOutsideTrading", "Enterprise zones", "746"),
      money("enterpriseZonesOutsideTradingDisposal", "Enterprise zones — disposal value", "747"),
      money("zeroEmissionGoodsOutsideTrading", "Zero-emission goods vehicles", "748"),
      money("zeroEmissionGoodsOutsideTradingDisposal", "Zero-emission goods vehicles — disposal value", "749"),
      money("zeroEmissionCarsOutsideTrading", "Zero-emission cars", "751"),
      money("zeroEmissionCarsOutsideTradingDisposal", "Zero-emission cars — disposal value", "752"),
    ],
  },
  {
    id: "losses",
    page: 10,
    title: "Losses, deficits and excess amounts",
    description: "Enter losses, qualifying expenditure and amounts available for group relief.",
    icon: FileText,
    fields: [
      money("firstYearMachinery", "Machinery and plant on which first year allowance is claimed", "760"),
      money("environmentallyFriendlyMachinery", "Designated environmentally friendly machinery and plant", "765"),
      money("longLifeAssets", "Machinery and plant on long-life assets and integral features", "770"),
      money("structuresBuildingsQualifying", "Structures and buildings", "771"),
      money("superDeductionQualifying", "Machinery and plant — super-deduction", "772"),
      money("specialRateQualifying", "Machinery and plant — special rate allowance", "773"),
      money("otherMachinery", "Other machinery and plant", "775"),
      money("ukTradeLosses", "Losses of trades carried on wholly or partly in the UK", "780"),
      money("ukTradeLossesGroupRelief", "Maximum available for surrender as group relief", "785"),
      money("overseasTradeLosses", "Losses of trades carried on wholly outside the UK", "790"),
      money("nonTradeLoanDeficits", "Non-trade deficits on loan relationships and derivative contracts", "795"),
      money("nonTradeLoanDeficitsGroupRelief", "Maximum available for surrender as group relief", "800"),
      money("ukPropertyBusinessLosses", "UK property business losses", "805"),
      money("ukPropertyBusinessLossesGroupRelief", "Maximum available for surrender as group relief", "810"),
      money("overseasPropertyLosses", "Overseas property business losses", "815"),
      money("miscellaneousTransactionLosses", "Losses from miscellaneous transactions", "820"),
      money("capitalLosses", "Capital losses", "825"),
      money("intangibleLosses", "Non-trading losses on intangible fixed assets", "830"),
      money("intangibleLossesGroupRelief", "Maximum available for surrender as group relief", "835"),
      money("nonTradeCapitalAllowances", "Non-trade capital allowances", "840"),
      money("qualifyingDonationsExcess", "Qualifying donations", "845"),
      money("managementExpensesExcess", "Management expenses", "850"),
      money("managementExpensesGroupRelief", "Maximum available for surrender as group relief", "855"),
    ],
  },
  {
    id: "repayments",
    page: 11,
    title: "Overpayments and repayments",
    description: "Provide repayment information where applicable.",
    icon: FileCheck2,
    fields: [
      money("smallRepaymentThreshold", "Do not repay sums of this amount or less", "860"),
      money("repaymentCorporationTax", "Repayment of Corporation Tax", "865"),
      money("repaymentIncomeTax", "Repayment of Income Tax", "870"),
      money("payableRDCredit", "Payable Research and Development tax credit", "875"),
      money("payableRDExpenditureCredit", "Payable Research and Development expenditure credit", "880"),
      money("payableCreativesCredit", "Payable creatives tax credit", "885"),
      money("payableAvecVgec", "Payable Audio-Visual expenditure credit and Video Games expenditure credit", "886"),
      money("payableLandRemediation", "Payable land remediation or life assurance company tax credit", "890"),
      money("payableCapitalAllowanceCredit", "Payable capital allowances first-year tax credit", "895"),
      money("groupRefundSurrender", "Amount to be surrendered", "900"),
      checkbox("jointNoticeAttached", "The joint Notice is attached", "905"),
      checkbox("jointNoticeWillFollow", "The joint Notice will follow", "910"),
      money("stopRepaymentAmount", "Please stop repayment of the following amount until we send you the Notice", "915"),
      money("niTradingLossesMainstream", "Group relief claimed relating to NI trading losses used against rest of UK/mainstream profits", "856"),
      money("niTradingLossesNI", "Group relief claimed relating to NI trading losses used against NI trading profits", "857"),
      money("mainstreamLossesNI", "Group relief claimed relating to rest of UK/mainstream losses used against NI trading profits", "858"),
    ],
  },
  {
    id: "bank-declaration",
    page: 12,
    title: "Bank details and declaration",
    description: "Enter repayment bank details and complete the company declaration.",
    icon: ShieldCheck,
    fields: [
      text("bankName", "Name of bank or building society", "920"),
      text("sortCode", "Branch sort code", "925"),
      text("accountNumber", "Account number", "930"),
      text("accountName", "Name of account", "935"),
      text("buildingSocietyReference", "Building society reference", "940"),
      checkbox("repaymentToOtherPerson", "R&D payable credit and one of the applicable conditions applies", "943"),
      text("authorityStatus", "Status of person authorising repayment", "945"),
      text("authorityCompanyName", "Company name", "950"),
      text("authorisedPerson", "Name of person authorised to receive payment", "955"),
      text("authorisedAddress", "Address", "960", { multiline: true }),
      text("nomineeReference", "Nominee reference", "965"),
      text("recipientName", "Name", "970"),
      text("declarationName", "Declaration — Name", "975"),
      date("declarationDate", "Declaration — Date", "980"),
      text("declarationStatus", "Declaration — Status", "985"),
    ],
  },
];

/* ============================================================
   MAIN COMPONENT
============================================================ */

const OrganizationCorporationTaxCT600Page = () => {
  const navigate = useNavigate();
  const { companyNumber } = useParams();
  const shouldReduceMotion = useReducedMotion();
  const premiumEase = [0.22, 1, 0.36, 1];

  const [formData, setFormData] = useState(() => {
    const initial = {};
    ct600Sections.forEach((section) => {
      section.fields?.forEach((field) => {
        if (field.type === "checkbox") {
          initial[field.name] = false;
        } else if (field.type === "radio") {
          initial[field.name] = "";
        } else {
          initial[field.name] = field.defaultValue || "";
        }
      });
    });
    return initial;
  });

  const [saved, setSaved] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState(ct600Sections[0].id);

  const sectionRefs = useRef({});
  const isScrollingRef = useRef(false);

  const company = {
    ...demoCompany,
    companyNumber: companyNumber || demoCompany.companyNumber,
  };

  /* ============================================================
     HANDLE CHANGE
  ============================================================ */

  const handleChange = (name, value) => {
    setSaved(false);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* ============================================================
     CALCULATIONS (unchanged)
  ============================================================ */

  const calculatedValues = useMemo(() => {
    const num = (name) => Number(formData[name] || 0);

    const netTradingProfits = num("tradingProfits") - num("tradingLossesBroughtForward");
    const netChargeableGains = num("grossChargeableGains") - num("allowableLosses");

    const profitsBeforeReliefs =
      netTradingProfits +
      num("nonTradingInterest") +
      num("annualPayments") +
      num("nonExemptDividends") +
      num("incomeTaxDeducted") +
      num("propertyBusinessIncome") +
      num("nonTradingIntangibleGains") +
      num("tonnageTaxProfits") +
      num("otherIncome") +
      netChargeableGains -
      num("lossesAgainstInvestmentIncome") -
      num("nonTradeDeficitsBroughtForward");

    const totalDeductions =
      num("unquotedShareLosses") +
      num("managementExpenses") +
      num("ukPropertyLosses") +
      num("managementCapitalAllowances") +
      num("nonTradeDeficitsCurrent") +
      num("carriedForwardNonTradeDeficits") +
      num("nonTradingIntangibleLosses") +
      num("totalTradingLosses") +
      num("tradingLossesCarriedForward") +
      num("nonTradeCapitalAllowances");

    const profitsBeforeDonations = Math.max(0, profitsBeforeReliefs - totalDeductions);

    const profitsChargeable = Math.max(
      0,
      profitsBeforeDonations -
        num("qualifyingDonations") -
        num("groupRelief") -
        num("groupReliefCarriedForward")
    );

    const corporationTaxChargeable = num("corporationTax") - num("marginalRelief");

    const totalTaxReliefs =
      num("communityInvestmentTaxRelief") +
      num("doubleTaxationRelief") +
      num("advanceCorporationTax");

    const netCorporationTaxLiability = corporationTaxChargeable - totalTaxReliefs;

    const taxChargeable =
      netCorporationTaxLiability +
      num("loansParticipatorsTax") +
      num("cfcBankLevyTotal") +
      num("eogplPayable") +
      num("eglPayable") +
      num("supplementaryCharge");

    const selfAssessmentBeforeRestitution =
      taxChargeable - num("incomeTaxDeductedFromProfits");

    const selfAssessmentTaxPayable =
      selfAssessmentBeforeRestitution +
      num("coronavirusOverpaymentDue") +
      num("restitutionTax");

    const totalRDCreativesCredit =
      num("rdCredit") + num("creativesTaxCredit") + num("avecVgec");

    const totalLandLifeCredit =
      num("landRemediationCredit") + num("lifeAssuranceCredit");

    const taxOutstanding =
      selfAssessmentBeforeRestitution -
      totalRDCreativesCredit -
      totalLandLifeCredit -
      num("capitalAllowancesFirstYearCredit") -
      num("taxAlreadyPaid");

    const taxOverpaid =
      totalRDCreativesCredit +
      totalLandLifeCredit +
      num("capitalAllowancesFirstYearCredit") +
      num("taxAlreadyPaid") -
      selfAssessmentBeforeRestitution;

    const rdCreativesEnhancedTotal =
      num("rdEnhancedExpenditure") + num("creativesAdditionalDeduction");

    return {
      netTradingProfits,
      netChargeableGains,
      profitsBeforeReliefs,
      totalDeductions,
      profitsBeforeDonations,
      profitsChargeable,
      corporationTaxChargeable,
      totalTaxReliefs,
      netCorporationTaxLiability,
      taxChargeable,
      selfAssessmentBeforeRestitution,
      selfAssessmentTaxPayable,
      totalRDCreativesCredit,
      totalLandLifeCredit,
      taxOutstanding,
      taxOverpaid,
      rdCreativesEnhancedTotal,
    };
  }, [formData]);

  const getValue = (field) => {
    if (!field.calculated) return formData[field.name];
    return calculatedValues[field.name];
  };

  /* ============================================================
     SAVE
  ============================================================ */

  const handleSave = () => {
    console.log("CT600 FORM DATA:", formData);
    console.log("CALCULATED VALUES:", calculatedValues);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  /* ============================================================
     SCROLL TO SECTION
  ============================================================ */

  const scrollToSection = (sectionId) => {
    const el = sectionRefs.current[sectionId];
    if (!el) return;

    isScrollingRef.current = true;
    setActiveSectionId(sectionId);

    const headerOffset = 130;
    const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;

    window.scrollTo({ top, behavior: "smooth" });

    setTimeout(() => {
      isScrollingRef.current = false;
    }, 700);
  };

  /* ============================================================
     OBSERVER (unchanged)
  ============================================================ */

  useEffect(() => {
    const handleScroll = () => {
      if (isScrollingRef.current) return;

      const headerOffset = 160;
      let currentId = ct600Sections[0].id;

      for (const section of ct600Sections) {
        const el = sectionRefs.current[section.id];
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        if (rect.top - headerOffset <= 0) {
          currentId = section.id;
        }
      }

      setActiveSectionId(currentId);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeIndex = ct600Sections.findIndex((s) => s.id === activeSectionId);

  /* ============================================================
     ANIMATION VARIANTS
  ============================================================ */

  const sectionVariants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: premiumEase },
    },
  };

  const fieldVariants = {
    hidden: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: premiumEase },
    },
  };

  /* ============================================================
     RENDER
  ============================================================ */

  return (
    <div className="min-h-screen bg-background-soft">
      {/* ======================================================
          TOP HEADER
      ====================================================== */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: premiumEase }}
        className="sticky top-0 z-40 border-b border-border bg-background"
      >
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-5 py-3 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <motion.button
              type="button"
              onClick={() => navigate("/organization/products/corporation-tax")}
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : { scale: 1.05, transition: { duration: 0.15 } }
              }
              whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-lg
                border
                border-border
                bg-background
                text-text-secondary
                transition-colors
                hover:border-primary
                hover:text-primary
              "
            >
              <ArrowLeft className="h-4 w-4" />
            </motion.button>

            <div className="hidden h-8 w-px bg-border sm:block" />

            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-light">
                <FileText className="h-4 w-4 text-primary" />
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-heading">
                  Corporation Tax — CT600
                </p>
                <p className="truncate text-[10px] text-text-secondary">
                  {company.companyName} · #{company.companyNumber}
                </p>
              </div>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <AnimatePresence>
              {saved && (
                <motion.span
                  initial={
                    shouldReduceMotion
                      ? false
                      : { opacity: 0, x: 8, scale: 0.9 }
                  }
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={
                    shouldReduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, x: 8, scale: 0.9 }
                  }
                  transition={{ duration: 0.25, ease: premiumEase }}
                  className="
                    hidden
                    items-center
                    gap-1.5
                    rounded-lg
                    bg-primary-light
                    px-3
                    py-2
                    text-[11px]
                    font-semibold
                    text-primary
                    sm:flex
                  "
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Saved
                </motion.span>
              )}
            </AnimatePresence>

            <motion.button
              type="button"
              onClick={handleSave}
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : { y: -1, transition: { duration: 0.2 } }
              }
              whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
              className="
                inline-flex
                items-center
                gap-2
                rounded-lg
                border
                border-border
                bg-background
                px-3.5
                py-2
                text-xs
                font-semibold
                text-heading
                transition-colors
                hover:border-primary
                hover:text-primary
              "
            >
              <Save className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Save draft</span>
            </motion.button>

            <motion.button
              type="button"
              onClick={() => console.log("Review CT600", formData)}
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : { y: -1, transition: { duration: 0.2 } }
              }
              whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
              className="
                inline-flex
                items-center
                gap-2
                rounded-lg
                bg-primary
                px-3.5
                py-2
                text-xs
                font-bold
                text-text-white
                shadow-button
                transition-colors
                hover:bg-primary-hover
              "
            >
              Review
              <ArrowRight className="h-3.5 w-3.5" />
            </motion.button>
          </div>
        </div>

        {/* PROGRESS BAR */}
        <div className="mx-auto max-w-[1500px] px-5 pb-3 lg:px-8">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">
              Filing progress
            </span>
            <span className="text-[10px] font-bold text-primary">
              Section {activeIndex + 1} / {ct600Sections.length}
            </span>
          </div>

          <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-primary-light">
            <motion.div
              className="h-full rounded-full bg-primary"
              initial={false}
              animate={{
                width: `${((activeIndex + 1) / ct600Sections.length) * 100}%`,
              }}
              transition={{ duration: 0.4, ease: premiumEase }}
            />
          </div>
        </div>
      </motion.div>

      {/* ======================================================
          MAIN LAYOUT
      ====================================================== */}
      <div className="mx-auto max-w-[1500px] px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[290px_minmax(0,1fr)]">
          {/* ==================================================
              LEFT SIDEBAR
          ================================================== */}
          <aside className="lg:sticky lg:top-[135px] lg:h-[calc(100vh-160px)]">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: premiumEase }}
              className="
                flex
                h-full
                flex-col
                rounded-2xl
                border
                border-border
                bg-background
                shadow-card
              "
            >
              <div className="border-b border-border px-4 py-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-text-secondary">
                  CT600 Return
                </p>
                <p className="mt-1 text-sm font-bold text-heading">
                  Form sections
                </p>
                <p className="mt-1 text-[10px] text-text-secondary">
                  Click a section to jump to it
                </p>
              </div>

              <div className="flex-1 overflow-y-auto p-2">
                {ct600Sections.map((item, index) => {
                  const Icon = item.icon;
                  const active = item.id === activeSectionId;

                  return (
                    <motion.button
                      key={item.id}
                      type="button"
                      onClick={() => scrollToSection(item.id)}
                      initial={
                        shouldReduceMotion
                          ? false
                          : { opacity: 0, x: -8 }
                      }
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.35,
                        ease: premiumEase,
                        delay: shouldReduceMotion ? 0 : index * 0.025,
                      }}
                      whileHover={
                        shouldReduceMotion
                          ? undefined
                          : { x: 2, transition: { duration: 0.2 } }
                      }
                      whileTap={
                        shouldReduceMotion ? undefined : { scale: 0.98 }
                      }
                      className={`
                        mb-1
                        flex
                        w-full
                        items-center
                        gap-3
                        rounded-xl
                        px-3
                        py-2.5
                        text-left
                        transition-colors
                        ${
                          active
                            ? "bg-primary text-text-white shadow-button"
                            : "text-text-secondary hover:bg-primary-light hover:text-primary"
                        }
                      `}
                    >
                      <span
                        className={`
                          flex
                          h-7
                          w-7
                          shrink-0
                          items-center
                          justify-center
                          rounded-lg
                          ${active ? "bg-text-white/15" : "bg-background-soft"}
                        `}
                      >
                        <Icon className="h-3.5 w-3.5" />
                      </span>

                      <span className="min-w-0 flex-1">
                        <span
                          className={`
                            block
                            text-[11px]
                            font-bold
                            ${active ? "text-text-white" : "text-heading"}
                          `}
                        >
                          {item.title}
                        </span>
                        <span
                          className={`
                            mt-0.5
                            block
                            text-[9px]
                            ${
                              active
                                ? "text-text-white/70"
                                : "text-text-secondary"
                            }
                          `}
                        >
                          Page {item.page}
                        </span>
                      </span>

                      {active && (
                        <ChevronRight className="h-3.5 w-3.5 shrink-0" />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              <div className="border-t border-border p-3">
                <motion.button
                  type="button"
                  onClick={() =>
                    scrollToSection(ct600Sections[ct600Sections.length - 1].id)
                  }
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : { y: -1, transition: { duration: 0.2 } }
                  }
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                  className="
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-lg
                    bg-primary
                    px-3
                    py-2.5
                    text-[11px]
                    font-bold
                    text-text-white
                    shadow-button
                    transition-colors
                    hover:bg-primary-hover
                  "
                >
                  Jump to declaration
                  <ArrowRight className="h-3 w-3" />
                </motion.button>
              </div>
            </motion.div>
          </aside>

          {/* ==================================================
              CONTENT
          ================================================== */}
          <main className="min-w-0 space-y-6">
            {/* Info banner */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: premiumEase }}
              className="rounded-xl border border-border bg-primary-light p-4"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-background">
                  <Info className="h-4 w-4 text-primary" />
                </div>

                <div>
                  <p className="text-xs font-bold text-heading">
                    Single-page CT600 form
                  </p>
                  <p className="mt-1 text-[11px] leading-5 text-text-secondary">
                    All 12 sections are shown on one page. Use the sidebar
                    navigation to jump between sections. Your progress scrolls
                    with you.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* All sections */}
            {ct600Sections.map((section, index) => {
              const SectionIcon = section.icon;

              return (
                <motion.section
                  key={section.id}
                  id={section.id}
                  ref={(el) => {
                    sectionRefs.current[section.id] = el;
                  }}
                  variants={sectionVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  className="
                    overflow-hidden
                    rounded-2xl
                    border
                    border-border
                    bg-background
                    shadow-card
                    scroll-mt-[140px]
                  "
                >
                  {/* Section header */}
                  <div className="border-b border-border bg-gradient-to-r from-primary-light to-background px-5 py-4 sm:px-6">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <motion.div
                          initial={
                            shouldReduceMotion
                              ? false
                              : { opacity: 0, scale: 0.6, rotate: -12 }
                          }
                          whileInView={{
                            opacity: 1,
                            scale: 1,
                            rotate: 0,
                          }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.5,
                            ease: [0.34, 1.56, 0.64, 1],
                          }}
                          className="
                            flex
                            h-10
                            w-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            bg-primary
                            text-text-white
                          "
                        >
                          <SectionIcon className="h-5 w-5" />
                        </motion.div>

                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h2 className="text-sm font-bold text-heading">
                              {section.title}
                            </h2>
                            <span
                              className="
                                rounded-full
                                bg-background
                                px-2
                                py-0.5
                                text-[9px]
                                font-semibold
                                text-text-secondary
                                ring-1
                                ring-border
                              "
                            >
                              Page {section.page} of 12
                            </span>
                          </div>

                          <p className="mt-1 text-[11px] text-text-secondary">
                            {section.description}
                          </p>
                        </div>
                      </div>

                      <span
                        className="
                          rounded-full
                          bg-background
                          px-2.5
                          py-1
                          text-[9px]
                          font-bold
                          uppercase
                          tracking-wider
                          text-primary
                          ring-1
                          ring-primary/30
                        "
                      >
                        Section {index + 1}
                      </span>
                    </div>
                  </div>

                  {/* Fields */}
                  <div className="p-5 sm:p-6">
                    <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                      {section.fields?.map((field, fieldIndex) => (
                        <motion.div
                          key={field.name}
                          variants={fieldVariants}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true, amount: 0.2 }}
                          transition={{
                            delay: shouldReduceMotion
                              ? 0
                              : Math.min(fieldIndex * 0.02, 0.4),
                          }}
                          className={field.multiline ? "xl:col-span-2" : ""}
                        >
                          <DynamicField
                            field={field}
                            value={getValue(field)}
                            onChange={handleChange}
                          />
                        </motion.div>
                      ))}
                    </div>

                    {section.taxRows && (
                      <TaxCalculationTable
                        rows={section.taxRows}
                        formData={formData}
                        onChange={handleChange}
                      />
                    )}
                  </div>
                </motion.section>
              );
            })}

            {/* Bottom action bar */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: premiumEase }}
              className="
                flex
                flex-col
                gap-3
                rounded-2xl
                border
                border-border
                bg-background
                p-4
                shadow-card
                sm:flex-row
                sm:items-center
                sm:justify-between
                sm:p-5
              "
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-light">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                </div>

                <div>
                  <p className="text-xs font-bold text-heading">
                    You've reached the end of the form
                  </p>
                  <p className="text-[10px] text-text-secondary">
                    Review all sections before submitting
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <motion.button
                  type="button"
                  onClick={handleSave}
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : { y: -1, transition: { duration: 0.2 } }
                  }
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-lg
                    border
                    border-border
                    bg-background
                    px-4
                    py-2.5
                    text-xs
                    font-semibold
                    text-heading
                    transition-colors
                    hover:border-primary
                    hover:text-primary
                  "
                >
                  <Save className="h-3.5 w-3.5" />
                  Save draft
                </motion.button>

                <motion.button
                  type="button"
                  onClick={() => console.log("Review CT600", formData)}
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : { y: -1, transition: { duration: 0.2 } }
                  }
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-lg
                    bg-primary
                    px-5
                    py-2.5
                    text-xs
                    font-bold
                    text-text-white
                    shadow-button
                    transition-colors
                    hover:bg-primary-hover
                  "
                >
                  Review CT600
                  <ArrowRight className="h-3.5 w-3.5" />
                </motion.button>
              </div>
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   DYNAMIC FIELD
============================================================ */

const DynamicField = ({ field, value, onChange }) => {
  const shouldReduceMotion = useReducedMotion();
  const premiumEase = [0.22, 1, 0.36, 1];

  /* RADIO */
  if (field.type === "radio") {
    return (
      <div className="xl:col-span-2 rounded-xl border border-border bg-background-soft p-4">
        <div className="mb-3">
          <label className="text-xs font-bold text-heading">
            {field.label}
          </label>
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {field.options.map((option) => {
            const active = value === option.value;

            return (
              <motion.button
                key={option.value}
                type="button"
                onClick={() => onChange(field.name, option.value)}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : { y: -2, transition: { duration: 0.2 } }
                }
                whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                animate={{
                  backgroundColor: active
                    ? "var(--color-primary-light)"
                    : "#ffffff",
                  borderColor: active
                    ? "var(--color-primary)"
                    : "var(--color-border)",
                }}
                transition={{ duration: 0.25, ease: premiumEase }}
                className="
                  flex
                  items-center
                  gap-3
                  rounded-lg
                  border
                  px-3
                  py-3
                  text-left
                  transition-colors
                "
              >
                <span
                  className={`
                    flex
                    h-4
                    w-4
                    items-center
                    justify-center
                    rounded-full
                    border
                    transition-colors
                    ${active ? "border-primary" : "border-border-dark"}
                  `}
                >
                  {active && (
                    <motion.span
                      initial={
                        shouldReduceMotion ? false : { scale: 0 }
                      }
                      animate={{ scale: 1 }}
                      transition={{
                        duration: 0.25,
                        ease: [0.34, 1.56, 0.64, 1],
                      }}
                      className="h-2 w-2 rounded-full bg-primary"
                    />
                  )}
                </span>

                <span>
                  <span className="block text-[11px] font-semibold text-heading">
                    {option.label}
                  </span>
                  <span className="text-[9px] text-text-secondary">
                    Box {option.box}
                  </span>
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    );
  }

  /* CHECKBOX */
  if (field.type === "checkbox") {
    return (
      <motion.label
        whileHover={
          shouldReduceMotion
            ? undefined
            : { y: -1, transition: { duration: 0.2 } }
        }
        className="
          group
          flex
          cursor-pointer
          items-start
          gap-3
          rounded-xl
          border
          border-border
          bg-background-soft
          p-4
          transition-colors
          hover:border-primary
          hover:bg-primary-light
        "
      >
        <input
          type="checkbox"
          checked={Boolean(value)}
          onChange={(e) => onChange(field.name, e.target.checked)}
          className="peer sr-only"
        />

        <span
          className={`
            mt-0.5
            flex
            h-5
            w-5
            shrink-0
            items-center
            justify-center
            rounded-md
            border
            transition-all
            duration-200
            ${
              value
                ? "border-primary bg-primary"
                : "border-border-dark bg-background"
            }
          `}
        >
          {value && (
            <motion.span
              initial={shouldReduceMotion ? false : { scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 0.2,
                ease: [0.34, 1.56, 0.64, 1],
              }}
            >
              <Check className="h-3 w-3 text-text-white" strokeWidth={3} />
            </motion.span>
          )}
        </span>

        <span className="min-w-0 flex-1">
          <span className="block text-xs font-semibold leading-5 text-heading">
            {field.label}
          </span>
          <span className="mt-1 block text-[9px] font-medium uppercase tracking-wider text-text-secondary">
            Box {field.box}
          </span>
        </span>
      </motion.label>
    );
  }

  /* STANDARD */
  return (
    <div className={`${field.multiline ? "xl:col-span-2" : ""}`}>
      <div className="mb-1.5 flex items-center justify-between gap-3">
        <label className="text-[11px] font-bold text-heading">
          {field.label}
        </label>

        <span
          className="
            shrink-0
            rounded-md
            bg-primary-light
            px-1.5
            py-0.5
            font-mono
            text-[9px]
            font-bold
            text-primary
          "
        >
          Box {field.box}
        </span>
      </div>

      <div className="relative">
        {field.prefix && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-text-secondary">
            {field.prefix}
          </span>
        )}

        {field.type === "select" ? (
          <select
            value={value || ""}
            onChange={(e) => onChange(field.name, e.target.value)}
            className="
              w-full
              rounded-lg
              border
              border-border
              bg-background
              px-3
              py-2.5
              text-xs
              text-heading
              outline-none
              transition
              focus:border-primary
              focus:ring-2
              focus:ring-primary/10
            "
          >
            <option value="">Select...</option>
            {field.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : field.multiline ? (
          <textarea
            value={value || ""}
            onChange={(e) => onChange(field.name, e.target.value)}
            rows={4}
            className="
              w-full
              resize-none
              rounded-lg
              border
              border-border
              bg-background
              px-3
              py-2.5
              text-xs
              text-heading
              outline-none
              transition
              placeholder:text-text-light
              focus:border-primary
              focus:ring-2
              focus:ring-primary/10
            "
          />
        ) : (
          <input
            type={field.type === "number" ? "number" : field.type}
            value={value ?? ""}
            readOnly={field.calculated}
            onChange={(e) => onChange(field.name, e.target.value)}
            placeholder={
              field.calculated
                ? "Calculated automatically"
                : `Enter ${field.label.toLowerCase()}`
            }
            className={`
              w-full
              rounded-lg
              border
              px-3
              py-2.5
              text-xs
              outline-none
              transition
              ${field.prefix ? "pl-8" : ""}
              ${
                field.calculated
                  ? "border-primary/30 bg-primary-light font-bold text-primary"
                  : "border-border bg-background text-heading focus:border-primary focus:ring-2 focus:ring-primary/10"
              }
            `}
          />
        )}
      </div>

      {field.calculated && (
        <p className="mt-1 text-[9px] font-medium text-primary">
          Calculated automatically from related fields.
        </p>
      )}
    </div>
  );
};

/* ============================================================
   TAX CALCULATION TABLE
============================================================ */

const TaxCalculationTable = ({ rows, formData, onChange }) => {
  const shouldReduceMotion = useReducedMotion();
  const premiumEase = [0.22, 1, 0.36, 1];

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: premiumEase }}
      className="mt-6 overflow-hidden rounded-xl border border-border"
    >
      <div className="border-b border-border bg-primary-light px-4 py-3">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-primary" />

          <div>
            <h3 className="text-xs font-bold text-heading">
              Tax calculation
            </h3>
            <p className="text-[9px] text-text-secondary">
              Enter how much profit has to be charged and at what rate.
            </p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px]">
          <thead>
            <tr className="border-b border-border bg-background-soft">
              <th className="px-3 py-3 text-left text-[9px] font-bold uppercase tracking-wider text-text-secondary">
                Financial year
              </th>
              <th className="px-3 py-3 text-left text-[9px] font-bold uppercase tracking-wider text-text-secondary">
                Amount of profit
              </th>
              <th className="px-3 py-3 text-left text-[9px] font-bold uppercase tracking-wider text-text-secondary">
                Rate of tax %
              </th>
              <th className="px-3 py-3 text-left text-[9px] font-bold uppercase tracking-wider text-text-secondary">
                Tax
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {rows.map((row, index) => (
              <motion.tr
                key={row.id}
                initial={shouldReduceMotion ? false : { opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  ease: premiumEase,
                  delay: shouldReduceMotion ? 0 : index * 0.04,
                }}
              >
                <td className="px-3 py-3">
                  <input
                    type="text"
                    defaultValue={row.financialYear}
                    className="
                      w-24
                      rounded-lg
                      border
                      border-border
                      bg-background
                      px-2.5
                      py-2
                      text-xs
                      text-heading
                      outline-none
                      transition
                      focus:border-primary
                      focus:ring-2
                      focus:ring-primary/10
                    "
                  />
                </td>

                <td className="px-3 py-3">
                  <div className="relative">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-text-secondary">
                      £
                    </span>
                    <input
                      type="number"
                      value={formData[`taxProfit_${row.id}`] || ""}
                      onChange={(e) =>
                        onChange(`taxProfit_${row.id}`, e.target.value)
                      }
                      className="
                        w-full
                        rounded-lg
                        border
                        border-border
                        bg-background
                        py-2
                        pl-7
                        pr-2
                        text-xs
                        text-heading
                        outline-none
                        transition
                        focus:border-primary
                        focus:ring-2
                        focus:ring-primary/10
                      "
                    />
                  </div>
                  <p className="mt-1 text-[8px] text-text-secondary">
                    Box {row.profitBox}
                  </p>
                </td>

                <td className="px-3 py-3">
                  <div className="relative">
                    <input
                      type="number"
                      value={formData[`taxRate_${row.id}`] || ""}
                      onChange={(e) =>
                        onChange(`taxRate_${row.id}`, e.target.value)
                      }
                      className="
                        w-full
                        rounded-lg
                        border
                        border-border
                        bg-background
                        py-2
                        pr-7
                        pl-2
                        text-xs
                        text-heading
                        outline-none
                        transition
                        focus:border-primary
                        focus:ring-2
                        focus:ring-primary/10
                      "
                    />
                    <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-text-secondary">
                      %
                    </span>
                  </div>
                  <p className="mt-1 text-[8px] text-text-secondary">
                    Box {row.rateBox}
                  </p>
                </td>

                <td className="px-3 py-3">
                  <div className="relative">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-text-secondary">
                      £
                    </span>
                    <input
                      type="number"
                      value={formData[`tax_${row.id}`] || ""}
                      onChange={(e) =>
                        onChange(`tax_${row.id}`, e.target.value)
                      }
                      className="
                        w-full
                        rounded-lg
                        border
                        border-border
                        bg-background
                        py-2
                        pl-7
                        pr-2
                        text-xs
                        text-heading
                        outline-none
                        transition
                        focus:border-primary
                        focus:ring-2
                        focus:ring-primary/10
                      "
                    />
                  </div>
                  <p className="mt-1 text-[8px] text-text-secondary">
                    Box {row.taxBox}
                  </p>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default OrganizationCorporationTaxCT600Page;