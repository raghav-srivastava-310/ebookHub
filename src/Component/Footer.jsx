import Link from "next/link";
import { BookOpen, Facebook, Instagram, Twitter, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 text-gray-600 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* 🔹 Brand */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-indigo-600">
            <BookOpen className="w-7 h-7" />
            <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">EBOOK HUB</h2>
          </div>
          <p className="text-sm leading-relaxed text-gray-500 font-medium">
            Your premium digital library for academic, competitive,
            and fiction books. Read anytime, anywhere.
          </p>
        </div>

        {/* 🔹 Quick Links */}
        <div>
          <h3 className="text-gray-900 font-bold mb-6 uppercase tracking-wider text-sm">Quick Links</h3>
          <ul className="space-y-3 text-sm font-medium">
            <li><Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link></li>
            <li><a href="#ProgrammingAndTech" className="hover:text-indigo-600 transition-colors">Programming And Tech</a></li>
            <li><a href="#toprecommended" className="hover:text-indigo-600 transition-colors">Top Recommended</a></li>
            <li><a href="#FreeBooks" className="hover:text-indigo-600 transition-colors">Free Books</a></li>
          </ul>
        </div>

        {/* 🔹 Categories */}
        <div>
          <h3 className="text-gray-900 font-bold mb-6 uppercase tracking-wider text-sm">Categories</h3>
          <ul className="space-y-3 text-sm font-medium">
            <li className="hover:text-indigo-600 cursor-pointer transition-colors">Academic Books</li>
            <li className="hover:text-indigo-600 cursor-pointer transition-colors">Competitive Exams</li>
            <li className="hover:text-indigo-600 cursor-pointer transition-colors">Novels & Stories</li>
            <li className="hover:text-indigo-600 cursor-pointer transition-colors">Programming & Tech</li>
          </ul>
        </div>

        {/* 🔹 Social */}
        <div>
          <h3 className="text-gray-900 font-bold mb-6 uppercase tracking-wider text-sm">Connect With Us</h3>
          <div className="flex gap-4">
            <div className="bg-white p-2.5 rounded-full shadow-sm hover:shadow-md hover:text-indigo-600 transition-all cursor-pointer border border-gray-100">
              <Facebook className="w-5 h-5" />
            </div>
            <div className="bg-white p-2.5 rounded-full shadow-sm hover:shadow-md hover:text-indigo-600 transition-all cursor-pointer border border-gray-100">
              <Instagram className="w-5 h-5" />
            </div>
            <div className="bg-white p-2.5 rounded-full shadow-sm hover:shadow-md hover:text-indigo-600 transition-all cursor-pointer border border-gray-100">
              <Twitter className="w-5 h-5" />
            </div>
            <div className="bg-white p-2.5 rounded-full shadow-sm hover:shadow-md hover:text-indigo-600 transition-all cursor-pointer border border-gray-100">
              <Github className="w-5 h-5" />
            </div>
          </div>
        </div>

      </div>

      {/* 🔹 Bottom Bar */}
      <div className="border-t border-gray-200 py-6 text-center text-sm font-medium text-gray-500">
        © {new Date().getFullYear()} Ebook Hub. All Rights Reserved.
      </div>
    </footer>
  );
}
