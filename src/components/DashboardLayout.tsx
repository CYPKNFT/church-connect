import { ReactNode } from "react";
import { CollapsibleSidebar } from "./CollapsibleSidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return <CollapsibleSidebar>{children}</CollapsibleSidebar>;
}