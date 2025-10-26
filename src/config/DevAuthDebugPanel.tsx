// src/config/DevAuthDebugPanel.tsx
import { setDevUserType, clearDevAuth, getCurrentUserType, getDevUsers } from './devAuth';

export const DevAuthDebugPanel = () => {
  // Solo mostrar en desarrollo
  if (import.meta.env.PROD) return null;

  const currentType = getCurrentUserType();
  const DEV_USERS = getDevUsers();

  return (
    <div className="fixed bottom-4 left-4 bg-gray-900 text-white p-4 rounded-lg shadow-xl z-50 max-w-xs">
      <div className="text-xs font-bold mb-2 text-yellow-400">
         DEV MODE
      </div>
      
      <div className="text-xs mb-3">
        <div className="font-semibold mb-1">Usuario actual:</div>
        <div className="bg-gray-800 p-2 rounded">
          {DEV_USERS[currentType].name}
          <div className="text-gray-400 text-[10px]">
            {DEV_USERS[currentType].email}
          </div>
        </div>
      </div>

      <div className="space-y-1">
        <div className="text-xs font-semibold mb-1">Cambiar a:</div>
        {Object.keys(DEV_USERS).map((type) => (
          <button
            key={type}
            onClick={() => setDevUserType(type as keyof typeof DEV_USERS)}
            className={`
              w-full text-left px-2 py-1 rounded text-xs transition
              ${currentType === type 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-800 hover:bg-gray-700'
              }
            `}
          >
            {type.toUpperCase()}
          </button>
        ))}
      </div>

      <button
        onClick={clearDevAuth}
        className="w-full mt-2 px-2 py-1 bg-red-600 hover:bg-red-700 rounded text-xs transition"
      >
        Limpiar y Recargar
      </button>
    </div>
  );
};

export default DevAuthDebugPanel;