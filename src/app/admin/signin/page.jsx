"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, KeyRound, Mail, ArrowRight, ShieldCheck, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import api from "@/app/api/axios";

export default function AdminSignIn() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      return setError("All fields are required");
    }

    setLoading(true);

    try {
      const res = await api.post("/api/admin/login", formData);

      const data = res.data;

      if (data.success) {
        localStorage.setItem("adminToken", data.token);
        router.push("/admin");
      } else {
        setError(data.message || "Invalid credentials. Please try again.");
      }

    } catch (err) {
      setError("An unexpected error occurred. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-slate-50">
      {/* Left Pane - Branding & Visuals */}
      <div className="hidden lg:flex w-1/2 relative bg-[#0f172a] overflow-hidden flex-col justify-between p-12">
        {/* Abstract Background Design */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600 rounded-full mix-blend-screen filter blur-[120px] opacity-40"></div>
        <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-purple-600 rounded-full mix-blend-screen filter blur-[100px] opacity-40"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-fuchsia-600 rounded-full mix-blend-screen filter blur-[130px] opacity-30"></div>

        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3 text-white">
            <div className="p-3 bg-white/10 rounded-xl backdrop-blur-md border border-white/20 shadow-2xl">
              <BookOpen className="w-8 h-8 text-indigo-300" />
            </div>
            <span className="text-2xl font-bold tracking-tight">eBookHub</span>
          </div>
          <span className="px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-indigo-200 text-xs font-semibold backdrop-blur-sm tracking-widest uppercase">Admin</span>
        </div>

        <div className="relative z-10 mt-12 mb-auto pt-24">
          <h1 className="text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight mb-8">
            Empower your<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-fuchsia-300">digital library.</span>
          </h1>
          <p className="text-lg text-indigo-100/80 max-w-md font-medium leading-relaxed">
            Access the master dashboard to oversee inventory, analyze user activity, and control the entire ecosystem from a secured central command.
          </p>
        </div>

        <div className="relative z-10 flex flex-col gap-6 mt-12 border-t border-white/10 pt-8">
          <div className="flex items-center gap-4 text-indigo-200/60 text-sm font-medium">
            <ShieldCheck className="w-6 h-6 text-emerald-400/80" />
            <span>Secure AES-256 Encrypted Gateway</span>
          </div>
        </div>
      </div>

      {/* Right Pane - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-white relative">
        <div className="w-full max-w-md space-y-10">
          <div className="text-center lg:text-left">
            <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Welcome Back</h2>
            <p className="text-slate-500 mt-3 text-[15px]">Please enter your administrative credentials</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-100 flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="text-red-600 font-semibold text-sm">
                  {error}
                </div>
              </div>
            )}

            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 block">Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                  </div>
                  <Input
                    type="email"
                    placeholder="admin@ebookhub.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-12 h-14 bg-slate-50/50 border-slate-200 hover:border-slate-300 focus-visible:ring-4 focus-visible:ring-indigo-600/10 focus-visible:border-indigo-600 transition-all rounded-xl text-[15px] font-medium placeholder:text-slate-400"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-slate-700 block">Password</label>
                  <a href="#" className="text-[13px] font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">Forgot password?</a>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <KeyRound className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                  </div>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="pl-12 h-14 bg-slate-50/50 border-slate-200 hover:border-slate-300 focus-visible:ring-4 focus-visible:ring-indigo-600/10 focus-visible:border-indigo-600 transition-all rounded-xl text-[15px] font-medium placeholder:text-slate-400"
                    required
                  />
                </div>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-[15px] font-semibold shadow-[0_8px_30px_rgb(79,70,229,0.2)] hover:shadow-[0_8px_30px_rgb(79,70,229,0.3)] transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  Login to Dashboard
                  <ArrowRight className="w-5 h-5 ml-1" />
                </>
              )}
            </Button>
          </form>

          <p className="text-center text-xs font-medium text-slate-400 mt-10">
            &copy; {new Date().getFullYear()} eBookHub. All rights reserved.<br/>
            Protected by reCAPTCHA and subject to the Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}