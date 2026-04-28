"use client"
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function Home() {
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(()=>{
        const token = localStorage.getItem("adminToken");
        if(token){
            setIsAdmin(true);
        }else{
            redirect("/admin/signin");
        }
    }, [])


    return (
        <div>Home</div>
    )
}