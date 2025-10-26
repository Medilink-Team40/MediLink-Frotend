import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/config/AuthProvider";

export const UserHeader = () => {
  const { user, logout } = useAuth();

  const getUserInitials = () => {
    if (!user?.name) return 'U';
    return user.name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <header className="fixed top-0 right-0 left-0 bg-white border-b border-gray-200 z-50">
      <div className="pl-64 pr-6"> {/* Removed extra pr-64 to prevent excessive padding */}
        <div className="flex justify-between h-16 items-center">
          <div className="flex-1 flex justify-end items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Avatar>
                  {user?.picture ? (
                    <AvatarImage src={user.picture} alt={user.name} />
                  ) : (
                    <AvatarFallback>
                      {getUserInitials()}
                    </AvatarFallback>
                  )}
                </Avatar>
                {user?.roles?.[0] && (
                  <span className="absolute -bottom-1 -right-1 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
                    {user.roles[0]}
                  </span>
                )}
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-gray-700">
                  {user?.name || 'Usuario'}
                </p>
                <p className="text-xs text-gray-500">
                  {user?.email || ''}
                </p>
              </div>
            </div>
            <button
              onClick={logout}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};