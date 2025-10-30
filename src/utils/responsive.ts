// src/utils/responsive.ts

/**
 * Utilidades para manejo de responsive design
 */

// Breakpoints de Tailwind CSS
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

/**
 * Hook para detectar el tamaño de la pantalla
 */
export const useResponsive = () => {
  if (typeof window === 'undefined') {
    return {
      width: 1024,
      height: 768,
      isMobile: false,
      isTablet: false,
      isDesktop: true,
    };
  }

  const width = window.innerWidth;
  const height = window.innerHeight;

  return {
    width,
    height,
    isMobile: width < breakpoints.md,
    isTablet: width >= breakpoints.md && width < breakpoints.lg,
    isDesktop: width >= breakpoints.lg,
  };
};

/**
 * Clases responsive comunes
 */
export const responsiveClasses = {
  // Containers
  container: 'w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  containerSmall: 'w-full max-w-4xl mx-auto px-4 sm:px-6',
  
  // Text sizes
  headingXL: 'text-2xl sm:text-3xl lg:text-4xl xl:text-5xl',
  headingLG: 'text-xl sm:text-2xl lg:text-3xl xl:text-4xl',
  headingMD: 'text-lg sm:text-xl lg:text-2xl',
  textLG: 'text-base sm:text-lg lg:text-xl',
  textMD: 'text-sm sm:text-base lg:text-lg',
  
  // Spacing
  sectionPadding: 'py-12 sm:py-16 lg:py-20 xl:py-24',
  sectionPaddingSmall: 'py-8 sm:py-12 lg:py-16',
  
  // Grids
  gridResponsive: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8',
  gridResponsive2: 'grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8',
  
  // Buttons
  buttonResponsive: 'px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base',
  buttonLarge: 'px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg',
  
  // Flex
  flexResponsive: 'flex flex-col sm:flex-row gap-3 sm:gap-4',
  flexCenter: 'flex items-center justify-center',
  
} as const;

/**
 * Función para combinar clases responsive
 */
export const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};