import { createBrowserRouter, RouteObject, Outlet } from "react-router-dom";
import publicRoute from "@/routes/publicRoute";
import privateRoute from "@/routes/privatedRoutes";
import RouteErrorBoundary from "@/components/common/RouteErrorBoundary";
import { AuthProvider } from "@/config/AuthProvider";

/**
 * Función recursiva para añadir un ErrorBoundary a cada una de las rutas.
 * Recorre el árbol de rutas y clona cada objeto para agregar la propiedad `errorElement`.
 *
 * @param routes - Un array de objetos `RouteObject`, el tipo oficial de react-router-dom.
 * @returns Un nuevo array de `RouteObject` con el `errorElement` configurado.
 */
const addErrorBoundary = (routes: RouteObject[]): RouteObject[] => {
    return routes.map(route => {
        // Creamos un nuevo objeto de ruta para no mutar el original.
        const routeWithError: RouteObject = {
            ...route,
            // Aquí está el punto clave:
            // La propiedad `errorElement` espera un valor de tipo `React.ReactNode`.
            // La sintaxis JSX `<RouteErrorBoundary />` CREA un elemento de React, que es un valor válido.
            // No estamos usando 'RouteErrorBoundary' como un tipo, sino instanciándolo como un componente.
            errorElement: <RouteErrorBoundary />,
        };

        // Si la ruta tiene rutas anidadas (`children`), aplicamos la misma lógica recursivamente.
        if (route.children) {
            routeWithError.children = addErrorBoundary(route.children);
        }

        return routeWithError;
    });
};

//Creamos un wrapper que provee el auth context a todas las rutas

const RootLayout = () =>(
    <AuthProvider>
        <Outlet/>
    </AuthProvider>
)

// Para evitar problemas de tipos, asegúrate de que tus archivos de rutas
// exporten un array que cumpla con el tipo `RouteObject[]`.
// Ejemplo en `publicRoute.ts`:
// import { RouteObject } from 'react-router-dom';
// const publicRoute: RouteObject[] = [ ... ];
// export default publicRoute;

const appRoutes: RouteObject[] = [
    {
        element: <RootLayout/>,
        children: [
             ...publicRoute,
             ...privateRoute
        ]

    }

];

const routesWithErrorBoundary = addErrorBoundary(appRoutes);

export const router = createBrowserRouter(routesWithErrorBoundary);

export default router;