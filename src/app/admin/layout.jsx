
import React from "react"
import "../(site)/globals.css"

import AdminClientLayout from "@/Component/admin/AdminClientLayout"

export const metadata = {
  title: "Admin Panel",
  description: "Admin Page",
  icons: {
    icon: "/ebooklogo.png"
  }
}

export default function AdminLayout({ children }) {
  

    return(
       <AdminClientLayout>
        {children}
       </AdminClientLayout>
    )
}