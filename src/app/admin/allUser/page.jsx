"use client"

import api from '@/app/api/axios';
import React, { useEffect, useState } from 'react'

function Page() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/api/auth/get-all-user");

      if (res.data.success) {
        setUsers(res.data.users);
      }

    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className='min-h-screen bg-gray-100 p-6'>

      <h1 className='text-3xl font-bold mb-6'>
        All Users
      </h1>

      <div className='grid gap-4'>

        {users.map((user) => (

          <div
            key={user._id}
            className='bg-white p-5 rounded-xl shadow-md border'
          >

            <div className='flex items-center justify-between'>

              <div>
                <h2 className='text-xl font-semibold'>
                  {user.name}
                </h2>

                <p className='text-gray-600'>
                  {user.email}
                </p>
              </div>

              <span className='px-4 py-1 rounded-full bg-black text-white text-sm'>
                {user.role}
              </span>

            </div>

          </div>

        ))}

      </div>

    </div>
  )
}

export default Page;