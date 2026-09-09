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

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<AppLayout />}>
          <Route index path="/" element={<LandingPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path="/pricing" element={<PricingPage />} />


          <Route path="/corporation-tax" element={<CorporationTax />} />
          <Route path="/annual-accounts" element={<AnnualAccounts />} />
          <Route path="/mtd-vat" element={<MtdVat />} />
          <Route path="/self-assessment" element={<SelfAssessment />} />
          <Route path="/confirmation-statement" element={<ConfirmationStatement />} />


          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/accessibility" element={<Accessibility />} />




        </Route>

        {/* Admin Layout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          {/* Additional admin routes can be added here */}
          <Route path="site-settings" element={<SiteSettings />} />
          <Route path="profile" element={<AdminProfile />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
