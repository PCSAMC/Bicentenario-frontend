import React from 'react';
import useDepartments from '../hooks/obenerDepratmanetos'; // Asegúrate de importar el hook
import { Department, City } from '../types/ciudadesData.types';

interface DepartmentCitySelectorProps {
  onCiudadSelected: (ciudadId: number) => void;
}

const DepartmentCitySelector: React.FC<DepartmentCitySelectorProps> = ({ onCiudadSelected }) => {
  const {
    departments,
    selectedDepartment,
    selectedCity,
    loading,
    error,
    selectDepartment,
    selectCity,
  } = useDepartments();

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
     

      {/* Manejo de error */}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded">
          <p>{error}</p>
        </div>
      )}

      <div className="space-y-6">
        {/* Combo para seleccionar Departamento */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="department" className="text-gray-700 font-medium">
            Departamento:
          </label>
          <div className="relative">
            <select
              id="department"
              value={selectedDepartment?.id || ''}
              onChange={(e) => selectDepartment(Number(e.target.value))}
              className="block w-full py-3 px-4 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
            >
              <option value="">Seleccione un Departamento</option>
              {loading ? (
                <option>Cargando...</option>
              ) : (
                departments.map((department: Department) => (
                  <option key={department.id} value={department.id}>
                    {department.name}
                  </option>
                ))
              )}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Combo para seleccionar Ciudad, solo si se seleccionó un Departamento */}
        {selectedDepartment && selectedDepartment.cities && selectedDepartment.cities.length > 0 ? (
          <div className="flex flex-col space-y-2">
            <label htmlFor="city" className="text-gray-700 font-medium">
              Ciudad:
            </label>
            <div className="relative">
              <select
                id="city"
                value={selectedCity || ''}
                onChange={(e) => {
                  const cityId = Number(e.target.value);
                  selectCity(cityId); // Selecciona la ciudad
                  onCiudadSelected(cityId); // Llama al prop `onCiudadSelected`
                }}
                className="block w-full py-3 px-4 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              >
                <option value="">Seleccione una Ciudad</option>
                {selectedDepartment.cities.map((city: City) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
          </div>
        ) : (
          // Si no hay ciudades disponibles o no se ha seleccionado un departamento, mostramos este mensaje
          selectedDepartment && (
            <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 rounded">
              <p>No hay ciudades disponibles para este departamento.</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default DepartmentCitySelector;