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
import { Home, Book, Settings, ChevronDown } from "lucide-react"
import Link from "next/link"

function AdminSidebar() {
  const [booksOpen, setBooksOpen] = useState(false);

  return (
   <Sidebar>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="#">
                  <Home className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => setBooksOpen(!booksOpen)}>
                <Book className="mr-2 h-4 w-4" />
                Books
                <ChevronDown className={`ml-auto h-4 w-4 transition-transform ${booksOpen ? 'rotate-180' : ''}`} />
              </SidebarMenuButton>
              {booksOpen && (
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild>
                      <Link href="/admin/allBooks">All Books</Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild>
                      <Link href="/admin/addBooks">Add books</Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                   <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild>
                      <Link href="#">Update Books</Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  
                </SidebarMenuSub>
              )}
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="#">
                  <Settings className="mr-2 h-4 w-4" />
                  Orders
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
   </Sidebar>
  )
}

export default AdminSidebar