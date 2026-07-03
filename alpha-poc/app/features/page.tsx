import FeaturesClient from "./FeaturesClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Features | Financial Monitoring",
  description: "Discover the advanced automation and seamless system integration features of our financial tracking and payroll platform.",
  keywords: "financial monitoring, features, automation, tax calculation, payroll, integration",
};

export default function FeaturesPage() {
  return <FeaturesClient />;
}
