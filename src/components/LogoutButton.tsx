"use client";

import { signOut } from "next-auth/react";
import { motion } from "framer-motion";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => signOut({ callbackUrl: "/" })}
      className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm hover:bg-zinc-50 hover:text-red-600 transition-colors"
    >
      <LogOut className="h-4 w-4" />
      <span>Cerrar Sesión</span>
    </motion.button>
  );
}
