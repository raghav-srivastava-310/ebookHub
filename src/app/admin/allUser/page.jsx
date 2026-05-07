"use client"

import api from '@/app/api/axios';
import React, { useEffect, useState } from 'react'

function Page() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/auth/get-all-user");

      if (res.data.success) {
        setUsers(res.data.users);
        setError(null);
      }

    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className='text-4xl font-bold text-gray-900'>Users</h1>
        <p className='text-gray-600 mt-2'>Manage and view all registered users in the system</p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-gray-600 text-sm">Total Users</p>
          <p className="text-3xl font-bold text-gray-900">{users.length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-gray-600 text-sm">Admins</p>
          <p className="text-3xl font-bold text-gray-900">{users.filter(u => u.role === 'admin').length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-gray-600 text-sm">Customers</p>
          <p className="text-3xl font-bold text-gray-900">{users.filter(u => u.role === 'user').length}</p>
        </div>
      </div>

      {/* Users List */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-3 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200 font-semibold text-gray-700">
          <div>Name</div>
          <div>Email</div>
          <div>Role</div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="text-gray-500">Loading users...</div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="p-6 text-center text-red-600">
            {error}
          </div>
        )}

        {/* Users List */}
        {!loading && !error && users.length > 0 && (
          <div className="divide-y divide-gray-200">
            {users.map((user) => (
              <div
                key={user._id}
                className='grid md:grid-cols-3 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors items-start md:items-center'
              >
                <div>
                  <h2 className='font-semibold text-gray-900'>
                    {user.name}
                  </h2>
                  <p className='text-gray-600 text-sm md:hidden'>
                    {user.email}
                  </p>
                </div>

                <div className='hidden md:block'>
                  <p className='text-gray-600'>
                    {user.email}
                  </p>
                </div>

                <div className='flex items-center justify-between md:block'>
                  <span className='text-gray-600 text-sm md:hidden'>Role:</span>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    user.role === 'admin' 
                      ? 'bg-purple-100 text-purple-700' 
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {user.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && users.length === 0 && (
          <div className="flex justify-center items-center py-12">
            <div className="text-center text-gray-500">
              <p className="text-lg font-medium">No users found</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Page;