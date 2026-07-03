import ContactClient from "./ContactClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Financial Monitoring",
  description: "Get in touch with our 24/7 dedicated support team for any technical questions or financial monitoring assistance.",
  keywords: "contact, support, customer service, help, technical support",
};

export default function ContactPage() {
  return <ContactClient />;
}
