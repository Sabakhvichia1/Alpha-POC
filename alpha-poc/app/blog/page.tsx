import BlogClient from "./BlogClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Financial Monitoring",
  description: "Read expert insights, tips, and the latest industry news on financial management and tax compliance.",
  keywords: "blog, financial tips, industry news, tax compliance, insights",
};

export default function BlogPage() {
  return <BlogClient />;
}
