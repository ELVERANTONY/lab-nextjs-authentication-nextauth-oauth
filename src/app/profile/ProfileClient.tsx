"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { User, Mail, Shield, Key, Clock, Trash2 } from "lucide-react";

export default function ProfileClient({ user }: { user: any }) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="relative min-h-screen bg-[#FAFAFA] flex-1 overflow-hidden pt-20">
      
      {/* Background gradients */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, -45, 0] }} 
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -right-[10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-bl from-zinc-200/40 to-transparent blur-3xl mix-blend-multiply"
        />
      </div>

      <main className="relative z-10 max-w-5xl mx-auto px-6 pb-20">
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
            Ajustes de Perfil
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            Administra tu información personal y credenciales.
          </p>
        </motion.header>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Avatar Card */}
          <motion.div variants={itemVariants} className="bg-white rounded-3xl p-8 border border-zinc-200 shadow-sm flex flex-col items-center text-center">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="relative mb-6 cursor-pointer group"
            >
              {user?.image ? (
                <Image
                  className="h-32 w-32 rounded-full object-cover shadow-xl shadow-zinc-200/50"
                  src={user.image}
                  alt="Avatar del usuario"
                  width={128}
                  height={128}
                />
              ) : (
                <div className="h-32 w-32 rounded-full bg-zinc-100 flex items-center justify-center shadow-inner">
                  <User className="h-12 w-12 text-zinc-400" />
                </div>
              )}
              <div className="absolute inset-0 rounded-full bg-zinc-900/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white text-xs font-medium">Cambiar foto</span>
              </div>
            </motion.div>
            
            <h2 className="text-xl font-semibold text-zinc-900">
              {user?.name || "Usuario Activo"}
            </h2>
            <p className="text-sm text-zinc-500 mt-1">Usuario Verificado</p>
            
            <div className="mt-6 inline-flex items-center rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 mr-2 animate-pulse"></div>
              Cuenta Activa
            </div>
          </motion.div>

          {/* Details Card */}
          <motion.div variants={itemVariants} className="md:col-span-2 space-y-6">
            
            <div className="bg-white rounded-3xl p-8 border border-zinc-200 shadow-sm">
              <h3 className="text-base font-semibold text-zinc-900 flex items-center gap-2 mb-6">
                <Shield className="h-5 w-5 text-zinc-900" />
                Detalles de Contacto
              </h3>
              
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-zinc-50/50 border border-zinc-100 group hover:border-zinc-300 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-zinc-600 shrink-0 group-hover:bg-zinc-900 group-hover:text-white group-hover:border-zinc-900 transition-colors">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-zinc-500">Correo Electrónico</p>
                      <p className="text-sm font-medium text-zinc-900">{user?.email}</p>
                    </div>
                  </div>
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="mt-4 sm:mt-0 text-xs font-medium text-zinc-700 bg-white border border-zinc-200 px-3 py-1.5 rounded-lg hover:bg-zinc-50 transition-colors shadow-sm">
                    Modificar
                  </motion.button>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-zinc-50/50 border border-zinc-100 group hover:border-zinc-300 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-zinc-600 shrink-0 group-hover:bg-zinc-900 group-hover:text-white group-hover:border-zinc-900 transition-colors">
                      <Key className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-zinc-500">ID de Sesión</p>
                      <p className="text-xs font-mono text-zinc-700 mt-1 bg-white px-2 py-0.5 rounded border border-zinc-200 inline-block">
                        {user?.id || "No disponible"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-zinc-50/50 border border-zinc-100 group hover:border-zinc-300 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-zinc-600 shrink-0 group-hover:bg-zinc-900 group-hover:text-white group-hover:border-zinc-900 transition-colors">
                      <Clock className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-zinc-500">Proveedor</p>
                      <p className="text-sm font-medium text-zinc-900">NextAuth.js</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <motion.div variants={itemVariants} className="bg-red-50/50 rounded-3xl p-8 border border-red-100">
              <h4 className="text-base font-semibold text-red-900 mb-2 flex items-center gap-2">
                <Trash2 className="h-4 w-4" />
                Zona de Peligro
              </h4>
              <p className="text-sm text-red-700/80 mb-6 max-w-md">
                Eliminar tu cuenta borrará todos tus datos permanentemente. Esta acción es irreversible.
              </p>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="text-sm font-medium text-red-600 bg-white px-5 py-2.5 rounded-xl border border-red-200 shadow-sm hover:bg-red-50 hover:border-red-300 transition-colors"
              >
                Eliminar Cuenta Permanentemente
              </motion.button>
            </motion.div>

          </motion.div>

        </motion.div>
      </main>
    </div>
  );
}
