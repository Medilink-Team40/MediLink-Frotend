import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/config/AuthProvider";
import { Loader2 } from "lucide-react";
import {ROLES} from  "./roles"


const AdminRouter = ()=>{
    const {user, loading} = useAuth();

    if(loading){
        return (
            <div className="flex items-center justify-center min-screen">
                <Loader2 className="w-8 h-8 animate-ping"/>
            </div>
        );

    }
    const isAdmin = user?.roles?.includes(ROLES.ADMIN);

    //Verificamos si el usuario esta autenticado y es de rol administrador
    if(!user || !isAdmin){
        return <Navigate to="unauthorized" state={{from: location}} replace/>
    }
    return <Outlet/>
};

export default AdminRouter;