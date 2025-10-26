// src/components/ui/toggle-group.tsx
import * as React from "react"
import { cn } from "@/lib/utils"

interface ToggleGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  onValueChange: (value: string) => void
  options: { value: string; label: string }[]
}

const ToggleGroup = React.forwardRef<HTMLDivElement, ToggleGroupProps>(
  ({ className, value, onValueChange, options, ...props }, ref) => {
    const selectedIndex = options.findIndex(option => option.value === value)

    const indicatorStyle = {
      width: `calc(100% / ${options.length})`,
      transform: `translateX(calc(${selectedIndex * 100}%))`,
    }

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex h-12 w-full items-center rounded-full bg-gray-100 p-1",
          className
        )}
        role="radiogroup"
        {...props}
      >
        <div
          className="absolute left-0 top-0 h-[calc(100%-0.5rem)] rounded-full bg-white shadow-sm transition-transform duration-300 ease-in-out"
          style={indicatorStyle}
          aria-hidden="true"
        />

        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={value === option.value}
            className={cn(
              "relative z-10 flex h-full flex-1 items-center justify-center rounded-full text-sm font-medium transition-colors duration-300",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
              value === option.value
                ? "text-gray-900"
                : "text-gray-500 hover:text-gray-700"
            )}
            onClick={() => onValueChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    )
  }
)

ToggleGroup.displayName = "ToggleGroup"

export { ToggleGroup }