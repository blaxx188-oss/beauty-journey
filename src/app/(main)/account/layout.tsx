import { DashboardLayout } from "@/components/account/DashboardLayout";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
