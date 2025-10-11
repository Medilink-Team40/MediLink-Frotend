import { useContext } from "react";
import { AuthContext, AuthProvider }  from "@/auth/AuthProvider";


export const useAuth = () => {
 const Context =  useContext(AuthContext);

 if(Context === undefined){
    throw new Error('useAuth  deber ser usado dentro de un AuthProvider')


 }

 return Context;
}