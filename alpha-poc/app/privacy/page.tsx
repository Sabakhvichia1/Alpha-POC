import LegalClient from "../components/LegalClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Financial Monitoring",
  description: "Our privacy policy details how we collect, use, and protect your data to ensure the utmost confidentiality and service reliability.",
  keywords: "privacy policy, data usage, data collection, privacy, legal",
};

export default function PrivacyPage() {
  return <LegalClient pageKey="privacy" />;
}
