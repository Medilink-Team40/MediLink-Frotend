import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="font-display bg-background-light dark:bg-background-dark min-h-screen">
      <div className="relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden">
        <div className="flex flex-row min-h-screen">
          <div className="flex-1 flex flex-col">
            {/* Main Content */}
            <main className="flex-1 p-8">
              <div className="flex flex-col gap-8">
                {/* Page Heading */}
                <div className="flex flex-wrap justify-between gap-3">
                  <div className="flex min-w-72 flex-col gap-1">
                    <h1 className="text-gray-900 dark:text-white text-3xl font-bold leading-tight tracking-tight">
                      Panel de Administración
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400">
                      Bienvenido de nuevo, Administrador. Aquí está el resumen de hoy.
                    </p>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Total Doctores */}
                  <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                    <p className="text-gray-600 dark:text-gray-300 text-base font-medium leading-normal">
                      Total de Doctores
                    </p>
                    <p className="text-gray-900 dark:text-white tracking-tight text-4xl font-bold leading-tight">
                      124
                    </p>
                  </div>

                  {/* Registros Pendientes */}
                  <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                    <p className="text-gray-600 dark:text-gray-300 text-base font-medium leading-normal">
                      Registros Pendientes
                    </p>
                    <p className="text-gray-900 dark:text-white tracking-tight text-4xl font-bold leading-tight">
                      8
                    </p>
                  </div>

                  {/* Pacientes Activos */}
                  <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                    <p className="text-gray-600 dark:text-gray-300 text-base font-medium leading-normal">
                      Pacientes Activos
                    </p>
                    <p className="text-gray-900 dark:text-white tracking-tight text-4xl font-bold leading-tight">
                      2,345
                    </p>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;