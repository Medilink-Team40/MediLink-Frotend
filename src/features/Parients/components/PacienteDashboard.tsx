const PacientesDashboard = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4">
            {/* Columna principal */}
            <div className="lg:col-span-2 space-y-6">
                {/* Próxima cita */}
                <div>
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">Próximas Citas</h3>
                    <div className="bg-white p-6 rounded-xl border border-gray-200">
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                            <div className="flex-1">
                                <p className="text-lg font-bold text-gray-800">Consulta con Dr. Emily Carter</p>
                                <p className="text-gray-600">Revisión General</p>
                                <p className="text-sm text-gray-500 mt-2">Hoy, 2:00 PM - 2:30 PM</p>
                                <button className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors">
                                    <span>Unirse a la Llamada</span>
                                </button>
                            </div>
                            <div className="w-full md:w-1/3 h-40 bg-blue-50 rounded-lg flex items-center justify-center">
                                <div className="text-blue-600">
                                    <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actividad Reciente */}
                <div>
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">Actividad Reciente</h3>
                    <div className="space-y-4">
                        {[
                            {
                                icon: '📝',
                                title: 'Receta Médica',
                                description: 'Receta renovada',
                                time: 'Hace 2 días'
                            },
                            {
                                icon: '🔬',
                                title: 'Resultados de Laboratorio',
                                description: 'Nuevos resultados disponibles',
                                time: 'Hace 1 semana'
                            },
                            {
                                icon: '📅',
                                title: 'Cita con Dr. Carter',
                                description: 'Cita completada',
                                time: 'Hace 2 semanas'
                            }
                        ].map((item, index) => (
                            <div key={index} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200">
                                <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                                    {item.icon}
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-gray-800">{item.title}</p>
                                    <p className="text-sm text-gray-600">{item.description}</p>
                                    <p className="text-xs text-gray-400 mt-1">{item.time}</p>
                                </div>
                                <button className="text-gray-400 hover:text-gray-600">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Barra lateral */}
            <div className="space-y-6">
                {/* Recordatorios */}
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">Recordatorios</h3>
                    <div className="space-y-4">
                        <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                            <div className="flex items-start gap-3">
                                <span className="text-red-500">⚠️</span>
                                <div>
                                    <p className="font-medium text-red-700">Alta Prioridad</p>
                                    <p className="text-sm text-gray-600 mt-1">Tu examen físico anual está pendiente. Por favor programa una cita pronto.</p>
                                    <button className="mt-2 text-sm font-medium text-blue-600 hover:underline">Agendar Ahora</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Acciones Rápidas */}
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">Acciones Rápidas</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {[
                            { icon: '📅', label: 'Nueva Cita' },
                            { icon: '💬', label: 'Mensaje al Doctor' },
                            { icon: '🔄', label: 'Renovar Receta' },
                            { icon: '💳', label: 'Ver Facturas' }
                        ].map((action, index) => (
                            <button 
                                key={index}
                                className="flex flex-col items-center justify-center p-4 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors"
                            >
                                <span className="text-2xl mb-2">{action.icon}</span>
                                <span className="text-sm font-medium text-center text-gray-700">{action.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PacientesDashboard;