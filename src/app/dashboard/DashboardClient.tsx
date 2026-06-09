"use client";

import { motion } from "framer-motion";
import LogoutButton from "@/components/LogoutButton";
import { Activity, CheckCircle2, ShieldCheck, Cpu } from "lucide-react";

export default function DashboardClient({ user }: { user: any }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="relative min-h-screen bg-[#FAFAFA] flex-1 overflow-hidden pt-20">
      {/* Background gradients */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], rotate: [0, 45, 0] }} 
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[10%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-br from-indigo-100/40 to-transparent blur-3xl mix-blend-multiply"
        />
      </div>
      
      <main className="relative z-10 max-w-5xl mx-auto px-6 pb-20">
        
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-10"
        >
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
              Dashboard
            </h1>
            <p className="mt-2 text-sm text-zinc-500">
              Resumen de seguridad y actividad de la cuenta.
            </p>
          </div>
          <LogoutButton />
        </motion.header>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Welcome Card - spans 2 columns */}
          <motion.div variants={itemVariants} className="md:col-span-2 bg-white rounded-3xl p-8 border border-zinc-200 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 transform group-hover:scale-110 transition-transform duration-700">
              <ShieldCheck className="h-32 w-32 text-zinc-900" />
            </div>
            
            <div className="flex items-center gap-5 mb-6 relative z-10">
              <div className="h-14 w-14 rounded-full bg-zinc-900 flex items-center justify-center shadow-lg shadow-zinc-900/20">
                <span className="text-xl font-medium text-white">
                  {user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || "?"}
                </span>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-zinc-900">
                  Hola, {user?.name?.split(" ")[0] || user?.email?.split("@")[0]}
                </h2>
                <p className="text-zinc-500 text-sm">Sesión activa y protegida.</p>
              </div>
            </div>
          </motion.div>

          {/* Status Card */}
          <motion.div variants={itemVariants} className="bg-zinc-900 rounded-3xl p-8 shadow-lg shadow-zinc-900/10 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 -mr-10 -mt-10 h-32 w-32 rounded-full bg-white/10 blur-2xl group-hover:bg-white/20 transition-colors duration-500"></div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-white/10 backdrop-blur-md text-white">
                <Activity className="h-5 w-5" />
              </div>
            </div>
            <h3 className="text-zinc-400 font-medium text-sm mb-1">Estado de Conexión</h3>
            <p className="text-3xl font-semibold tracking-tight">Segura</p>
          </motion.div>

          {/* Metric 1 */}
          <motion.div variants={itemVariants} className="bg-white rounded-3xl p-8 border border-zinc-200 shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100 transition-colors">
                <CheckCircle2 className="h-5 w-5" />
              </div>
            </div>
            <h3 className="text-zinc-500 font-medium text-sm mb-1">Verificación</h3>
            <p className="text-2xl font-semibold text-zinc-900">Completada</p>
          </motion.div>

          {/* Metric 2 */}
          <motion.div variants={itemVariants} className="bg-white rounded-3xl p-8 border border-zinc-200 shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100 transition-colors">
                <ShieldCheck className="h-5 w-5" />
              </div>
            </div>
            <h3 className="text-zinc-500 font-medium text-sm mb-1">Nivel de Acceso</h3>
            <p className="text-2xl font-semibold text-zinc-900">Autorizado</p>
          </motion.div>

          {/* Metric 3 */}
          <motion.div variants={itemVariants} className="bg-white rounded-3xl p-8 border border-zinc-200 shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-xl bg-purple-50 text-purple-600 group-hover:bg-purple-100 transition-colors">
                <Cpu className="h-5 w-5" />
              </div>
            </div>
            <h3 className="text-zinc-500 font-medium text-sm mb-1">Protocolo</h3>
            <p className="text-lg font-semibold text-zinc-900 truncate">OAuth 2.0 / JWT</p>
          </motion.div>

        </motion.div>
      </main>
    </div>
  );
}
