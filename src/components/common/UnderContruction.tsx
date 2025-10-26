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
    y: [-10, 10, -10],
    rotate: [-5, 5, -5],
    transition: {
      duration: 3,
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
      className="min-h-screen bg-blue-50 flex items-center justify-center p-4"
    >
      <div className="max-w-4xl w-full">

        {/* Iconos flotantes de fondo */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            variants={iconFloatVariants}
            initial="hidden"
            animate={["visible", "float"]}
            className="absolute top-20 left-20 text-blue-200"
          >
            <Wrench className="h-12 w-12" />
          </motion.div>
          <motion.div
            variants={iconFloatVariants}
            initial="hidden"
            animate={["visible", "float"]}
            transition={{ delay: 0.5 }}
            className="absolute top-32 right-32 text-blue-200"
          >
            <Hammer className="h-10 w-10" />
          </motion.div>
          <motion.div
            variants={iconFloatVariants}
            initial="hidden"
            animate={["visible", "float"]}
            transition={{ delay: 1 }}
            className="absolute bottom-20 left-32 text-blue-200"
          >
            <Settings className="h-8 w-8" />
          </motion.div>
          <motion.div
            variants={iconFloatVariants}
            initial="hidden"
            animate={["visible", "float"]}
            transition={{ delay: 1.5 }}
            className="absolute bottom-32 right-20 text-blue-200"
          >
            <Construction className="h-14 w-14" />
          </motion.div>
        </div>

        <Card className="bg-white border-0 shadow-2xl relative z-10">
          <CardContent className="p-12 text-center">

            {/* Icono principal */}
            <motion.div
              variants={itemVariants}
              className="flex justify-center mb-8"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-blue-100 rounded-full blur-xl"></div>
                <div className="relative bg-blue-500 p-8 rounded-full">
                  <Construction className="h-16 w-16 text-white" />
                </div>
              </div>
            </motion.div>

            {/* Título principal */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold text-blue-900 mb-4"
            >
              Página en Construcción
            </motion.h1>

            {/* Subtítulo */}
            <motion.p
              variants={itemVariants}
              className="text-xl text-blue-700 mb-8 max-w-2xl mx-auto"
            >
              Estamos trabajando duro para traerte una experiencia increíble.
              Esta sección estará disponible muy pronto.
            </motion.p>

            {/* Características que vienen */}
            <motion.div
              variants={itemVariants}
              className="bg-blue-50 rounded-xl p-8 mb-8"
            >
              <h3 className="text-lg font-semibold text-blue-900 mb-4">
                ¿Qué estamos preparando?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2 text-blue-700">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Nuevas funcionalidades</span>
                </div>
                <div className="flex items-center gap-2 text-blue-700">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Mejor experiencia de usuario</span>
                </div>
                <div className="flex items-center gap-2 text-blue-700">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Diseño optimizado</span>
                </div>
              </div>
            </motion.div>

            {/* Información de progreso */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center gap-4 mb-8 text-blue-600"
            >
              <Clock className="h-5 w-5" />
              <span className="text-sm font-medium">
                Tiempo estimado de finalización: Próximamente
              </span>
            </motion.div>

            {/* Barra de progreso simulada */}
            <motion.div
              variants={itemVariants}
              className="w-full bg-blue-100 rounded-full h-3 mb-8 overflow-hidden"
            >
              <motion.div
                className="bg-blue-500 h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "75%" }}
                transition={{ duration: 2, delay: 1 }}
              />
            </motion.div>

            {/* Botones de acción */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                onClick={() => navigate(-1)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver Atrás
              </Button>

              <Button
                variant="outline"
                onClick={() => navigate('/')}
                className="border-blue-500 text-blue-600 hover:bg-blue-50 px-8 py-3"
              >
                Ir al Inicio
              </Button>
            </motion.div>

            {/* Información adicional */}
            <motion.div
              variants={itemVariants}
              className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200"
            >
              <p className="text-sm text-blue-700">
                <strong>¿Necesitas ayuda?</strong> Contacta a nuestro equipo de soporte
                mientras trabajamos en esta nueva funcionalidad.
              </p>
            </motion.div>

          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default UnderConstruction;