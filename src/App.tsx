import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/AuthProvider';
import publicRoutes from './routes/publicRoute';
import privateRoutes from './routes/privatedRoutes';

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={ <div className='min-h-screen flex items-center justify-center bg-gray-50'>
          <div className='text-2xl text-blue-600'>Cargando...</div>
        </div>}>
        <Routes>
          {/* Mapeamos las rutas públicas desde el archivo publicRoute.tsx */}
          {publicRoutes.map((route, index) => (
            <Route
              key={`public-${index}`}
              path={route.path}
              element={route.element}
            >
              {route.children?.map((child, childIndex) => (
                <Route
                  key={`public-child-${childIndex}`}
                  index={child.index}
                  path={child.path}
                  element={child.element}
                />
              ))}
            </Route>
          ))}

          {/* Mapeamos las rutas protegidas */}
          {privateRoutes.map((route, index) => (
            <Route
              key={`private-${index}`}
              path={route.path}
              element={route.element}
            >
              {route.children?.map((child, childIndex) => (
                <Route
                  key={`private-child-${childIndex}`}
                  index={child.index}
                  path={child.path}
                  element={child.element}
                />
              ))}
            </Route>
          ))}

          {/* Ruta 404 */}
          <Route path="*" element={<div>404 - Página no encontrada</div>} />
        </Routes>
      </Suspense>
    </AuthProvider>
  );
}

export default App;