import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { EmergencyButton } from "@/components/emergency-sos";
import { AskMtaa } from "@/components/ask-mtaa";
import { CallbackModal } from "@/components/callback-modal";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MtaaTrust - Trusted Local Services", // Updated title
  description: "Find verified plumbers, electricians, and more in your neighborhood through community trust.", // Updated description
};

export default function RootLayout({
  children,
}: { // Changed type definition for children
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AskMtaa />
        <CallbackModal />
        <EmergencyButton />
        {children}
      </body>
    </html>
  );
}
