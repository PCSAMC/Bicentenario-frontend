import React, { useRef, useState, useEffect, use } from 'react';
import {
  Mic, MicOff, UserCircle, PlusCircle, Filter, X, Search,
  CheckCircle, Calendar, MapPin, Clock, TrendingUp,
  Award, Star, Heart, Eye, ChevronDown
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
// Tipos simulados para el ejemplo
const Department = {
  id: Number,
  name: String,
  cities: Array
};

const Event = {
  id: Number,
  title: String,
  date: String,
  location: String,
  category: String,
  imageUrl: String
};

const SearchBar = ({
  value,
  onChange,
  onCreate,
  onFilterChange,
  departments = [],
  eventos = [],
  loading = false
}) => {
  const [recording, setRecording] = useState(false);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);
  const [ciudad, setCiudad] = useState(null);
  const [orden, setOrden] = useState('');
  const [evento, setEvento] = useState(null); // ID of the applied event filter
  const [showEventModal, setShowEventModal] = useState(false);
  const [tempEventoId, setTempEventoId] = useState(null); // ID for event modal selection
  const [showFilters, setShowFilters] = useState(false);
  const recognitionRef = useRef(null);
  const modalRef = useRef(null);
  const filterRef = useRef(null); // Ref for the filter dropdown

  const ciudadesDisponibles = selectedDepartmentId
    ? departments.find(dep => dep.id === selectedDepartmentId)?.cities || []
    : [];

  useEffect(() => {
    // Sync tempEventoId with the actual evento when modal opens
    if (showEventModal) {
      setTempEventoId(evento);
    }
  }, [showEventModal, evento]);

  const handleVoice = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Tu navegador no soporta reconocimiento de voz');
      return;
    }

    if (!recognitionRef.current) {
      const recognition = new (window.webkitSpeechRecognition)();
      recognition.lang = 'es-ES';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        onChange(transcript);
        setRecording(false);
      };

      recognition.onerror = () => setRecording(false);
      recognitionRef.current = recognition;
    }

    if (recording) {
      recognitionRef.current.stop();
      setRecording(false);
    } else {
      recognitionRef.current.start();
      setRecording(true);
    }
  };

  const handleFilterChangeInternal = (
    key,
    val
  ) => {
    let newFilters = {
      ciudad: ciudad,
      orden: orden,
      evento: evento,
    };

    if (key === 'ciudad') {
      setCiudad(val);
      newFilters.ciudad = val;
    }
    if (key === 'orden') {
      setOrden(val);
      newFilters.orden = val;
    }
    // 'evento' is handled by applyEventFilter and clearEventFilter

    if (onFilterChange && key !== 'evento') {
      onFilterChange(newFilters);
    }
  };
  
  const clearEventFilter = (e) => {
    if (e) e.stopPropagation();
    setEvento(null);
    setTempEventoId(null); // Also clear temp if clearing directly
    if (onFilterChange) {
      onFilterChange({
        ciudad: ciudad,
        orden: orden,
        evento: null,
      });
    }
  };

  const applyEventFilter = () => {
    setEvento(tempEventoId);
    if (onFilterChange) {
      onFilterChange({
        ciudad: ciudad,
        orden: orden,
        evento: tempEventoId,
      });
    }
    setShowEventModal(false);
    // setShowFilters(false); // Optionally close filter dropdown after applying event
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target) && showEventModal) {
        setShowEventModal(false);
        setTempEventoId(evento); // Reset temp to actual on modal close by outside click
      }
      if (filterRef.current && !filterRef.current.contains(event.target) && showFilters) {
        setShowFilters(false);
      }
    }

    if (showEventModal || showFilters) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showEventModal, evento, showFilters]);

  const selectedEventDetails = eventos.find(e => e.id === evento);

  // Renderizar la insignia del evento seleccionado (for use within filter dropdown)
  const renderEventBadge = () => {
    if (!selectedEventDetails) return null;

    return (
      <div className="mt-3 flex items-center gap-2 px-3 py-1.5 bg-rose-50 text-rose-700 rounded-lg border border-rose-200">
        <Calendar className="w-4 h-4 flex-shrink-0" />
        <span className="text-sm font-medium truncate" title={selectedEventDetails.title}>{selectedEventDetails.title}</span>
        <button
          onClick={clearEventFilter}
          className="ml-auto text-rose-500 hover:text-rose-700 p-0.5 rounded-full hover:bg-rose-100"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  };
  
  const getCategoryIcon = (category) => {
    const icons = {
      "cultural": <Award className="w-5 h-5 text-purple-500" />,
      "deportivo": <TrendingUp className="w-5 h-5 text-green-500" />,
      "educativo": <Star className="w-5 h-5 text-yellow-500" />,
      "histórico": <Clock className="w-5 h-5 text-red-500" />, // Kept as red for thematic consistency with "histórico"
      "default": <Calendar className="w-5 h-5 text-rose-500" /> // Changed to rose
    };
    return icons[category?.toLowerCase()] || icons.default;
  };

  const getCardGradient = (index) => {
    const gradients = [
      "from-rose-50 to-red-100 border-rose-200", // Changed from blue/indigo to rose/red
      "from-purple-50 to-pink-50 border-purple-200",
      "from-green-50 to-teal-50 border-green-200",
      "from-yellow-50 to-amber-50 border-yellow-200",
      "from-red-50 to-orange-50 border-red-200" // This one already uses red, fits okay
    ];
    return gradients[index % gradients.length];
  };
  const navigate= useNavigate();
  return (
    <div className="relative">
      <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:items-center sm:justify-between gap-3 p-3 bg-white shadow-md rounded-lg border border-gray-200">
        {/* Búsqueda */}
        <div className="flex items-center flex-grow w-full sm:w-auto min-w-0 sm:min-w-[280px] lg:min-w-[350px] gap-2">
          <div className="relative w-full flex-grow">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Buscar testimonios..."
              className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all text-sm" // Changed focus:ring-blue-500 to focus:ring-rose-400
            />
          </div>
          <button
            onClick={handleVoice}
            className={`p-2.5 rounded-lg transition-all ${recording ? 'bg-red-100 text-red-600 ring-1 ring-red-200' : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'}`} // Kept red for recording state as it's distinct
            title={recording ? "Detener grabación" : "Grabar voz"}
          >
            {recording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>
        </div>

        {/* Filtros y Acciones */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          {/* Botón de Filtros Unificado */}
          <div className="relative">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-all text-sm"
            >
              <Filter className="w-4 h-4 text-gray-600" />
              <span className="hidden md:inline text-gray-700 font-medium">Filtros</span>
              {selectedEventDetails && !showFilters && (
                <span className="ml-1 p-0.5 bg-rose-100 text-rose-600 rounded-full"> {/* Changed from blue */}
                  <Calendar className="w-3 h-3 inline" />
                </span>
              )}
               <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${showFilters ? 'transform rotate-180' : ''} md:hidden`} />
            </button>

            {showFilters && (
              <div ref={filterRef} className="absolute z-30 right-0 mt-2 w-[280px] sm:w-80 bg-white border border-gray-200 rounded-xl shadow-xl p-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Departamento</label>
                    <select
                      value={selectedDepartmentId ?? ''}
                      onChange={(e) => {
                        const id = e.target.value ? parseInt(e.target.value) : null;
                        setSelectedDepartmentId(id);
                        setCiudad(null); // Reset ciudad
                        handleFilterChangeInternal('ciudad', null); // Update parent
                      }}
                      className="w-full p-2 bg-gray-50 border border-gray-200 rounded-md text-gray-700 text-sm focus:outline-none focus:ring-1 focus:ring-rose-400" // Changed focus from blue
                    >
                      <option value="">Todos</option>
                      {loading ? <option disabled>Cargando...</option> : departments.map(dep => (
                        <option key={dep.id} value={dep.id}>{dep.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Ciudad</label>
                    <select
                      value={ciudad ?? ''}
                      onChange={(e) => handleFilterChangeInternal('ciudad', e.target.value ? parseInt(e.target.value) : null)}
                      className="w-full p-2 bg-gray-50 border border-gray-200 rounded-md text-gray-700 text-sm focus:outline-none focus:ring-1 focus:ring-rose-400" // Changed focus from blue
                      disabled={!selectedDepartmentId || ciudadesDisponibles.length === 0}
                    >
                      <option value="">Todas</option>
                      {ciudadesDisponibles.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Ordenar por</label>
                    <select
                      value={orden}
                      onChange={(e) => handleFilterChangeInternal('orden', e.target.value)}
                      className="w-full p-2 bg-gray-50 border border-gray-200 rounded-md text-gray-700 text-sm focus:outline-none focus:ring-1 focus:ring-rose-400" // Changed focus from blue
                    >
                      <option value="">Relevancia</option>
                      <option value="recientes">Más recientes</option>
                      <option value="populares">Más populares</option>
                    </select>
                  </div>
                  <div className="pt-1">
                     <label className="block text-xs font-medium text-gray-600 mb-1">Evento Asociado</label>
                    <button
                      onClick={() => {
                        setShowEventModal(true);
                        // setShowFilters(false); // Keep filters open or close, as preferred
                      }}
                      className="w-full flex items-center justify-between p-2.5 bg-rose-50 border border-rose-200 rounded-lg hover:bg-rose-100 transition-all text-sm" // Changed from blue
                    >
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-rose-600" /> {/* Changed from blue */}
                        <span className="text-rose-700 font-medium truncate"> {/* Changed from blue */}
                          {selectedEventDetails ? selectedEventDetails.title : "Seleccionar evento"}
                        </span>
                      </div>
                      <ChevronDown className="w-4 h-4 text-rose-500" /> {/* Changed from blue */}
                    </button>
                    {selectedEventDetails && renderEventBadge()}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Botón Crear Testimonio (Resized) */}
          <button
            onClick={onCreate}
            className="flex items-center gap-1.5 px-3 py-2.5 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-all focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-1 shadow-sm text-sm" // Changed from blue
          >
            <PlusCircle className="w-4 h-4" />
            <span className="font-medium hidden sm:inline">Crear</span>
            <span className="font-medium sm:hidden">Nuevo</span> 
          </button>

          {/* Botón User */}
            <button
            onClick={() => navigate('/PerfilPage')}
            className="flex items-center justify-center p-2 bg-gray-50 border border-gray-200 rounded-full text-gray-600 hover:bg-gray-100 transition-all focus:outline-none focus:ring-1 focus:ring-rose-400"
            >
            <UserCircle className="w-6 h-6" />
            </button>
        </div>
      </div>

      {/* Modal de selección de eventos */}
      {showEventModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
          <div
            ref={modalRef}
            className="bg-white rounded-xl shadow-xl w-full max-w-3xl overflow-hidden border border-gray-100 transform transition-all"
            style={{ maxHeight: '90vh' }}
          >
            <div className="flex justify-between items-center p-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Calendar className="w-6 h-6 text-rose-600" /> {/* Changed from blue */}
                <h3 className="text-lg font-semibold text-gray-800">Eventos del Bicentenario</h3>
              </div>
              <button
                onClick={() => {
                  setShowEventModal(false);
                  setTempEventoId(evento); // Reset temp to actual if modal is cancelled
                }}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 130px)' }}> {/* Adjusted height for header/footer */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                {eventos.map((e, index) => (
                  <div
                    key={e.id}
                    onClick={() => setTempEventoId(e.id)}
                    className={`cursor-pointer group relative overflow-hidden rounded-lg border p-0.5 transition-all transform hover:-translate-y-0.5 hover:shadow-md ${
                      tempEventoId === e.id
                        ? 'border-rose-500 ring-2 ring-rose-400 bg-rose-50' // Changed from blue
                        : `border-gray-200 bg-gradient-to-br ${getCardGradient(index)} hover:border-gray-300`
                    }`}
                  >
                    <div className="flex flex-col h-full bg-white rounded-[5px] overflow-hidden">
                      <div className="aspect-[16/10] bg-gray-100 flex items-center justify-center p-3 relative overflow-hidden">
                        {e.imageUrl ? (
                          <img src={e.imageUrl} alt={e.title} className="w-full h-full object-cover absolute inset-0" />
                        ) : (
                          <div className="flex flex-col items-center justify-center text-gray-400">
                            {getCategoryIcon(e.category)}
                            <span className="mt-1 text-xs">{e.category || "Evento"}</span>
                          </div>
                        )}
                        {tempEventoId === e.id && (
                          <div className="absolute inset-0 bg-rose-500 bg-opacity-20 flex items-center justify-center"> {/* Changed from blue */}
                            <CheckCircle className="w-10 h-10 text-white opacity-90" />
                          </div>
                        )}
                      </div>
                      
                      <div className="p-3 flex-1 flex flex-col">
                        <h4 className="font-semibold text-gray-800 text-sm mb-1.5 line-clamp-2 leading-tight">{e.title}</h4>
                        <div className="mt-auto space-y-1.5 text-xs">
                          {e.date && (
                            <div className="flex items-center gap-1.5 text-gray-500">
                              <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                              <span>{e.date}</span>
                            </div>
                          )}
                          {e.location && (
                            <div className="flex items-center gap-1.5 text-gray-500">
                              <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                              <span className="truncate">{e.location}</span>
                            </div>
                          )}
                          <div className="flex items-center justify-between pt-1 text-gray-400">
                            <div className="flex items-center gap-1">
                              <Eye className="w-3.5 h-3.5" />
                              <span>{Math.floor(Math.random() * 1000)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Heart className="w-3.5 h-3.5" />
                              <span>{Math.floor(Math.random() * 100)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                     {tempEventoId === e.id && (
                        <div className="absolute top-2 right-2 bg-white rounded-full p-0.5 shadow border border-rose-300"> {/* Changed from blue */}
                            <CheckCircle className="w-4 h-4 text-rose-500" /> {/* Changed from blue */}
                        </div>
                    )}
                  </div>
                ))}
              </div>
              {eventos.length === 0 && (
                <div className="py-10 flex flex-col items-center justify-center text-gray-500">
                  <Calendar className="w-12 h-12 text-gray-300 mb-3" />
                  <p className="text-md">No hay eventos disponibles</p>
                  <p className="text-xs">Prueba con otros filtros o crea un nuevo evento.</p>
                </div>
              )}
            </div>

            <div className="p-3 border-t border-gray-100 flex justify-end gap-2.5 bg-gray-50/50">
              <button
                onClick={() => {
                  setShowEventModal(false);
                  setTempEventoId(evento); // Reset temp to actual
                }}
                className="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-100 transition-all font-medium text-sm"
              >
                Cancelar
              </button>
              <button
                onClick={applyEventFilter}
                disabled={!tempEventoId && evento === null} 
                className="px-5 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-all shadow-sm font-medium text-sm disabled:opacity-50" // Changed from blue
              >
                Aplicar Filtro
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;