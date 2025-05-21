import {useDepartamentsCity} from '../hooks/useDepartamentsGet';

import BoliviaMap from '../components/BoliviaMap';
import '../styles/boliviaMap.css'; // importa el css aquí

const MapPage = () => {
  const { departamentsCity, loading, error } = useDepartamentsCity();
  console.log(departamentsCity)

  if (loading) return <p>Cargando departamentos y ciudades...</p>;
  if (error) return <p>Error: {error}</p>;
  console.log(error)

  if (!departamentsCity) return null;

  return <BoliviaMap departments={departamentsCity} />;
};

export default MapPage;
