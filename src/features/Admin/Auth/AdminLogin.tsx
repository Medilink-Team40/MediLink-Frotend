//AdminLogin.tsx

import { useState } from 'react';
import HeaderLogin from './components/HeaderLogin';
import LoginForm from './components/LoginForm';
import FooterLogin from './components/FooterLogin';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Lógica de inicio de sesión aquí
        console.log('Iniciando sesión con:', { email, password });
    };

    return (
        <div className="font-display bg-teal-950/45 dark:bg-background-dark min-h-screen">
            <div className="relative flex min-h-screen w-full flex-col items-center justify-center p-4">
                <div className="w-full max-w-md">
                    <HeaderLogin />

                    <LoginForm
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                        showPassword={showPassword}
                        setShowPassword={setShowPassword}
                        onSubmit={handleSubmit}
                    />

                    <div className="text-center mt-6">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            Solo personal Autorizado.
                        </p>
                    </div>
                </div>

                <FooterLogin />
            </div>
        </div>
    );
};

export default AdminLogin