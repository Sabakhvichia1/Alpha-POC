import AboutClient from "./AboutClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Financial Monitoring",
  description: "Learn about our mission to democratize financial management for Georgian businesses through accessible, automated solutions.",
  keywords: "about us, mission, financial management, automation, team",
};

export default function AboutPage() {
  return <AboutClient />;
}
