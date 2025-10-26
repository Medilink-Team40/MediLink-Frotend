import React from 'react';
import InputField from './InputField';
import { Mail } from 'lucide-react';
import { Lock } from 'lucide-react';

interface LoginFormProps {
    email: string;
    setEmail: (email: string) => void;
    password: string;
    setPassword: (password: string) => void;
    showPassword: boolean;
    setShowPassword: (show: boolean) => void;
    onSubmit: (e: React.FormEvent) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    onSubmit
}) => (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1C2730] p-6 sm:p-8 shadow-lg">
        <h3 className="text-gray-900 dark:text-white tracking-light text-2xl font-bold leading-tight text-center pb-6">
            Inicio de Sesión
        </h3>
        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
            <InputField
                id="email"
                label="Correo Electrónico"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingresa tu correo electrónico"
                icon="mail"
            />

            <InputField
                id="password"
                label="Contraseña"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa tu contraseña"
                icon="lock"
                showPasswordToggle
                onTogglePassword={() => setShowPassword(!showPassword)}
            />

            <div className="pt-2">
                <button
                    type="submit"
                    className="flex min-w-[84px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark focus:ring-primary transition-colors duration-200"
                >
                    <span className="truncate">Iniciar Sesión</span>
                </button>
            </div>
        </form>
    </div>
);

export default LoginForm;