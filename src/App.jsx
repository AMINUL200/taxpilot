import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import AppLayout from "./layout/AppLayout";
import LandingPage from "./pages/landing/LandingPage";
import AdminLayout from "./layout/AdminLayout";
import AdminDashboard from "./pages/admin/dashboard/AdminDashboard";
import SiteSettings from "./pages/admin/settings/SiteSettings";
import AdminProfile from "./pages/admin/profile/AdminProfile";
import HelpPage from "./pages/customer/HelpPage";
import BlogDetails from "./pages/customer/BlogDetails";
import PricingPage from "./pages/customer/PricingPage";
import CorporationTax from "./pages/customer/products/CorporationTax";
import AnnualAccounts from "./pages/customer/products/AnnualAccounts";
import MtdVat from "./pages/customer/products/MtdVat";
import SelfAssessmentOverview from "./component/self-assessment/SelfAssessmentOverview";
import SelfAssessment from "./pages/customer/products/SelfAssessment";
import ConfirmationStatement from "./pages/customer/products/ConfirmationStatement";
import Terms from "./pages/customer/privacy/Terms";
import Privacy from "./pages/customer/privacy/Privacy";
import Cookies from "./pages/customer/privacy/Cookies";
import Accessibility from "./pages/customer/privacy/Accessibility";
import VerifyEmailPage from "./pages/auth/VerifyEmailPage";
import OrganizationLayout from "./layout/OrganizationLayout";
import OrganizationDashboard from "./pages/organization/OrganizationDashboard";
import OrganizationSetup from "./pages/organization/OrganizationSetup";
import OrganizationMyCompanies from "./pages/organization/OrganizationMyCompanies";
import OrganizationSetting from "./pages/organization/OrganizationSetting";
import OrganizationDeadline from "./pages/organization/OrganizationDeadline";
import OrganizationBilling from "./pages/organization/OrganizationBilling";
import AdminManageOrganization from "./pages/admin/AdminManageOrganization";
import AdminOrganizationDetailsPage from "./pages/admin/AdminOrganizationDetailsPage";
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import AdminUserDetails from "./pages/admin/AdminUserDetails";
import OrganizationMyCompaniesDetails from "./pages/organization/OrganizationMyCompaniesDetails";
import OrganizationCorporationTax from "./pages/organization/OrganizationCorporationTax";
import OrganizationSelfAssessment from "./pages/organization/OrganizationSelfAssessment";
import OrganizationCorporationTaxCT600Page from "./pages/organization/OrganizationCorporationTaxCT600Page";
import OrganizationConfirmationStatements from "./pages/organization/OrganizationConfirmationStatements";
import OrganizationVAT from "./pages/organization/OrganizationVAT";
import OrganizationVATReturn from "./pages/organization/OrganizationVATReturn";
import AccountantLayout from "./layout/AccountantLayout";

import AccountantDashboard from "./pages/accountant/AccountantDashboard";
import AccountantClients from "./pages/accountant/AccountantClients";
import AccountantClientsDetails from "./pages/accountant/AccountantClientsDetails";
import AccountantCompanies from "./pages/accountant/AccountantCompanies";
import AccountantCompaniesDetails from "./pages/accountant/AccountantCompaniesDetails";
import AccountantFilings from "./pages/accountant/AccountantFilings";
import AccountantFilingsDetails from "./pages/accountant/AccountantFilingsDetails";
import AccountantDeadlines from "./pages/accountant/AccountantDeadlines";
import AccountantTasks from "./pages/accountant/AccountantTasks";
import AccountantSettings from "./pages/accountant/AccountantSettings";
import AccountantDocuments from "./pages/accountant/AccountantDocuments";
import AccountantTeam from "./pages/accountant/AccountantTeam";
import AccountantBilling from "./pages/accountant/AccountantBilling";
import AccountantTeamDetails from "./pages/accountant/AccountantTeamDetails";
import AuthGate from "./component/common/AuthGate";
import SessionExpiredNotice from "./component/common/SessionExpiredNotice";
import ProtectedRoute from "./routes/ProtectedRoute";
import UnauthorizedPage from "./pages/auth/UnauthorizedPage";
import PublicRoute from "./routes/PublicRoute";
import OrganizationAccountPage from "./pages/organization/OrganizationAccountPage";
import OrganizationCorporationTaxPage from "./pages/organization/OrganizationCorporationTaxPage";
import ManageFormDefinitions from "./pages/admin/form/ManageFormDefinitions";
import ManageFormFields from "./pages/admin/form/ManageFormFields";
import ManageFormSections from "./pages/admin/form/ManageFormSections";
import ManageFormVersions from "./pages/admin/form/ManageFormVersions";
import ManageFilingProcessType from "./pages/admin/filling_process/ManageFillingProcessType";
import OrgManageFillingType from "./pages/organization/filling/OrgManageFillingType";
import OrgManageFillingSubject from "./pages/organization/filling/OrgManageFillingSubject";
import ManageFaqPage from "./pages/admin/website/faqs/ManageFaqPage";
import ManageLegalPage from "./pages/admin/website/legal_page/ManageLegalPage";
import ManageTermsPage from "./pages/admin/website/legal_page/ManageTermsPage";
import ManagePrivacyPage from "./pages/admin/website/legal_page/ManagePrivacyPage";
import ManageFeatureFirstSection from "./pages/admin/features/ManageFeatureFirstSection";
import ManageFeatureSecondSection from "./pages/admin/features/ManageFeatureSecondSection";
import ManageFeatureThirdSection from "./pages/admin/features/ManageFeatureThirdSection ";
import ManageFeatureFourthSection from "./pages/admin/features/ManageFeatureFourthSection";
import ManageFeatureFifthSection from "./pages/admin/features/ManageFeatureFifthSection";
import ManageFeatureSixthSection from "./pages/admin/features/ManageFeatureSixthSection";
import ManageSubscriptionProduct from "./pages/admin/subscription/ManageSubscriptionProduct";
import ManageSubscriptionPlan from "./pages/admin/subscription/ManageSubscriptionPlan";
import ManageSubscriptionPlanFeature from "./pages/admin/subscription/ManageSubscriptionPlanFeature";
import ManageSubscriptionPlanPricing from "./pages/admin/subscription/ManageSubscriptionPlanPricing";
import ManageSubscriptionFillingTypeAssign from "./pages/admin/subscription/ManageSubscriptionFillingTypeAssign";
import ManageSubscriptionEntitlements from "./pages/admin/subscription/ManageSubscriptionEntitlements";

const App = () => {
  return (
    <Router>
      <AuthGate>
        <SessionExpiredNotice />

        <Routes>
          {/* ============================================
            PUBLIC ROUTES (redirect if authed)
        ============================================ */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/verify-email" element={<VerifyEmailPage />} />

            <Route element={<AppLayout />}>
              <Route index path="/" element={<LandingPage />} />
              <Route path="/help" element={<HelpPage />} />
              <Route path="/blog/:id" element={<BlogDetails />} />
              <Route path="/pricing" element={<PricingPage />} />

              <Route path="/corporation-tax" element={<CorporationTax />} />
              <Route path="/annual-accounts" element={<AnnualAccounts />} />
              <Route path="/mtd-vat" element={<MtdVat />} />
              <Route path="/self-assessment" element={<SelfAssessment />} />
              <Route
                path="/confirmation-statement"
                element={<ConfirmationStatement />}
              />

              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/cookies" element={<Cookies />} />
              <Route path="/accessibility" element={<Accessibility />} />
            </Route>
          </Route>

          {/* Organization Routes */}
          <Route
            element={
              <ProtectedRoute
                allowedUserTypes={["organization_owner", "organization_user"]}
              />
            }
          >
            <Route path="/organization" element={<OrganizationLayout />}>
              <Route index element={<OrganizationDashboard />} />
              <Route
                path="organization-setup"
                element={<OrganizationSetup />}
              />
              <Route path="companies" element={<OrganizationMyCompanies />} />
              <Route
                path="companies/:id"
                element={<OrganizationMyCompaniesDetails />}
              />
              <Route path="settings" element={<OrganizationSetting />} />
              <Route path="deadlines" element={<OrganizationDeadline />} />
              <Route path="billing" element={<OrganizationBilling />} />

              <Route
                path="products/corporation-tax"
                element={<OrganizationCorporationTax />}
              />

              <Route
                path="/organization/products/corporation-tax/ct600/:filingId"
                element={<OrganizationCorporationTaxCT600Page />}
              />

              <Route
                path="products/accounts"
                element={<OrganizationAccountPage />}
              />
              <Route
                path="products/ct600"
                element={<OrganizationCorporationTaxPage />}
              />

              {/* <Route
            path="/organization/products/corporation-tax/ct600/:companyNumber/sent"
            element={<CorporationTaxCT600SentPage />}
          /> */}

              {/* <Route
            path="/organization/products/corporation-tax/ct600/:companyNumber/hmrc-request"
            element={<CorporationTaxHMRCRequestPage />}
          /> */}

              {/* <Route
            path="/organization/products/corporation-tax/company/:companyNumber/years"
            element={<CorporationTaxYearsPage />}
          /> */}

              <Route
                path="products/self-assessment"
                element={<OrganizationSelfAssessment />}
              />
              <Route
                path="products/confirmation-statement"
                element={<OrganizationConfirmationStatements />}
              />
              <Route path="products/mtd-vat" element={<OrganizationVAT />} />
              <Route
                path="products/mtd-vat-return/:companyNumber/start"
                element={<OrganizationVATReturn />}
              />

              {/* Filling process route----- */}
              <Route
                path="filing-process/filing-types"
                element={<OrgManageFillingType />}
              />
              <Route
                path="filing-process/filing-subjects"
                element={<OrgManageFillingSubject />}
              />
            </Route>
          </Route>

          {/* Accountant portal */}
          {/* <Route element={<ProtectedRoute allowedUserTypes={["accountant"]} />}> */}
          <Route path="/accountant" element={<AccountantLayout />}>
            <Route index element={<AccountantDashboard />} />
            <Route path="clients" element={<AccountantClients />} />
            <Route path="clients/:id" element={<AccountantClientsDetails />} />
            <Route path="companies" element={<AccountantCompanies />} />
            <Route
              path="companies/:Id"
              element={<AccountantCompaniesDetails />}
            />
            <Route path="filings" element={<AccountantFilings />} />
            <Route path="filings/:Id" element={<AccountantFilingsDetails />} />
            <Route path="deadlines" element={<AccountantDeadlines />} />
            <Route path="tasks" element={<AccountantTasks />} />
            <Route path="documents" element={<AccountantDocuments />} />
            <Route path="team" element={<AccountantTeam />} />
            <Route path="team/:Id" element={<AccountantTeamDetails />} />

            <Route path="billing" element={<AccountantBilling />} />
            <Route path="settings" element={<AccountantSettings />} />
          </Route>
          {/* </Route> */}

          {/* Admin Layout */}
          <Route
            element={<ProtectedRoute allowedUserTypes={["super_admin"]} />}
          >
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route
                path="organizations"
                element={<AdminManageOrganization />}
              />
              <Route
                path="organizations/:id"
                element={<AdminOrganizationDetailsPage />}
              />
              <Route path="users" element={<AdminUsersPage />} />
              <Route path="users/:id" element={<AdminUserDetails />} />
              {/* Additional admin routes can be added here */}
              <Route path="site-settings" element={<SiteSettings />} />
              <Route path="profile" element={<AdminProfile />} />

              {/* Start Form Management Routes */}
              <Route
                path="website/forms/filling-type"
                element={<ManageFilingProcessType />}
              />
              <Route
                path="website/forms/definitions"
                element={<ManageFormDefinitions />}
              />
              <Route
                path="website/forms/fields"
                element={<ManageFormFields />}
              />
              <Route
                path="website/forms/sections"
                element={<ManageFormSections />}
              />
              <Route
                path="website/forms/versions"
                element={<ManageFormVersions />}
              />

              {/* Subscription Management Routes */}
              <Route
                path="subscriptions/products"
                element={<ManageSubscriptionProduct />}
              />
              <Route path="subscriptions/plans" element={<ManageSubscriptionPlan />} />
              <Route
                path="subscriptions/plans/:planId/features"
                element={<ManageSubscriptionPlanFeature />}
              />
              <Route path="subscriptions/plans/:planId/pricing" element={<ManageSubscriptionPlanPricing />} />
              <Route
                path="subscriptions/plans/:planId/filing-types"
                element={<ManageSubscriptionFillingTypeAssign />}
              />
              <Route
                path="subscriptions/plans/:planId/entitlements"
                element={<ManageSubscriptionEntitlements />}
              />

              {/* End Form Management Routes */}

              {/* Website Route Start */}
              <Route path="website/faqs" element={<ManageFaqPage />} />
              <Route path="website/legal-page" element={<ManageLegalPage />} />
              <Route
                path="website/legal-page/terms"
                element={<ManageTermsPage />}
              />
              <Route
                path="website/legal-page/privacy"
                element={<ManagePrivacyPage />}
              />

              {/* Features Route */}
              {/* <Route path="website/features" element={<ManageFeatures />} /> */}
              <Route
                path="website/features/first-section"
                element={<ManageFeatureFirstSection />}
              />
              <Route
                path="website/features/second-section"
                element={<ManageFeatureSecondSection />}
              />
              <Route
                path="website/features/third-section"
                element={<ManageFeatureThirdSection />}
              />
              <Route
                path="website/features/fourth-section"
                element={<ManageFeatureFourthSection />}
              />
              <Route
                path="website/features/fifth-section"
                element={<ManageFeatureFifthSection />}
              />
              <Route
                path="website/features/sixth-section"
                element={<ManageFeatureSixthSection />}
              />

              {/* Website Route End */}

              {/* Start Filling Process Routes */}
              {/* <Route path="website/filling-steps" element={<ManageFillingSteps />} /> */}

              {/* End Filling Process Routes */}
            </Route>
          </Route>

          {/* Unauthorized Page */}
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
        </Routes>
      </AuthGate>
    </Router>
  );
};

export default App;
