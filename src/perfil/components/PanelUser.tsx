import React, { useEffect } from 'react';
import { useUserId } from '../hooks/useUserId';

const PanelUser = () => {
    const dataUser = localStorage.getItem('user');
    const convertido = JSON.parse(dataUser || '{}');
    const id = convertido.idUser;
    
    const { user, loading, error, getUserById } = useUserId();
    
    useEffect(() => {
        if (id) {
            getUserById(id);
        }
    }, [id, getUserById]);
    
    if (loading) {
        return (
            <div className="flex justify-center items-center p-8">
                <div className="animate-pulse text-lg text-gray-600">Cargando información del usuario...</div>
            </div>
        );
    }
    
    if (error) {
        return (
            <div className="bg-red-50 p-4 rounded-lg my-4">
                <div className="text-red-600 font-medium text-center">Error al cargar el perfil del usuario.</div>
            </div>
        );
    }
    
    if (!user) {
        return (
            <div className="bg-yellow-50 p-4 rounded-lg my-4">
                <div className="text-yellow-700 font-medium text-center">No se encontró información del usuario.</div>
            </div>
        );
    }
    
    return (
        <div className="relative">
            {/* Banner del perfil - Colores del bicentenario */}
            <div className="h-48 bg-gradient-to-r from-blue-800 via-yellow-600 to-red-600 w-full rounded-t-lg"></div>
            
            <div className="container mx-auto px-4">
                {/* Contenedor de información del perfil */}
                <div className="relative bg-white rounded-lg shadow-lg -mt-24 mb-8 p-6 pt-28">
                    {/* Foto del perfil */}
                    <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                        <div className="h-32 w-32 rounded-full bg-white p-1 shadow-lg">
                            {user.photoUrl ? (
                                <img 
                                    src={user.photoUrl} 
                                    alt="Foto de perfil" 
                                    className="h-full w-full object-cover rounded-full"
                                />
                            ) : (
                                <div className="h-full w-full rounded-full bg-gray-200 flex items-center justify-center">
                                    <span className="text-3xl font-bold text-gray-500">
                                        {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    {/* Información del usuario */}
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
                        <p className="text-gray-600">{user.email}</p>
                        <div className="mt-2">
                            <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                {String(user.role) || 'Usuario'}
                            </span>
                        </div>
                    </div>
                    
                    {/* Estadísticas y datos adicionales */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg text-center border border-gray-100">
                            <div className="text-3xl font-bold text-blue-700">{user.age || '-'}</div>
                            <div className="text-sm text-gray-500 mt-1">Edad</div>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-lg text-center border border-gray-100">
                            <div className="text-3xl font-bold text-yellow-600">
                                {user.testimonials || '0'}
                            </div>
                            <div className="text-sm text-gray-500 mt-1">Testimonios</div>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-lg text-center border border-gray-100">
                            <div className="text-3xl font-bold text-red-600">
                                {user.publications || '0'}
                            </div>
                            <div className="text-sm text-gray-500 mt-1">Publicaciones</div>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-lg text-center border border-gray-100">
                            <div className="text-sm text-gray-500 mb-1">Miembro desde</div>
                            <div className="text-lg font-medium text-gray-800">
                                {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PanelUser;