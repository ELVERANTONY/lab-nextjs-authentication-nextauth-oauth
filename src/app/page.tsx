"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, Zap, Lock, ChevronRight } from "lucide-react";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-[#FAFAFA]">
      
      {/* Animated abstract background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex items-center justify-center">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }} 
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute w-[60vw] h-[60vw] rounded-full bg-gradient-to-br from-indigo-200/20 via-blue-100/20 to-purple-100/20 blur-3xl mix-blend-multiply"
        />
      </div>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 text-center"
      >
        <div className="mx-auto max-w-4xl">
          
          <motion.div variants={itemVariants} className="mb-8 flex justify-center">
            <div className="relative rounded-full px-4 py-1.5 text-sm font-medium leading-6 text-zinc-600 bg-white/60 backdrop-blur-md border border-zinc-200/50 shadow-sm hover:shadow-md hover:bg-white transition-all cursor-pointer flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-indigo-500"></span>
              Autenticación moderna y segura <span className="text-zinc-400">|</span> 
              <span className="text-indigo-600 flex items-center">Laboratorio 13 <ChevronRight className="h-4 w-4" /></span>
            </div>
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-5xl font-semibold tracking-tight text-zinc-900 sm:text-7xl mb-8 leading-[1.1]">
            Acceso sin fricciones para tus usuarios.
          </motion.h1>
          
          <motion.p variants={itemVariants} className="mt-6 text-lg leading-8 text-zinc-500 max-w-2xl mx-auto font-medium">
            Integra NextAuth.js con proveedores sociales y credenciales protegidas por encriptación Bcrypt. Experiencia limpia, fluida y escalable.
          </motion.p>
          
          <motion.div variants={itemVariants} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center justify-center gap-2 rounded-full bg-zinc-900 px-8 py-3.5 text-sm font-medium text-white shadow-xl shadow-zinc-900/20 hover:bg-zinc-800 transition-all w-full sm:w-auto"
              >
                Comenzar ahora
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </motion.button>
            </Link>
            
            <Link href="/signIn">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-medium text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-200 hover:bg-zinc-50 transition-all w-full sm:w-auto"
              >
                Inicia sesión
              </motion.button>
            </Link>
          </motion.div>
        </div>

        <motion.div variants={containerVariants} className="mt-32 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <motion.div variants={itemVariants} whileHover={{ y: -5 }} className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-left group">
              <div className="rounded-xl bg-indigo-50 p-3 w-fit mb-6 text-indigo-600 group-hover:scale-110 transition-transform duration-300">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 mb-2">Despliegue Rápido</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Arquitectura Edge ready optimizada para tiempos de respuesta ultra bajos y carga instantánea.
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants} whileHover={{ y: -5 }} className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-left group">
              <div className="rounded-xl bg-emerald-50 p-3 w-fit mb-6 text-emerald-600 group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 mb-2">Máxima Seguridad</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Protección nativa contra fuerza bruta, gestión segura de JWT y contraseñas hasheadas.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} whileHover={{ y: -5 }} className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-left group">
              <div className="rounded-xl bg-purple-50 p-3 w-fit mb-6 text-purple-600 group-hover:scale-110 transition-transform duration-300">
                <Lock className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 mb-2">Rutas Protegidas</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Middleware avanzado que verifica la sesión en servidor antes de revelar cualquier contenido.
              </p>
            </motion.div>

          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
