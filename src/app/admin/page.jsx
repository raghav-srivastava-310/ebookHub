"use client"

import React, { useEffect, useState } from 'react'
import { redirect, useRouter } from 'next/navigation';
import api from "@/app/api/axios"

export default function Home() {

    const [isAdmin, setIsAdmin] = useState(null);
    const router = useRouter();

    const fetchAdminDetails = async () => {
        try {
            const res = await api.get("/api/admin/get-admin");

            if (res.data.success) {
                setIsAdmin(true);
            }

        } catch (error) {
            console.log("Error fetching admin details", error.message);
            setIsAdmin(false);
        }
    };

    useEffect(() => {
        fetchAdminDetails();
    }, []);

    useEffect(() => {
        if (isAdmin === false) {
            redirect("/admin/signin");
        }
    }, [isAdmin]);

    if (isAdmin === null) {
        return <div>Loading...</div>
    }

    return (
        <div>Admin Home</div>
    )
}