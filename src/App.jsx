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

const App = () => {
  return (
    <Router>
      <Routes>
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

        {/* Organization Routes */}
        <Route path="/organization" element={<OrganizationLayout />}>
          <Route index element={<OrganizationDashboard />} />
          <Route path="organization-setup" element={<OrganizationSetup />} />
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
            path="/organization/products/corporation-tax/ct600/:companyNumber"
            element={<OrganizationCorporationTaxCT600Page />}
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
        </Route>

        {/* Admin Layout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="organizations" element={<AdminManageOrganization />} />
          <Route
            path="organizations/:id"
            element={<AdminOrganizationDetailsPage />}
          />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="users/:id" element={<AdminUserDetails />} />
          {/* Additional admin routes can be added here */}
          <Route path="site-settings" element={<SiteSettings />} />
          <Route path="profile" element={<AdminProfile />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
