import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { ToastProvider } from "@/context/ToastContext";
import { WorkoutPlanProvider } from "@/context/WorkoutPlanContext";

export const metadata: Metadata = {
  title: "Fitlog",
  description: "Track your workouts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ToastProvider>
          <WorkoutPlanProvider>
            <Navbar />
            {children}
            <Footer />
          </WorkoutPlanProvider>
        </ToastProvider>
      </body>
    </html>
  );
}