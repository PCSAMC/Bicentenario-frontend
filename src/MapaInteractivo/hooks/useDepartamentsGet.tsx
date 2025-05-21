import { useState , useEffect } from "react";
import {GetDepartments} from '../service/DepartamentGetService';
import{DepartamentDataResponse , Department} from "../types/DepartamentsData.types.ts";

export const useDepartamentsCity = () => {
    const [departamentsCity , setDepartamentsCity] = useState<Department[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
      const [error, setError] = useState<string | null>(null);
    
      useEffect(() => {
        const getDepartamentsCity = async () => {
          setLoading(true);
          setError(null); 
          try {
            const response = await GetDepartments();
         
            if (response && response.departaments) {
                setDepartamentsCity(response.departaments);
                console.log(response.departaments);
            } else {
                setDepartamentsCity(null);
                console.log('No departments found in response');
            }
          
          } catch (err) {
            setError(error);
            console.log(error)
          } finally {
            setLoading(false);
          }
        };
    
        getDepartamentsCity();
      }, []);
    
      return { departamentsCity, loading, error };
    };
    

    