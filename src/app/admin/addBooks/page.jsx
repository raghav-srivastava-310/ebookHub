"use client"
import React, { useState } from "react"

import { BookPlus, IndianRupee, FileText, Type, UploadCloud, Loader2, CheckCircle2,Star,Tag } from "lucide-react"
import api from "@/app/api/axios"

export default function AddBook() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    maxPrice:"",
    rating:"",
    category:"",
    pdf: null,
    image:null

  })
  
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    const {name,value,files} = e.target;
    if(name==="pdf"||name==="image"){
      setForm({...form,[name]:files[0]}) // files store
    }else{
      setForm({...form,[name]:value});
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    try {
      const formData = new FormData();
      formData.append("title",form.title);
      formData.append("description",form.description);
      formData.append("price",form.price);
      formData.append("maxPrice",form.maxPrice);
      formData.append("rating",form.rating);
      formData.append("category",form.category);
      formData.append("pdf",form.pdf); 
      formData.append("image",form.image);
      const res = await api.post("/api/addBooks",formData)
      if (res.data.success) {
        setSuccess(true);
        setForm({ title: "", description: "", price: "", maxPrice:"",rating:"",category:"", pdf: null,image:null });
        setTimeout(() => setSuccess(false), 3000);
      } else {
        alert("Error occurred")
      }
    } catch (error) {
      console.error(error)
      alert("Server error")
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
          <div className="p-2.5 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-xl shadow-sm">
            <BookPlus className="w-6 h-6" />
          </div>
          Add New Book
        </h1>
        <p className="text-slate-500 mt-2 text-[15px] max-w-2xl">
          Enter the details below to add a new book to the library catalog. Make sure to provide a direct link to the valid PDF document.
        </p>
      </div>

      {/* Form Container */}
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6 sm:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Title Field */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Type className="w-4 h-4 text-slate-400" />
                Book Title
              </label>
              <input
                type="text"
                placeholder="e.g. The Pragmatic Programmer"
                value={form.title}
                name="title"
                onChange={handleChange}
                required
                className="w-full h-12 px-4 rounded-xl bg-slate-50/50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none text-slate-900 placeholder:text-slate-400 font-medium"
              />
            </div>

            {/* Price Field */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <IndianRupee className="w-4 h-4 text-slate-400" />
                Price (₹)
              </label>
              <input
                type="number"
                placeholder="e.g. 499"
                value={form.price}
                name="price"
                onChange={handleChange}
                required
                min="0"
                className="w-full h-12 px-4 rounded-xl bg-slate-50/50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none text-slate-900 placeholder:text-slate-400 font-medium"
              />
            </div>

            {/* maxprice Field */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <IndianRupee className="w-4 h-4 text-slate-400" />
                maxPrice (₹)
              </label>
              <input
                type="number"
                placeholder="e.g. 499"
                value={form.maxPrice}
                name="maxPrice"
                onChange={handleChange}
                required
                min="0"
                className="w-full h-12 px-4 rounded-xl bg-slate-50/50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none text-slate-900 placeholder:text-slate-400 font-medium"
              />
            </div>

            {/* rating Field */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Star className="w-4 h-4 text-slate-400" />
                rating (₹)
              </label>
              <input
                type="number"
                placeholder="e.g 4.5"
                value={form.rating}
                name="rating"
                onChange={handleChange}
                required
                min="0"
                max="5"
                className="w-full h-12 px-4 rounded-xl bg-slate-50/50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none text-slate-900 placeholder:text-slate-400 font-medium"
              />
            </div>

            {/* PDF Link Field */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <FileText className="w-4 h-4 text-slate-400" />
                PDF Document URL
              </label>
              <div className="relative group">
                <input
                  type="file"
                  name="pdf"
                  accept="application/pdf"
                  onChange={handleChange}
                  required={!form.pdf}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all duration-200 ${form.pdf ? 'bg-indigo-50/50 border-indigo-300' : 'bg-slate-50/50 border-slate-200 group-hover:border-slate-300 focus-within:ring-4 focus-within:ring-indigo-500/10 focus-within:border-indigo-500'}`}>
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className={`p-2 rounded-lg ${form.pdf ? 'bg-indigo-100 text-indigo-600' : 'bg-white text-slate-400 shadow-sm border border-slate-100'}`}>
                      <FileText className="w-4 h-4" />
                    </div>
                    <span className={`text-sm truncate font-medium ${form.pdf ? 'text-indigo-900' : 'text-slate-400'}`}>
                      {form.pdf ? form.pdf.name : 'Choose a PDF file...'}
                    </span>
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1.5 rounded-md shadow-sm border transition-colors ${form.pdf ? 'bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700' : 'bg-white text-slate-600 border-slate-200 group-hover:border-slate-300'}`}>
                    {form.pdf ? 'Change' : 'Browse'}
                  </span>
                </div>
              </div>
            </div>
                 
              {/*image*/}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <UploadCloud className="w-4 h-4 text-slate-400" />
                Upload Book Cover Photo
              </label>
              <div className="relative group">
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  required={!form.image}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all duration-200 ${form.image ? 'bg-indigo-50/50 border-indigo-300' : 'bg-slate-50/50 border-slate-200 group-hover:border-slate-300 focus-within:ring-4 focus-within:ring-indigo-500/10 focus-within:border-indigo-500'}`}>
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className={`p-2 rounded-lg ${form.image ? 'bg-indigo-100 text-indigo-600' : 'bg-white text-slate-400 shadow-sm border border-slate-100'}`}>
                      <UploadCloud className="w-4 h-4" />
                    </div>
                    <span className={`text-sm truncate font-medium ${form.image ? 'text-indigo-900' : 'text-slate-400'}`}>
                      {form.image ? form.image.name : 'Choose an image file...'}
                    </span>
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1.5 rounded-md shadow-sm border transition-colors ${form.image ? 'bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700' : 'bg-white text-slate-600 border-slate-200 group-hover:border-slate-300'}`}>
                    {form.image ? 'Change' : 'Browse'}
                  </span>
                </div>
              </div>
            </div>

            {/* category Field */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Tag className="w-4 h-4 text-slate-400" />
                Category
              </label>
              <select
                value={form.category}
                name="category"
                onChange={handleChange}
                required
                className="w-full h-12 px-4 rounded-xl bg-slate-50/50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none text-slate-900 placeholder:text-slate-400 font-medium"
              >
                <option value="">Category</option>
                <option value="NewArivals">New Arivals</option>
                <option value="TopRecommended">Top Recommended</option>
                <option value="FreeReadingCollection">Free Reading Collection</option>
                <option value="ProgrammingAndTech">Programming & Tech</option>
        
              </select>
            </div>


            {/* Description Field */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <FileText className="w-4 h-4 text-slate-400" />
                Description
              </label>
              <textarea
                placeholder="Write a brief description of the book..."
                value={form.description}
                name="description"
                onChange={handleChange}
                required
                rows="4"
                className="w-full p-4 rounded-xl bg-slate-50/50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none text-slate-900 placeholder:text-slate-400 resize-none font-medium text-[15px]"
              />
            </div>

          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-between border-t border-slate-100 pt-6 gap-4">
            <p className="text-sm text-slate-500 italic">
              All fields are required. Title and PDF URL must be valid.
            </p>
            <button
              type="submit"
              disabled={loading || success}
              className={`px-8 h-12 transition-all text-white font-semibold rounded-xl flex items-center justify-center gap-2 w-full sm:w-auto
                ${success 
                  ? 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/20' 
                  : 'bg-indigo-600 hover:bg-indigo-700 active:scale-95 shadow-[0_8px_30px_rgb(79,70,229,0.2)] hover:shadow-[0_8px_30px_rgb(79,70,229,0.3)]'
                } disabled:opacity-80 disabled:active:scale-100 disabled:cursor-not-allowed
              `}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Saving Book...
                </>
              ) : success ? (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  Added Successfully!
                </>
              ) : (
                <>
                  <BookPlus className="w-5 h-5" />
                  Publish Book
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}