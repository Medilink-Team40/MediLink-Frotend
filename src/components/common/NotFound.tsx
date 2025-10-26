import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Home, RefreshCw, Search } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useState, useEffect } from "react";
import NotFoundImage from '@/assets/404.png';

const MotionButton = motion.create(Button);

// Componente de partículas flotantes para el fondo
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-blue-200/30 rounded-full"
          initial={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
          }}
          animate={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

// Mensajes dinámicos que cambian
const dynamicMessages = [
  "Lo sentimos, no pudimos encontrar la página que estás buscando.",
  "Parece que esta página decidió tomarse unas vacaciones.",
  "¡Oops! Parece que te has perdido en el ciberespacio.",
  "Esta página está jugando al escondite y ganando."
];

const NotFound = () => {
  const navigate = useNavigate();
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Cambiar mensaje cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentMessageIndex((prev) => (prev + 1) % dynamicMessages.length);
        setIsVisible(true);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Animaciones de container con tipado correcto
  const containerVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1], // Cubic bezier para easeOut
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: {
      y: 20,
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1] // Cubic bezier para easeOut
      }
    }
  };

  // Efectos de hover para la imagen
  const imageVariants: Variants = {
    idle: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.5
      }
    },
    hover: {
      scale: 1.05,
      rotate: [0, -2, 2, -2, 0],
      transition: {
        scale: { duration: 0.3 },
        rotate: {
          duration: 0.6,
          ease: [0.42, 0, 0.58, 1] // Cubic bezier para easeInOut
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      <FloatingParticles />

      {/* Efectos de fondo adicionales */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-200/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-200/20 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-200/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <motion.div
          className="max-w-5xl w-full bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex flex-col lg:flex-row">
            {/* Sección de la imagen con animación mejorada */}
            <motion.div
              className="lg:w-1/2 p-8 flex items-center justify-center bg-linear-to-br from-blue-50/50 to-indigo-100/50"
              variants={itemVariants}
            >
              <motion.div
                variants={imageVariants}
                initial="idle"
                whileHover="hover"
                className="relative"
              >
                {/* Efecto de brillo detrás de la imagen */}
                <motion.div
                  className="absolute inset-0 bg-blue-400/20 rounded-full blur-2xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: [0.42, 0, 0.58, 1] // Cubic bezier para easeInOut
                  }}
                />

                <motion.img
                  src={NotFoundImage}
                  alt="Página no encontrada"
                  className="relative z-10 w-full max-w-sm h-auto object-contain filter drop-shadow-lg"
                />

                {/* Números 404 flotantes */}
                <motion.div
                  className="absolute -top-4 -right-4 text-6xl font-bold text-blue-200/30 pointer-events-none"
                  animate={{
                    y: [-5, 5, -5],
                    rotate: [0, 5, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: [0.42, 0, 0.58, 1] // Cubic bezier para easeInOut
                  }}
                >
                  404
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Sección de contenido mejorada */}
            <motion.div
              className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center"
              variants={itemVariants}
            >
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium w-fit"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                <Search className="h-4 w-4" />
                Error 404
              </motion.div>

              <motion.h1
                className="mt-6 text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
                variants={itemVariants}
              >
                ¡Ups! Página{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">
                  no encontrada
                </span>
              </motion.h1>

              <AnimatePresence mode="wait">
                <motion.p
                  key={currentMessageIndex}
                  className="mt-6 text-lg text-gray-600 leading-relaxed"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -10 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {dynamicMessages[currentMessageIndex]}
                </motion.p>
              </AnimatePresence>

              <motion.p
                className="mt-2 text-gray-500"
                variants={itemVariants}
              >
                Pero no te preocupes, tenemos algunas opciones para ayudarte a encontrar lo que buscas.
              </motion.p>

              <motion.div
                className="mt-8 flex flex-col sm:flex-row gap-4"
                variants={itemVariants}
              >
                <MotionButton
                  onClick={() => navigate(-1)}
                  className="inline-flex items-center gap-2 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg"
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ArrowLeft className="h-4 w-4" />
                  Volver atrás
                </MotionButton>

                <MotionButton
                  variant="outline"
                  onClick={() => navigate('/')}
                  className="inline-flex items-center gap-2 border-2 border-gray-300 hover:border-blue-500 hover:text-blue-600"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Home className="h-4 w-4" />
                  Ir al inicio
                </MotionButton>

                <MotionButton
                  variant="ghost"
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <RefreshCw className="h-4 w-4" />
                  Recargar
                </MotionButton>
              </motion.div>

              {/* Información adicional */}
              <motion.div
                className="mt-8 p-4 bg-gray-50/50 rounded-xl border border-gray-200/50"
                variants={itemVariants}
              >
                <p className="text-sm text-gray-600">
                  <strong>Consejo:</strong> Verifica que la URL esté escrita correctamente o contacta al administrador si crees que esto es un error.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;