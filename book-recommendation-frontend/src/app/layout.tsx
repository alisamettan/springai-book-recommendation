import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CombinedProviders from "@/context/combinedprovider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "@/router/privateroute";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CombinedProviders>
          <PrivateRoute>{children}</PrivateRoute>
        </CombinedProviders>

        <ToastContainer />
      </body>
    </html>
  );
}
