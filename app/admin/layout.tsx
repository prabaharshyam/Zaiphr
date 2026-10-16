import type { Metadata } from "next";

export const metadata: Metadata = { title: "Admin", robots: { index: false, follow: false } };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-[100svh] pt-[calc(var(--nav-h)+2rem)] pb-24">{children}</div>;
}
