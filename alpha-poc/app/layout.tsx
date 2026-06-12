import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/contexts/AppContext";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "ფინანსური მონიტორინგი - საქართველო",
  description: "ფინანსური აღრიცხვის და ანალიტიკის სისტემა საქართველოს საგადასახადო კოდექსის შესაბამისად",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className={`${plusJakartaSans.className} min-h-full flex flex-col bg-white`}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
