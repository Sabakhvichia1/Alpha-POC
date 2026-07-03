import LegalClient from "../components/LegalClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Financial Monitoring",
  description: "Read the terms of service and agreement for utilizing our financial platform. Learn about user obligations and limitations of liability.",
  keywords: "terms of service, terms and conditions, legal, agreement, terms",
};

export default function TermsPage() {
  return <LegalClient pageKey="terms" />;
}
