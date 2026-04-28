"use client"
import React, { useEffect, useState } from "react"
import axios from "axios"
import { Search, Plus, MoreHorizontal, Edit, Trash2, Eye, LibraryBig } from "lucide-react"
import Link from "next/link"
import api from "@/app/api/axios"

export default function AllBooks() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)

  const getBooks = async () => {
    try {
      const res = await api.get("/api/getBooks")
      setBooks(res.data)
    } catch (error) {
      console.log(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getBooks()
  }, [])

  const handleDelete = async (id)=>{
    try {
      const res = await api.delete(`/api/deleteBook/${id}`)
      // Remove the deleted book from the state
      setBooks(books.filter(book => book._id !== id))
      if(res.data.success){
        alert("Book deleted successfully")
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className="w-full mx-auto p-4 sm:p-6 lg:p-8 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
            <div className="p-2.5 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-xl shadow-sm">
              <LibraryBig className="w-6 h-6" />
            </div>
            Books Directory
          </h1>
          <p className="text-slate-500 mt-2 text-[15px]">
            Manage, edit, and oversee all the books currently active in your digital store.
          </p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Link href="/admin/addBooks">
            <button className="h-11 flex items-center gap-2 rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white shadow-[0_8px_30px_rgb(79,70,229,0.2)] hover:shadow-[0_8px_30px_rgb(79,70,229,0.3)] hover:bg-indigo-700 transition active:scale-95">
              <Plus className="h-4 w-4" /> <span>Add Book</span>
            </button>
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 w-full">
           {[1,2,3,4,5,6].map(i => (
             <div key={i} className="h-[320px] rounded-2xl bg-slate-100 animate-pulse w-full border border-slate-200"></div>
           ))}
        </div>
      ) : books.length === 0 ? (
        <div className="flex min-h-[400px] w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-sm border border-slate-100 mb-5">
            <Search className="h-10 w-10 text-slate-300" />
          </div>
          <h3 className="text-xl font-bold text-slate-800">No books found</h3>
          <p className="text-slate-500 max-w-sm text-center mt-2 mb-6">You haven't added any books to your library yet. Get started by adding your first book.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 w-full">
          {books.map((book, i) => (
            <div
              key={i}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/60 bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 w-full"
            >
              {/* Image Section */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-50 border-b border-slate-100">
                {book.bookCover ? (
                   <img src={book.bookCover} alt={book.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                ) : (
                   <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 p-6 text-center">
                     <span className="text-5xl font-black tracking-tighter uppercase opacity-20 text-indigo-800">{book.title.substring(0,2)}</span>
                   </div>
                )}
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10"></div>
                <div className="absolute top-3 right-3 flex items-center gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-20">
                  {/* <button className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-700 hover:text-indigo-600 shadow-lg transition active:scale-95">
                    <Edit className="h-4 w-4" />
                  </button> */}
                  <button className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white text-slate-700 hover:text-rose-600 shadow-lg transition active:scale-95" onClick={()=>handleDelete(book._id)}>
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Content Section */}
              <div className="flex flex-1 flex-col p-5">
                <div className="mb-4 flex items-start justify-between gap-2">
                  <span className="inline-flex items-center rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                     ₹{book.price}
                  </span>
                  <button className="text-slate-400 hover:text-indigo-600 transition-colors p-1">
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                </div>
                
                <h3 className="mb-2 text-lg font-bold text-slate-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                  {book.title}
                </h3>
                
                <p className="text-sm text-slate-500 line-clamp-2 flex-1 leading-relaxed">
                  {book.description || "No description provided for this book. Please add one to give more context."}
                </p>

                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    Published
                  </span>
                  <Link href={book.pdf} target="_blank"  className="flex items-center gap-1.5 text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
                    <Eye className="h-4 w-4" /> View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}