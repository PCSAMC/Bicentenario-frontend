import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
  useMap,
  LayersControl,
  LayerGroup,
  ZoomControl,
  CircleMarker,
  Rectangle,
} from 'react-leaflet';
import { MapPin, Home, MapPinOff, Search, Map, RotateCcw, ChevronDown, Globe, AlertTriangle } from 'lucide-react';
import ReactDOMServer from 'react-dom/server';
import { Department } from '../types/DepartamentsData.types';
import L from 'leaflet';

interface Props {
  departments: Department[];
}

// Enhanced color palette with more elegant colors
const colors = [
  '#1e40af', // Deep blue
  '#047857', // Emerald
  '#b91c1c', // Ruby red
  '#7e22ce', // Purple
  '#c2410c', // Burnt orange
  '#0369a1', // Ocean blue
  '#a16207', // Amber
  '#be185d', // Magenta
  '#166534', // Forest green
  '#4338ca', // Indigo
];

// Custom icon for departments with pulsing effect
const createDepartmentIcon = (color, size) => {
  const svgString = ReactDOMServer.renderToStaticMarkup(
    <div style={{ 
      position: 'relative',
      animation: 'pulse 2s infinite',
    }}>
      <Home color={color} size={size} strokeWidth={2.5} fill={color} fillOpacity={0.2} />
    </div>
  );
  
  return new L.DivIcon({
    className: 'custom-department-icon',
    html: svgString,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 1.2],
    popupAnchor: [0, -size],
  });
};

// Enhanced city icon
const createCityIcon = (color, size) => {
  const svgString = ReactDOMServer.renderToStaticMarkup(
    <MapPin color={color} size={size} strokeWidth={2.5} fill={color} fillOpacity={0.15} />
  );
  
  return new L.DivIcon({
    className: 'custom-city-icon',
    html: svgString,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size],
  });
};

const ChangeView = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, { duration: 1.5, easeLinearity: 0.25 });
  }, [center, zoom, map]);
  return null;
};

const BoliviaMap = ({ departments }) => {
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [hoveredDepartmentId, setHoveredDepartmentId] = useState(null);
  const [mapCenter, setMapCenter] = useState([-16.5, -64.5]); // Centered on Bolivia
  const [mapZoom, setMapZoom] = useState(6);

  const [searchTerm, setSearchTerm] = useState('');
  const [showCities, setShowCities] = useState(true);
  const [showBoundaries, setShowBoundaries] = useState(false);
  const [cursorPos, setCursorPos] = useState(null);
  const [mapType, setMapType] = useState('streets');

  // Filter departments based on search term
  const filteredDepartments = useMemo(() => {
    return departments.filter(dep =>
      dep.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [departments, searchTerm]);

  const handleSelectDepartment = useCallback((dep) => {
    setSelectedDepartment(dep);
    setMapCenter([dep.latitude, dep.longitude]);
    setMapZoom(9);
  }, []);

  const resetView = () => {
    setSelectedDepartment(null);
    setMapCenter([-16.5, -64.5]);
    setMapZoom(6);
  };

  // Map event handlers
  const handleMapMouseMove = (e) => {
    if (e && e.latlng) {
      setCursorPos([e.latlng.lat, e.latlng.lng]);
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        resetView();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="containerMapa">
      <aside className="sidebar" role="list" aria-label="Lista de departamentos">
        <h3>
          <Globe size={22} strokeWidth={2} /> Departamentos de Bolivia
        </h3>

        <div className="search-container">
          <input
            type="search"
            placeholder="Buscar departamento..."
            aria-label="Buscar departamento"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search size={18} style={{ position: 'absolute', right: '12px', top: '12px' }} />
        </div>

        <ul className="departments-list">
          {filteredDepartments.length === 0 && (
            <li className="department-item" style={{ justifyContent: 'center', opacity: 0.7 }}>
              <AlertTriangle size={16} />
              No se encontraron departamentos
            </li>
          )}
          
          {filteredDepartments.map((dep, idx) => (
            <li
              key={dep.id}
              onClick={() => handleSelectDepartment(dep)}
              onMouseEnter={() => setHoveredDepartmentId(dep.id)}
              onMouseLeave={() => setHoveredDepartmentId(null)}
              className={`
                department-item
                ${selectedDepartment?.id === dep.id ? 'selected' : ''}
                ${hoveredDepartmentId === dep.id && selectedDepartment?.id !== dep.id ? 'hovered' : ''}
              `}
              style={{ '--color': colors[idx % colors.length] }}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleSelectDepartment(dep);
                }
              }}
              aria-current={selectedDepartment?.id === dep.id ? 'true' : undefined}
              role="listitem"
            >
              <MapPin 
                size={16} 
                style={{ 
                  color: selectedDepartment?.id === dep.id || hoveredDepartmentId === dep.id 
                    ? 'white' 
                    : colors[idx % colors.length]
                }} 
              /> 
              <span>{dep.name}</span>
              <span style={{ 
                marginLeft: 'auto', 
                fontSize: '0.8rem', 
                backgroundColor: selectedDepartment?.id === dep.id || hoveredDepartmentId === dep.id 
                  ? 'rgba(255,255,255,0.25)' 
                  : 'rgba(0,0,0,0.07)',
                padding: '2px 8px',
                borderRadius: '12px',
              }}>
                {dep.cities.length}
              </span>
            </li>
          ))}
        </ul>

        <div className="actions">
          <button onClick={resetView} title="Restaurar vista inicial">
            <RotateCcw size={18} /> Restaurar vista
          </button>

          <label>
            <input
              type="checkbox"
              checked={showCities}
              onChange={() => setShowCities(!showCities)}
            />
            Mostrar ciudades
          </label>
          
          <label>
            <input
              type="checkbox"
              checked={showBoundaries}
              onChange={() => setShowBoundaries(!showBoundaries)}
            />
            Mostrar límites aproximados
          </label>
        </div>

        {cursorPos && (
          <div className="cursor-coords" aria-live="polite">
            {cursorPos[0].toFixed(4)}°, {cursorPos[1].toFixed(4)}°
          </div>
        )}
      </aside>

      <section className="map-section" role="region" aria-label="Mapa interactivo de Bolivia">
        <MapContainer
          center={mapCenter}
          zoom={mapZoom}
          className="map-container"
          scrollWheelZoom={true}
          zoomControl={false}
          keyboard={true}
          doubleClickZoom={true}
          touchZoom={true}
          eventHandlers={{
            mousemove: handleMapMouseMove
          }}
        >
          <ChangeView center={mapCenter} zoom={mapZoom} />
          <ZoomControl position="topright" />

          <LayersControl position="topright">
            <LayersControl.BaseLayer 
              checked={mapType === 'streets'} 
              name="Calles"
              onChange={() => setMapType('streets')}
            >
              <TileLayer 
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
            </LayersControl.BaseLayer>

            <LayersControl.BaseLayer 
              checked={mapType === 'satellite'} 
              name="Satélite"
              onChange={() => setMapType('satellite')}
            >
              <TileLayer 
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                attribution='&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
              />
            </LayersControl.BaseLayer>
            
            <LayersControl.BaseLayer 
              checked={mapType === 'terrain'} 
              name="Terreno"
              onChange={() => setMapType('terrain')}
            >
              <TileLayer 
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
                attribution='&copy; Esri &mdash; Esri, DeLorme, USGS, NPS'
              />
            </LayersControl.BaseLayer>

            <LayersControl.Overlay checked name="Departamentos">
              <LayerGroup>
                {filteredDepartments.map((dep, idx) => (
                  <Marker
                    key={dep.id}
                    position={[dep.latitude, dep.longitude]}
                    icon={createDepartmentIcon(colors[idx % colors.length], 36)}
                    eventHandlers={{ click: () => handleSelectDepartment(dep) }}
                  >
                    <Popup>
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.5rem'
                      }}>
                        <h3 style={{ 
                          margin: '0', 
                          color: colors[idx % colors.length],
                          borderBottom: `2px solid ${colors[idx % colors.length]}`,
                          paddingBottom: '0.3rem',
                          width: '100%',
                          textAlign: 'center'
                        }}>
                          {dep.name}
                        </h3>
                        <p style={{ margin: '0.5rem 0', fontSize: '0.9rem' }}>
                          {dep.cities.length} ciudades registradas
                        </p>
                        <button 
                          onClick={() => handleSelectDepartment(dep)}
                          style={{
                            background: colors[idx % colors.length],
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            padding: '4px 8px',
                            cursor: 'pointer',
                            fontSize: '0.85rem'
                          }}
                        >
                          Ver detalles
                        </button>
                      </div>
                    </Popup>
                    <Tooltip direction="top" offset={[0, -20]} opacity={0.9}>
                      <span style={{ fontWeight: 'bold' }}>{dep.name}</span>
                    </Tooltip>
                  </Marker>
                ))}
              </LayerGroup>
            </LayersControl.Overlay>

            {/* Circle markers to approximate department boundaries */}
            {showBoundaries && (
              <LayersControl.Overlay checked name="Límites Aproximados">
                <LayerGroup>
                  {filteredDepartments.map((dep, idx) => (
                    <CircleMarker
                      key={`boundary-${dep.id}`}
                      center={[dep.latitude, dep.longitude]}
                      radius={30}
                      pathOptions={{
                        color: colors[idx % colors.length],
                        fillColor: colors[idx % colors.length],
                        fillOpacity: 0.1,
                        weight: 2,
                        dashArray: '5, 5',
                      }}
                    />
                  ))}
                </LayerGroup>
              </LayersControl.Overlay>
            )}

            {showCities && selectedDepartment && (
              <LayersControl.Overlay checked name="Ciudades">
                <LayerGroup>
                  {selectedDepartment.cities.map((city) => (
                    <Marker
                      key={city.id}
                      position={[city.latitude, city.longitude]}
                      icon={createCityIcon('#1e3a8a', 28)}
                    >
                      <Popup>
                        <div style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '0.3rem'
                        }}>
                          <h4 style={{ 
                            margin: '0', 
                            color: '#1e3a8a',
                            borderBottom: '2px solid #1e3a8a',
                            paddingBottom: '0.3rem',
                            width: '100%',
                            textAlign: 'center'
                          }}>
                            {city.name}
                          </h4>
                          <p style={{ margin: '0.3rem 0', fontSize: '0.85rem' }}>
                            {selectedDepartment.name}
                          </p>
                          <div style={{ 
                            fontSize: '0.8rem', 
                            background: '#f3f4f6', 
                            padding: '3px 8px', 
                            borderRadius: '4px',
                            fontFamily: 'monospace' 
                          }}>
                            {city.latitude.toFixed(4)}, {city.longitude.toFixed(4)}
                          </div>
                        </div>
                      </Popup>
                      <Tooltip direction="top" offset={[0, -20]} opacity={0.9}>
                        {city.name}
                      </Tooltip>
                    </Marker>
                  ))}
                </LayerGroup>
              </LayersControl.Overlay>
            )}
          </LayersControl>
        </MapContainer>
      </section>
    </div>
  );
};

export default BoliviaMap;