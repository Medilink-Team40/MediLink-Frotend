import React from 'react';
import { cn } from '@/lib/utils';

interface HamburgerButtonProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
}

const HamburgerButton: React.FC<HamburgerButtonProps> = ({
  isOpen,
  onClick,
  className
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative w-10 h-10 rounded-lg bg-white shadow-sm border border-gray-200 flex items-center justify-center transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
        className
      )}
      aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
      aria-expanded={isOpen}
    >
      <div className="w-5 h-4 flex flex-col justify-between">
        <span
          className={cn(
            "block h-0.5 w-full bg-gray-600 rounded transition-all duration-300",
            isOpen ? "rotate-45 translate-y-1.5" : ""
          )}
        />
        <span
          className={cn(
            "block h-0.5 w-full bg-gray-600 rounded transition-all duration-300",
            isOpen ? "opacity-0" : ""
          )}
        />
        <span
          className={cn(
            "block h-0.5 w-full bg-gray-600 rounded transition-all duration-300",
            isOpen ? "-rotate-45 -translate-y-1.5" : ""
          )}
        />
      </div>
    </button>
  );
};

export default HamburgerButton;