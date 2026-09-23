import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  CheckCircle2,
  ArrowRight,
  RefreshCw,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";

const VerifyEmailPage = () => {
  const navigate = useNavigate();
  const [isResending, setIsResending] = useState(false);
  const [resent, setResent] = useState(false);

  const email = "user@example.com";

  const handleResend = async () => {
    setIsResending(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsResending(false);
    setResent(true);

    setTimeout(() => setResent(false), 5000);
  };

  return (
    <div className="min-h-screen bg-background-soft flex items-center justify-center px-5 py-12 sm:px-6 lg:px-8">
      <div className="pointer-events-none fixed -left-40 -top-40 h-[420px] w-[420px] rounded-full bg-primary-soft opacity-50 blur-3xl" />
      <div className="pointer-events-none fixed -right-40 bottom-0 h-[400px] w-[400px] rounded-full bg-primary-light opacity-60 blur-3xl" />

      <div className="relative w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,62,62,0.08)] border border-border-light p-8 sm:p-10 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-primary-light">
            <Mail className="h-9 w-9 text-primary" strokeWidth={2} />
          </div>

          <h1 className="mt-6 text-2xl font-bold text-heading sm:text-3xl">
            Check your email
          </h1>

          <p className="mt-3 text-sm leading-6 text-text-secondary">
            We've sent a verification link to
          </p>
          <p className="mt-1 text-sm font-semibold text-heading break-all">
            {email}
          </p>

          <p className="mt-6 text-xs leading-5 text-text-muted">
            Click the link in the email to verify your account. If you
            don't see it, check your spam folder.
          </p>

          {resent && (
            <div className="mt-5 flex items-center justify-center gap-2 rounded-lg bg-primary-light px-4 py-2.5 text-xs font-medium text-primary">
              <CheckCircle2 className="h-4 w-4" />
              <span>Verification email sent!</span>
            </div>
          )}

          <button
            onClick={handleResend}
            disabled={isResending}
            className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-primary-hover hover:-translate-y-0.5 disabled:opacity-50"
          >
            {isResending ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4" />
                <span>Resend verification email</span>
              </>
            )}
          </button>

          <div className="mt-6 pt-6 border-t border-border-light">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-xs font-semibold text-text-secondary hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to login
            </Link>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-center gap-2 text-[11px] text-text-muted">
          <ShieldCheck className="h-3.5 w-3.5 text-primary" />
          <span>Your information is securely encrypted</span>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;