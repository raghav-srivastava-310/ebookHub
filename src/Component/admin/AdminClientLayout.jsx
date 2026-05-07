"use client";

import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AdminSidebar from "@/Component/admin/AdminSidebar";
import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";

export default function AdminClientLayout({ children }) {
  const pathname = usePathname();

  if (pathname === "/admin/signin") {
    return <>{children}</>;
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-50">
        <AdminSidebar />
        <SidebarInset className="flex-1 w-full">
          <header className="sticky top-0 z-50 flex h-14 items-center gap-4 border-b bg-white px-6 md:px-8">
            <SidebarTrigger className="md:hidden" />
            <Separator orientation="vertical" className="h-6 md:hidden" />
          </header>
          <main className="p-6 md:p-8">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}