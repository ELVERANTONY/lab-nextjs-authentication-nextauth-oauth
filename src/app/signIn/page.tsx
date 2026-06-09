"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { FaGoogle, FaGithub } from "react-icons/fa";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError(res.error);
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.1 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#FAFAFA] selection:bg-zinc-200">
      
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }} 
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -right-[10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-indigo-100/40 to-purple-100/40 blur-3xl mix-blend-multiply"
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, -90, 0] }} 
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-tr from-blue-100/40 to-cyan-100/40 blur-3xl mix-blend-multiply"
        />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="z-10 w-full max-w-[420px] px-6"
      >
        <motion.div variants={itemVariants} className="text-center mb-8">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-900 shadow-xl shadow-zinc-200 mb-6">
            <Lock className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-900">Bienvenido de nuevo</h2>
          <p className="text-sm text-zinc-500 mt-2">Introduce tus datos para acceder a tu cuenta.</p>
        </motion.div>

        <motion.div variants={itemVariants} className="relative rounded-2xl bg-white/60 p-8 shadow-[0_0_40px_-15px_rgba(0,0,0,0.05)] backdrop-blur-xl border border-white">
          
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }} 
              animate={{ opacity: 1, height: "auto" }} 
              className="mb-6 rounded-lg bg-red-50 p-3 text-sm text-red-600 border border-red-100 flex items-center justify-center"
            >
              {error}
            </motion.div>
          )}

          <div className="grid grid-cols-2 gap-3 mb-6">
            <motion.button
              whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
              whileTap={{ scale: 0.98 }}
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
              className="flex items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
            >
              <FaGoogle className="text-red-500 text-base" />
              <span>Google</span>
            </motion.button>

            <motion.button
              whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
              whileTap={{ scale: 0.98 }}
              onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
              className="flex items-center justify-center gap-2 rounded-xl bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
            >
              <FaGithub className="h-4 w-4" />
              <span>GitHub</span>
            </motion.button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-widest">
              <span className="bg-transparent px-2 text-zinc-400">O con email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-zinc-700 ml-1">Correo Electrónico</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400 group-focus-within:text-zinc-900 transition-colors">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-xl border border-zinc-200 bg-white/50 px-10 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 transition-all"
                  placeholder="ejemplo@acme.com"
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between ml-1">
                <label className="text-xs font-medium text-zinc-700">Contraseña</label>
                <a href="#" className="text-xs font-medium text-indigo-600 hover:text-indigo-500 transition-colors">¿Olvidaste tu contraseña?</a>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400 group-focus-within:text-zinc-900 transition-colors">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-xl border border-zinc-200 bg-white/50 px-10 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={loading}
              className="relative mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-zinc-800 disabled:opacity-70 transition-colors"
            >
              {loading ? "Autenticando..." : "Iniciar Sesión"}
              {!loading && <ArrowRight className="h-4 w-4" />}
            </motion.button>
          </form>

        </motion.div>

        <motion.p variants={itemVariants} className="mt-8 text-center text-sm text-zinc-500">
          ¿Aún no tienes una cuenta?{" "}
          <Link href="/register" className="font-medium text-zinc-900 hover:underline underline-offset-4">
            Regístrate
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
}
