import PricingClient from "./PricingClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing | Financial Monitoring",
  description: "Transparent and scalable pricing plans tailored for your growing business. Flexible subscription terms without hidden fees.",
  keywords: "pricing, subscription, financial software, scalable pricing, transparent fees",
};

export default function PricingPage() {
  return <PricingClient />;
}
