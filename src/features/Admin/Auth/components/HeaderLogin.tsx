import { Lock, ShieldCheck } from 'lucide-react';
import React from 'react';

type HeaderLoginProps = {
    title?: string;
};

const HeaderLogin: React.FC<HeaderLoginProps> = ({ title = ' Portal del administrador' }) => (
    <div className="mb-6 flex flex-col items-center justify-center text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white dark:bg-gray-800">
            <Lock className="text-primary h-6 w-6" />
        </div>
        <div className="flex items-center gap-2">
            <p className="text-gray-900  text-3xl font-bold leading-tight tracking-tight">
                {title}
            </p>
            <div title="Secure Connection">
                <ShieldCheck className="h-5 w-5 text-green-500" />
            </div>
        </div>
    </div>
);

export default HeaderLogin;