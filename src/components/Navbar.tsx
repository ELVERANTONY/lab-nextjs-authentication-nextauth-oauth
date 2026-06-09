"use client";

import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { Shield } from "lucide-react";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`fixed top-0 inset-x-0 z-50 flex items-center justify-center p-4 transition-all duration-300`}
    >
      <div 
        className={`flex w-full max-w-5xl items-center justify-between px-6 py-3 rounded-2xl transition-all duration-500 ${
          isScrolled 
            ? "bg-white/70 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)]" 
            : "bg-transparent"
        }`}
      >
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-zinc-900 p-1.5 rounded-lg">
            <Shield className="h-4 w-4 text-white" />
          </div>
          <span className="font-semibold text-zinc-900 tracking-tight">NextAuth<span className="text-zinc-500">Pro</span></span>
        </Link>
        
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors">
            Dashboard
          </Link>
          <Link href="/profile" className="text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors">
            Perfil
          </Link>
          <div className="h-4 w-[1px] bg-zinc-200"></div>
          <Link href="/signIn">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white shadow-md hover:bg-zinc-800 transition-colors"
            >
              Entrar
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
