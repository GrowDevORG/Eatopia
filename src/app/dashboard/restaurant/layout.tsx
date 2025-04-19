import type React from "react";

// This is a mock function to get the restaurant ID
// In a real app, you would get this from authentication or context

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <main className="flex-1 p-6 pt-2 md:p-8">{children}</main>
    </div>
  );
}
