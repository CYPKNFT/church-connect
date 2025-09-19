import { ReactNode } from "react";
import { CollapsibleSidebar } from "./CollapsibleSidebar";

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <CollapsibleSidebar>
      {children}
    </CollapsibleSidebar>
  );
}