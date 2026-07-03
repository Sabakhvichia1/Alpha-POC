import SecurityClient from "./SecurityClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security | Financial Monitoring",
  description: "Learn about our enterprise-grade data protection, end-to-end encryption, and continuous security audits.",
  keywords: "security, data protection, encryption, compliance, financial security",
};

export default function SecurityPage() {
  return <SecurityClient />;
}
