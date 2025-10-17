// src/components/ui/auth-toggle.tsx
import * as React from 'react'

import { Button } from "@/components/ui/button"


interface AuthToggleProps {
  // Las props son las mismas que antes para mantener la consistencia.
  value: string
  onValueChange: (value: string) => void
  options: { value: string; label: string }[]
}

export const AuthToggle: React.FC<AuthToggleProps> = ({ value, onValueChange, options }) => {
  return (
    <>
      {/* --- MEJORA 1: Vista para Móvil --- */}
      {/* 'flex md:hidden' -> Se muestra como flex en pantallas pequeñas y se oculta a partir del breakpoint 'md' (medium) */}
      <div className="flex w-full flex-col space-y-2 md:hidden">
        {options.map((option) => (
          <Button
            key={option.value}
            // Cambiamos el 'variant' del botón para resaltar el que está activo.
            variant={value === option.value ? 'default' : 'outline'}
            onClick={() => onValueChange(option.value)}
          >
            {option.label}
          </Button>
        ))}
      </div>

      {/* --- MEJORA 2: Vista para Escritorio --- */}
      {/* 'hidden md:flex' -> Está oculto en pantallas pequeñas y se muestra como flex a partir de 'md' */}
      <div className="hidden md:flex">
        <AuthToggle
          options={options}
          value={value}
          onValueChange={onValueChange}
        />
      </div>
    </>
  )
}