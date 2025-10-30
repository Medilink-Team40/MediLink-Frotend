import { motion, Variants } from 'framer-motion';
import { Construction, Clock, ArrowLeft, Settings, Wrench, Hammer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

// Configuración de animaciones con tipado correcto
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

const iconFloatVariants: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 }
  },
  float: {
    y: [-5, 5, -5],
    rotate: [-3, 3, -3],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const UnderConstruction = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4"
    >
      <div className="max-w-2xl w-full relative">

        {/* Iconos flotantes de fondo - Más pequeños y sutiles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            variants={iconFloatVariants}
            initial="hidden"
            animate={["visible", "float"]}
            className="absolute top-10 left-10 text-blue-200/40"
          >
            <Wrench className="h-6 w-6" />
          </motion.div>
          <motion.div
            variants={iconFloatVariants}
            initial="hidden"
            animate={["visible", "float"]}
            transition={{ delay: 0.5 }}
            className="absolute top-16 right-16 text-blue-200/40"
          >
            <Hammer className="h-5 w-5" />
          </motion.div>
          <motion.div
            variants={iconFloatVariants}
            initial="hidden"
            animate={["visible", "float"]}
            transition={{ delay: 1 }}
            className="absolute bottom-16 left-16 text-blue-200/40"
          >
            <Settings className="h-4 w-4" />
          </motion.div>
          <motion.div
            variants={iconFloatVariants}
            initial="hidden"
            animate={["visible", "float"]}
            transition={{ delay: 1.5 }}
            className="absolute bottom-10 right-10 text-blue-200/40"
          >
            <Construction className="h-7 w-7" />
          </motion.div>
        </div>

        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl relative z-10">
          <CardContent className="p-8">

            {/* Icono principal - Más compacto */}
            <motion.div
              variants={itemVariants}
              className="flex justify-center mb-6"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-blue-100 rounded-full blur-lg"></div>
                <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-full">
                  <Construction className="h-10 w-10 text-white" />
                </div>
              </div>
            </motion.div>

            {/* Título principal - Más pequeño */}
            <motion.h1
              variants={itemVariants}
              className="text-2xl md:text-3xl font-bold text-blue-900 mb-3 text-center"
            >
              Página en Construcción
            </motion.h1>

            {/* Subtítulo - Más compacto */}
            <motion.p
              variants={itemVariants}
              className="text-blue-700 mb-6 text-center text-sm md:text-base"
            >
              Estamos trabajando para traerte una experiencia increíble.
              <br className="hidden md:block" />
              Esta sección estará disponible muy pronto.
            </motion.p>

            {/* Características que vienen - Más compacto */}
            <motion.div
              variants={itemVariants}
              className="bg-blue-50 rounded-lg p-4 mb-6"
            >
              <h3 className="text-sm font-semibold text-blue-900 mb-3 text-center">
                ¿Qué estamos preparando?
              </h3>
              <div className="grid grid-cols-1 gap-2 text-xs">
                <div className="flex items-center gap-2 text-blue-700 justify-center">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  <span>Nuevas funcionalidades</span>
                </div>
                <div className="flex items-center gap-2 text-blue-700 justify-center">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  <span>Mejor experiencia de usuario</span>
                </div>
                <div className="flex items-center gap-2 text-blue-700 justify-center">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  <span>Diseño optimizado</span>
                </div>
              </div>
            </motion.div>

            {/* Información de progreso - Más pequeño */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center gap-2 mb-4 text-blue-600"
            >
              <Clock className="h-4 w-4" />
              <span className="text-xs font-medium">
                Tiempo estimado: Próximamente
              </span>
            </motion.div>

            {/* Barra de progreso - Más delgada */}
            <motion.div
              variants={itemVariants}
              className="w-full bg-blue-100 rounded-full h-2 mb-6 overflow-hidden"
            >
              <motion.div
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "75%" }}
                transition={{ duration: 2, delay: 1 }}
              />
            </motion.div>

            {/* Botones de acción - Más compactos */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3 justify-center"
            >
              <Button
                onClick={() => navigate(-1)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 text-sm"
                size="sm"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver Atrás
              </Button>

              <Button
                variant="outline"
                onClick={() => navigate('/')}
                className="border-blue-500 text-blue-600 hover:bg-blue-50 px-6 py-2 text-sm"
                size="sm"
              >
                Ir al Inicio
              </Button>
            </motion.div>

            {/* Información adicional - Más pequeña */}
            <motion.div
              variants={itemVariants}
              className="mt-6 p-3 bg-blue-50/50 rounded-lg border border-blue-200/50"
            >
              <p className="text-xs text-blue-700 text-center">
                <strong>¿Necesitas ayuda?</strong> Contacta a nuestro equipo mientras trabajamos en esta funcionalidad.
              </p>
            </motion.div>

          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default UnderConstruction;