"use client";

import Footer from "@/components/shared/Footer";
import Loading from "@/components/shared/Loading";
import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const [courseId, setCourseId] = useState<string | null>(null);
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <Loading />;
  }

  if (!user) {
    return <div>Please sign in to access this page.</div>;
  }

  return (
    <div className="dashboard">
      <main className="dashboard__body">{children}</main>
      <Footer />
    </div>
  );
}
