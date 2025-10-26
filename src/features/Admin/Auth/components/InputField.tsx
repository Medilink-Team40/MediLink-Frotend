import React from 'react';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';

interface InputFieldProps {
    id: string;
    label: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    icon?: 'mail' | 'lock';
    showPasswordToggle?: boolean;
    onTogglePassword?: () => void;
}

const InputField: React.FC<InputFieldProps> = ({
    id,
    label,
    type,
    value,
    onChange,
    placeholder,
    icon,
    showPasswordToggle = false,
    onTogglePassword
}) => {
    const IconComponent = icon === 'mail' ? Mail : Lock;

    return (
        <div className="flex flex-col w-full">
            <label htmlFor={id} className="flex flex-col">
                <p className="text-gray-800 dark:text-gray-200 text-sm font-medium leading-normal pb-2">
                    {label}
                </p>
                <div className="relative flex w-full flex-1 items-stretch">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-500 dark:text-gray-400">
                        {icon && <IconComponent className="h-5 w-5" />}
                    </div>
                    <input
                        id={id}
                        type={type}
                        value={value}
                        onChange={onChange}
                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 focus:border-primary h-12 placeholder:text-gray-500 dark:placeholder:text-gray-400 pl-11 pr-11 text-base font-normal leading-normal"
                        placeholder={placeholder}
                    />
                    {showPasswordToggle && onTogglePassword && (
                        <button
                            type="button"
                            onClick={onTogglePassword}
                            className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                        >
                            {type === 'password' ? (
                                <Eye className="h-5 w-5" />
                            ) : (
                                <EyeOff className="h-5 w-5" />
                            )}
                        </button>
                    )}
                </div>
            </label>
        </div>
    );
};

export default InputField;