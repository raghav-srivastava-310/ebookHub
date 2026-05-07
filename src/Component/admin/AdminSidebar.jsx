"use client"

import React, { useState } from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton
} from "@/components/ui/sidebar"
import { Home, BookOpen, Users, ChevronDown, LogOut } from "lucide-react"
import Link from "next/link"
import api from "@/app/api/axios"
import { toast } from "sonner"

function AdminSidebar() {
  const [booksOpen, setBooksOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const res = await api.post("/api/admin/logout");
      if(res.data.success) {
        toast.success("Logged out successfully");
        window.location.href = "/admin/signin";
      }
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Error logging out");
    }
  };

  return (
   <Sidebar className="bg-white text-gray-900 border-r border-gray-200">
    <SidebarContent>
      {/* Logo/Branding */}
      <SidebarGroup className="pb-4 border-b border-gray-200">
        <div className="px-4 py-3">
          <h2 className="font-bold text-lg text-gray-900">eBookHub</h2>
          <p className="text-xs text-gray-500 mt-1">Admin</p>
        </div>
      </SidebarGroup>

      {/* Main Menu */}
      <SidebarGroup>
        <SidebarGroupLabel className="text-gray-600 uppercase text-xs tracking-wider">Navigation</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {/* Dashboard */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild className="hover:bg-gray-100">
                <Link href="/admin" className="text-gray-700 hover:text-gray-900">
                  <Home className="mr-3 h-4 w-4" />
                  Dashboard
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* Books Dropdown */}
            <SidebarMenuItem>
              <SidebarMenuButton 
                onClick={() => setBooksOpen(!booksOpen)}
                className="hover:bg-gray-100 text-gray-700 hover:text-gray-900"
              >
                <BookOpen className="mr-3 h-4 w-4" />
                Books
                <ChevronDown className={`ml-auto h-4 w-4 transition-transform duration-200 ${booksOpen ? 'rotate-180' : ''}`} />
              </SidebarMenuButton>
              {booksOpen && (
                <SidebarMenuSub className="ml-0 border-l border-gray-200 pl-0">
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild>
                      <Link href="/admin/allBooks" className="text-gray-600 hover:text-gray-800 pl-6">
                        View All
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild>
                      <Link href="/admin/addBooks" className="text-gray-600 hover:text-gray-800 pl-6">
                        Add New
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              )}
            </SidebarMenuItem>

            {/* Users */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild className="hover:bg-gray-100">
                <Link href="/admin/allUser" className="text-gray-700 hover:text-gray-900">
                  <Users className="mr-3 h-4 w-4" />
                  Users
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      {/* Logout Footer */}
      <div className="mt-auto border-t border-gray-200 p-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-start px-4 py-2 text-red-600 hover:bg-red-50 rounded transition-colors"
        >
          <LogOut className="mr-3 h-4 w-4" />
          Logout
        </button>
      </div>
    </SidebarContent>
   </Sidebar>
  )
}

export default AdminSidebar