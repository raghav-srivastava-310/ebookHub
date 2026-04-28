import Link from "next/link";
import { BookOpen, Facebook, Instagram, Twitter, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white   ">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* 🔹 Brand */}
        <div>
          <div className="flex items-center gap-2 text-white mb-4">
            <BookOpen className="w-6 h-6 text-yellow-400" />
            <h2 className="text-xl font-bold">EBOOK HUB</h2>
          </div>
          <p className="text-sm leading-relaxed">
            EBOOK HUB is your digital library for academic, competitive,
            and fiction books. Read anytime, anywhere.
          </p>
        </div>

        {/* 🔹 Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-yellow-400">Home</Link></li>
            <li><a href="#ProgrammingAndTech" className="hover:text-yellow-400">Programming And Tech</a></li>
            <li><a href="#toprecommended" className="hover:text-yellow-400">Top Recommended</a></li>
            <li><a href="#FreeBooks" className="hover:text-yellow-400">Free Books</a></li>
          </ul>
        </div>

        {/* 🔹 Categories */}
        <div>
          <h3 className="text-white font-semibold mb-4">Categories</h3>
          <ul className="space-y-2 text-sm">
            <li>Academic Books</li>
            <li>Competitive Exams</li>
            <li>Novels & Stories</li>
            <li>Programming & Tech</li>
          </ul>
        </div>

        {/* 🔹 Social */}
        <div>
          <h3 className="text-white font-semibold mb-4">Connect With Us</h3>
          <div className="flex gap-4">
            <Facebook className="w-5 h-5 hover:text-yellow-400 cursor-pointer" />
            <Instagram className="w-5 h-5 hover:text-yellow-400 cursor-pointer" />
            <Twitter className="w-5 h-5 hover:text-yellow-400 cursor-pointer" />
            <Github className="w-5 h-5 hover:text-yellow-400 cursor-pointer" />
          </div>
        </div>

      </div>

      {/* 🔹 Bottom Bar */}
      <div className="border-t border-white/10 py-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} BookNest. All Rights Reserved.
      </div>
    </footer>
  );
}
