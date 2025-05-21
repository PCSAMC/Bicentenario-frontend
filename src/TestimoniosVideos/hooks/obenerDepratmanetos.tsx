import { useState, useEffect } from 'react';
import { Department, DepartmentsResponse } from '../types/ciudadesData.types';
import { DepartmentService } from '../services/get';

const useDepartments = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [selectedCity, setSelectedCity] = useState<number | null>(null); // Usaremos el ID de la ciudad
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDepartments = async () => {
      setLoading(true);
      try {
        const response: DepartmentsResponse = await DepartmentService.getDepartments();
        setDepartments(response.departaments);
        setError(null); // Limpiar errores
      } catch (err) {
        setError('Error al cargar los departamentos');
      } finally {
        setLoading(false);
      }
    };

    loadDepartments();
  }, []);

  const selectDepartment = (departmentId: number) => {
    const department = departments.find((d) => d.id === departmentId) || null;
    setSelectedDepartment(department);
    setSelectedCity(null); // Resetear ciudad al cambiar de departamento
  };

  const selectCity = (cityId: number) => {
    setSelectedCity(cityId);
  };

  return {
    departments,
    selectedDepartment,
    selectedCity,
    loading,
    error,
    selectDepartment,
    selectCity,
  };
};

export default useDepartments;
