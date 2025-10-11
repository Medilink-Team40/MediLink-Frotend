import { cn } from "@/lib/utils";
import { forwardRef, InputHTMLAttributes } from "react";
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'link';
  inputSize?: 'default' | 'sm' | 'lg';
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  isLoading?: boolean;
  error?: string;
  helperText?: string;
  success?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { 
      className, 
      variant = 'default', 
      inputSize = 'default', 
      color = 'default', 
      isLoading, 
      error,
      helperText,
      success,
      leftIcon,
      rightIcon,
      fullWidth = true,
      disabled,
      ...props 
    }, 
    ref
  ) => {
    const hasError = !!error;
    const showSuccess = success && !hasError;
    const showHelperText = helperText || hasError;

    return (
      <div className={cn("flex flex-col gap-1.5", { "w-full": fullWidth })}>
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {leftIcon}
            </div>
          )}
          
          <input
            className={cn(
              "flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
              {
                // Variantes
                "border-input": variant === 'default',
                "border-2 border-primary": variant === 'outline',
                "border-0 bg-transparent shadow-none hover:bg-accent hover:text-accent-foreground": variant === 'ghost',
                "border-0 bg-transparent text-primary underline-offset-4 hover:underline": variant === 'link',
                
                // Tamaños
                "h-10 px-4 py-2": inputSize === 'default',
                "h-9 rounded-md px-3 text-sm": inputSize === 'sm',
                "h-11 rounded-md px-4 text-base": inputSize === 'lg',
                
                // Colores
                "bg-primary text-primary-foreground": color === 'default' && variant !== 'ghost' && variant !== 'link',
                "bg-secondary text-secondary-foreground": color === 'secondary' && variant !== 'ghost' && variant !== 'link',
                "bg-success text-success-foreground": color === 'success' && variant !== 'ghost' && variant !== 'link',
                "bg-warning text-warning-foreground": color === 'warning' && variant !== 'ghost' && variant !== 'link',
                "bg-error text-error-foreground": color === 'error' && variant !== 'ghost' && variant !== 'link',
                
                // Estados
                "border-error focus-visible:ring-error/50": hasError,
                "border-success focus-visible:ring-success/50": showSuccess,
                "opacity-70": disabled,
                "pl-10": leftIcon,
                "pr-10": rightIcon || isLoading || showSuccess || hasError,
              },
              className
            )}
            disabled={isLoading || disabled}
            ref={ref}
            aria-invalid={hasError}
            aria-describedby={showHelperText ? `${props.id}-helper-text` : undefined}
            {...props}
          />

          {(rightIcon || isLoading || showSuccess || hasError) && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              ) : hasError ? (
                <AlertCircle className="h-4 w-4 text-error" />
              ) : showSuccess ? (
                <CheckCircle2 className="h-4 w-4 text-success" />
              ) : (
                rightIcon
              )}
            </div>
          )}
        </div>

        {showHelperText && (
          <p 
            id={`${props.id}-helper-text`}
            className={cn("text-xs", {
              "text-muted-foreground": !hasError,
              "text-error": hasError,
            })}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };