"use client";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AdminSidebar from "@/Component/admin/AdminSidebar";
import { usePathname } from "next/navigation";

export default function AdminClientLayout({ children }) {
  const pathname = usePathname();

  if (pathname === "/admin/signin") {
    return <>{children}</>;
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AdminSidebar />
        <SidebarInset className="flex-1 p-4 w-full">
          {children}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}