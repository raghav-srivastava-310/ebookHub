"use client"

import React, { useEffect, useState } from 'react'
import { redirect, useRouter } from 'next/navigation';
import api from "@/app/api/axios"

export default function Home() {

    const [isAdmin, setIsAdmin] = useState(null);
    const [stats, setStats] = useState(null);
    const router = useRouter();

    const fetchAdminDetails = async () => {
        try {
            const res = await api.get("/api/admin/get-admin");

            if (res.data.success) {
                setIsAdmin(true);
                // Fetch dashboard stats
                fetchStats();
            }

        } catch (error) {
            console.log("Error fetching admin details", error.message);
            setIsAdmin(false);
        }
    };

    const fetchStats = async () => {
        try {
            const [usersRes] = await Promise.all([
                api.get("/api/auth/get-all-user"),
            ]);

            if (usersRes.data.success) {
                setStats({
                    totalUsers: usersRes.data.users.length,
                    totalAdmins: usersRes.data.users.filter(u => u.role === 'admin').length,
                });
            }
        } catch (error) {
            console.log("Error fetching stats", error.message);
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
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-gray-500 text-lg">Loading...</div>
            </div>
        )
    }

    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <h1 className='text-3xl font-bold text-gray-900'>Dashboard</h1>
                <p className='text-gray-500 text-sm mt-1'>Welcome back to your admin panel</p>
            </div>

            {/* Simple Stats Grid - 2 columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                {/* Total Users */}
                <div className="bg-white rounded border border-gray-200 p-5">
                    <p className="text-gray-600 text-sm mb-2">Total Users</p>
                    <p className="text-3xl font-bold text-gray-900">{stats?.totalUsers || 0}</p>
                </div>

                {/* Total Admins */}
                <div className="bg-white rounded border border-gray-200 p-5">
                    <p className="text-gray-600 text-sm mb-2">Admin Users</p>
                    <p className="text-3xl font-bold text-gray-900">{stats?.totalAdmins || 0}</p>
                </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Navigation</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <a href="/admin/addBooks" className="px-4 py-3 border border-gray-200 rounded hover:bg-gray-50 transition-colors text-gray-700 text-sm font-medium">
                        Add New Book
                    </a>
                    <a href="/admin/allBooks" className="px-4 py-3 border border-gray-200 rounded hover:bg-gray-50 transition-colors text-gray-700 text-sm font-medium">
                        All Books
                    </a>
                    <a href="/admin/allUser" className="px-4 py-3 border border-gray-200 rounded hover:bg-gray-50 transition-colors text-gray-700 text-sm font-medium">
                        All Users
                    </a>
                </div>
            </div>
        </div>
    )
}