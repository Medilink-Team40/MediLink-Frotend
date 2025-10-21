import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import NotFoundImage from '@/assets/404.png';

const MotionButton = motion(Button);

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Sección de la imagen con animación */}
          <div className="md:w-1/2 p-8 flex items-center justify-center bg-blue-50">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                rotate: [0, -5, 5, -5, 0]
              }}
              transition={{ 
                duration: 1.5,
                ease: "easeInOut",
                rotate: { 
                  repeat: Infinity, 
                  duration: 4,
                  ease: "easeInOut"
                }
              }}
            >
              <motion.img 
                src={NotFoundImage} 
                alt="Página no encontrada" 
                className="w-full max-w-xs h-auto object-contain"
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
              />
            </motion.div>
          </div>
          
          {/* Sección de contenido */}
          <motion.div 
            className="md:w-1/2 p-8 flex flex-col justify-center"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <motion.p 
              className="text-sm font-semibold text-blue-600"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Error 404
            </motion.p>
            <motion.h1 
              className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              ¡Ups! Página no encontrada
            </motion.h1>
            <motion.p 
              className="mt-4 text-gray-600"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              Lo sentimos, no pudimos encontrar la página que estás buscando. 
              Parece que el enlace puede estar roto o la página ha sido eliminada.
            </motion.p>
            
            <motion.div 
              className="mt-8 flex flex-col sm:flex-row gap-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <MotionButton 
                onClick={() => navigate(-1)}
                className="inline-flex items-center gap-2"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <ArrowLeft className="h-4 w-4" />
                Volver atrás
              </MotionButton>
              <MotionButton 
                variant="outline"
                onClick={() => navigate('/')}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Ir al inicio
              </MotionButton>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;