import { LucideIcon } from "lucide-react";

export interface SubMenuItem {
  id: string;
  label: string;
  icon: LucideIcon;
  path: string;
}

export interface MenuItem {
  id: string;
  label: string;
  subtitle: string;
  icon: LucideIcon;
  subItems: SubMenuItem[];
  isAdmin?: boolean;
  isAdminCopy?: boolean;
  category?: string;
}

export interface NavigationState {
  selectedItem: string;
  selectedSubItem: string;
  isCollapsed: boolean;
}

export interface NavigationContextType {
  selectedItem: string;
  selectedSubItem: string;
  isCollapsed: boolean;
  setSelectedItem: (item: string) => void;
  setSelectedSubItem: (item: string) => void;
  setIsCollapsed: (collapsed: boolean) => void;
}

