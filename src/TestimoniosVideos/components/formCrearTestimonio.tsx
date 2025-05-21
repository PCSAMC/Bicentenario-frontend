import React, { useState, useEffect, useCallback } from 'react';
import { Check, ChevronRight, ChevronLeft, Upload, Edit, MapPin, Tag, Calendar, FileText, User, X, UploadCloud, Info, ListChecks } from 'lucide-react';
import {uploadFile} from '../UploadPost/service/fileSystemService'; // Asegúrate que la ruta es correcta
// Asegúrate que las rutas son correctas
import { useCrearTestimonio } from '../hooks/useCrearTestimonio'; 
import DepartmentCitySelector from './comboBoxCiudades'; 
import { EventSelectionModal } from '../../Events/components/modalEventos'; 
import { TagsSelectionContainer } from '../../tags/components/contenedorTags'; 
import { CrearTestimonioData } from '../types/crearTestimonioData.types';

// --- Type Definitions ---
interface Tag {
  id: number;
  name: string;
}

interface SelectedEvent {
  id: number;
  title: string;
  // description?: string; // Add if needed
}

interface FormDataState {
  title: string;
  description: string;
  idcity: number | null; 
  typre: number; 
  content: string;
  idEvent: number | null; 
  selectedTags: Tag[];
  file: File | null;
  idUser: number | null; 
  preview: string | null;
}

interface TestimonioFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessSubmit?: (data: any) => void; // Consider defining a more specific type for submitted data
}

// --- Helper Components ---
const stepIcons = [
  <UploadCloud key="icon-1" className="h-6 w-6" />,
  <Info key="icon-2" className="h-6 w-6" />,
  <MapPin key="icon-3" className="h-6 w-6" />,
  <ListChecks key="icon-4" className="h-6 w-6" />,
];

const FormSteps = ({ currentStep, totalSteps, goToStep }: { currentStep: number; totalSteps: number; goToStep: (step: number) => void }) => {
  const stepLabels = ["Archivos", "Información Básica", "Ubicación", "Detalles"];
  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <React.Fragment key={index}>
            <div
              onClick={() => index < currentStep ? goToStep(index) : undefined} // Allow clicking only on completed steps
              className={`rounded-full h-12 w-12 flex items-center justify-center transition-colors duration-300 ${
                index < currentStep 
                  ? 'bg-green-600 text-white cursor-pointer hover:bg-green-700' 
                  : index === currentStep 
                    ? 'bg-rose-600 text-white' 
                    : 'bg-gray-200 text-gray-500 cursor-default'
              }`}
            >
              {index < currentStep ? <Check className="h-6 w-6" /> : stepIcons[index]}
            </div>
            
            {index < totalSteps - 1 && (
              <div className="flex-1 mx-2">
                <div className={`h-1 rounded ${index < currentStep ? 'bg-green-600' : 'bg-gray-200'}`}></div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      
      <div className="flex justify-between mt-2 text-sm px-1">
        {stepLabels.map((label, index) => (
          <div 
            key={label} 
            style={{ width: `${100 / totalSteps}%`}} // Ensure equal width distribution
            className={`text-center ${
              index === currentStep ? 'text-rose-700 font-semibold' : 'text-gray-500'
            }`}
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Main Component ---
export const TestimonioForm: React.FC<TestimonioFormProps> = ({ isOpen, onClose, onSuccessSubmit }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 4;
  
  const initialFormData: FormDataState = {
    title: '',
    description: '',
    idcity: null, // Start as null
    typre: 0, // 0 often indicates "not selected"
    content: '',
    idEvent: null, 
    selectedTags: [],
    file: null,
    idUser: null, // Start as null
    preview: null,
  };
 
  
  const [formData, setFormData] = useState<FormDataState>(initialFormData);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [error, setError] = useState<string | null>(null); // Error state typed as string or null
  const [success, setSuccess] = useState(false);
  const { handleCrearTestimonio, loading } = useCrearTestimonio();
  const [selectedEvent, setSelectedEvent] = useState<SelectedEvent | null>(null);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false); // Renamed for clarity
  

  const handleFile = async (data: CrearTestimonioData["file"]) => {
    try {
      setError('');
      
      const fileResponse = await uploadFile(data);
      console.log('Registro exitoso:', fileResponse.message);
        return fileResponse.fileData; // Adjust based on your API response
      } catch (err: any) {
        setError('Error al subir el archivo. Por favor, intenta nuevamente.');
        alert(err.response?.data?.message || 'Error desconocido.');
        return null;
      }
  };


  // Effect to get user ID from localStorage
  useEffect(() => {
    const dataUser = localStorage.getItem('user');
    if (dataUser) {
      try {
        const convertido = JSON.parse(dataUser);
        const userId = convertido.idUser; // Ensure this path is correct
        if (userId) {
          setFormData(prev => ({ ...prev, idUser: Number(userId) }));
        } else {
           console.warn('User ID not found in localStorage data.');
        }
      } catch (e) {
        console.error('Error parsing user data from localStorage:', e);
      }
    } else {
        console.warn('User data not found in localStorage.');
        // Optionally redirect to login or show message
    }
  }, []);

  // Effect to potentially reset form state when closed/opened
  useEffect(() => {
    if (!isOpen) {
        // Example Reset Logic (Uncomment if needed)
        // setCurrentStep(0);
        // setFormData(initialFormData);
        // setFileUploaded(false);
        // setError(null);
        // setSuccess(false);
        // setSelectedEvent(null);
        // // Re-fetch user ID if it might change
        // const dataUser = localStorage.getItem('user');
        // if (dataUser) {
        //     try {
        //         const convertido = JSON.parse(dataUser);
        //         const userId = convertido.idUser;
        //         if (userId) setFormData(prev => ({...initialFormData, idUser: Number(userId)}));
        //     } catch {}
        // }
    }
  }, [isOpen]); // Dependency array includes isOpen

  // --- Event Handlers ---
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (name === 'file' && e.target instanceof HTMLInputElement && e.target.files?.length) {
        const file = e.target.files[0];
        if (file) {
            const filePreview = URL.createObjectURL(file);
            setFormData(prev => ({ ...prev, file: file, preview: filePreview }));
            setFileUploaded(true);
        } else {
            // Handle case where file selection is cancelled
             setFormData(prev => ({ ...prev, file: null, preview: null }));
             setFileUploaded(false);
        }
    } else if (type === 'number' || e.target.tagName === 'SELECT') { // Handle select and number inputs
        setFormData(prev => ({
            ...prev,
            [name]: value ? parseInt(value, 10) : (name === 'typre' ? 0 : null), // Reset to 0 or null if empty
        }));
    } else {
        setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleCiudadSelected = useCallback((ciudadId: number | null) => { // Allow null? Assume number is required
    setFormData(prev => ({ ...prev, idcity: ciudadId }));
  }, []); // Empty dependency array if DepartmentCitySelector manages its own state

  const handleTagsSelected = useCallback((selectedTags: Tag[]) => {
    setFormData(prev => ({ ...prev, selectedTags: selectedTags }));
  }, []); // Empty dependency array if TagsSelectionContainer manages its own state

  const handleEventSelected = (event: SelectedEvent) => {
    setSelectedEvent(event);
    setFormData(prev => ({ ...prev, idEvent: event.id }));
    setIsEventModalOpen(false);
  };

  const clearFile = () => {
    setFormData(prev => ({ ...prev, file: null, preview: null }));
    setFileUploaded(false);
    const fileInput = document.getElementById('file') as HTMLInputElement | null;
    if (fileInput) {
        fileInput.value = ""; // Reset the actual input element
    }
  };

  // --- Step Navigation ---
  const nextStep = () => {
    setError(null); // Clear errors on step change attempt
    // Validation before proceeding
    if (currentStep === 0 && !fileUploaded) {
      setError("Por favor, sube un archivo para continuar.");
      return;
    }
    if (currentStep === 1 && (!formData.title || !formData.description)) {
      setError("Por favor, completa el título y la descripción.");
      return;
    }
     if (currentStep === 2 && !formData.idcity) { // Example validation for Step 3
      setError("Por favor, selecciona una ciudad.");
      return;
    }
    // Add more step-specific validations if needed

    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setError(null); // Clear errors when going back
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (step: number) => {
    // Only allow navigating back to previously completed steps
    if (step < currentStep) { 
        setError(null); // Clear errors when going back
        setCurrentStep(step);
    }
  };

  // --- Form Submission ---
  const handleSubmit = async () => {
    setError(null); // Clear previous errors
    
    // Final Validations
    if (!formData.idUser) {
        setError('No se pudo identificar al usuario. Por favor, inicia sesión de nuevo.');
        return; // Cannot submit without user ID
    }
    if (!formData.file) {
        setError('Por favor, sube un archivo (Paso 1).');
        setCurrentStep(0); 
        return;
    }
    if (!formData.title || !formData.description) {
        setError('Por favor, completa el título y la descripción (Paso 2).');
        setCurrentStep(1);
        return;
    }
    if (!formData.idcity) {
        setError('Por favor, selecciona una ciudad (Paso 3).');
        setCurrentStep(2);
        return;
    }
    if (!formData.content) {
        setError('Por favor, completa el contenido del testimonio (Paso 4).');
        setCurrentStep(3);
        return;
    }
    if (formData.typre === 0) { // Check if a valid type is selected
        setError('Por favor, selecciona un tipo de testimonio (Paso 4).');
        setCurrentStep(3);
        return;
    }

    const dataUser = localStorage.getItem('user');
    if (!dataUser) { // Double check user data just before submit
      setError('No has iniciado sesión.');
      return;
    }
    
    try {
        const convertido = JSON.parse(dataUser);
        const token = convertido.token; // Ensure 'token' exists
        
        if (!token) {
            setError('Token no encontrado. Por favor inicia sesión nuevamente.');
            return;
        }

        const tagIds = formData.selectedTags.map((tag: Tag) => tag.id);
        const fileData = await handleFile(formData.file); 
        // Construct data payload carefully, ensuring required fields are present
        const dataToSend = {
            title: formData.title,
            description: formData.description,
            content: formData.content,
            idCity: formData.idcity, // Ensure backend expects idCity
            idEvent: formData.idEvent, // Can be null if optional
            tags: tagIds.join(','), // Convert to string if needed
            fileData: fileData, // File object itself
            idUser: formData.idUser,
            type: formData.typre, // Ensure backend expects 'type' or 'typre'
        };
        console.log('Datos a enviar:', dataToSend);

        await handleCrearTestimonio(dataToSend, token); // Pass data and token
        setSuccess(true);
        setError(null);
        
        // Reset and close after delay
        setTimeout(() => {
            setFormData(initialFormData); 
            setFileUploaded(false);
            setCurrentStep(0);
            setSuccess(false);
            setSelectedEvent(null);
            const fileInput = document.getElementById('file') as HTMLInputElement | null;
            if (fileInput) fileInput.value = ""; // Clear file input visually

            if (onSuccessSubmit) onSuccessSubmit(dataToSend); 
            if (onClose) onClose(); 
        }, 3000);
      
    } catch (err: any) { // Catch potential errors from API call
        console.error('Error al crear testimonio:', err);
        setError(err?.message || 'Error al crear el testimonio. Intenta nuevamente.');
        setSuccess(false); // Ensure success state is false on error
    }
  };

  // --- Render Step Functions ---
  const renderStep1 = () => (
    <div key="step1" className="w-full animate-fadeIn">
      <div className="bg-white p-6 md:p-8 rounded-lg"> 
        <h3 className="text-xl font-semibold text-center mb-4 text-rose-800">1. Sube tu Archivo</h3>
        <p className="text-gray-600 mb-6 text-center text-sm">
          Video, audio, imagen o documento que contenga tu testimonio.
        </p>
        
        <div className="flex flex-col items-center justify-center">
          <label 
            htmlFor="file" 
            className={`group w-full max-w-lg h-60 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
              fileUploaded ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-rose-400 hover:bg-rose-50'
            }`}
          >
            {formData.preview ? (
              <div className="flex flex-col items-center text-center p-2 overflow-hidden">
                {formData.file?.type.startsWith('image/') ? (
                  <img 
                    src={formData.preview} 
                    alt="Vista previa" 
                    className="max-h-32 max-w-full mb-2 rounded object-contain" 
                  />
                ) : (
                  <div className="w-16 h-16 bg-rose-100 rounded-lg flex items-center justify-center mb-2">
                    <FileText size={32} className="text-rose-600" />
                  </div>
                )}
                <p className="text-xs text-gray-700 truncate w-full px-2">{formData.file?.name}</p>
                {fileUploaded && <Check className="text-green-500 mt-1" size={20} />}
              </div>
            ) : (
              <>
                <UploadCloud className="w-10 h-10 text-gray-400 mb-2 transition-colors group-hover:text-rose-500" />
                <p className="text-sm text-gray-500 text-center transition-colors group-hover:text-rose-600">
                  Arrastra y suelta o<br />
                  <span className="text-rose-500 font-semibold">busca en tu dispositivo</span>
                </p>
                <p className="text-xs text-gray-400 mt-2 px-2">
                  Max. 100MB (JPG, PNG, MP4, MP3, PDF)
                </p>
              </>
            )}
          </label>
          <input 
            type="file"
            id="file"
            name="file"
            onChange={handleChange}
            className="hidden"
            accept="image/jpeg,image/png,video/mp4,audio/mpeg,.pdf" // Be more specific with accept types
          />
          
          {fileUploaded && (
            <button 
              type="button" // Important for buttons inside forms
              onClick={clearFile}
              className="mt-3 text-red-600 hover:text-red-800 flex items-center text-sm font-medium"
            >
              <X size={16} className="mr-1" /> Cambiar archivo
            </button>
          )}
        </div>
      </div>
    </div>
  );
  
  const renderStep2 = () => (
    <div key="step2" className="w-full animate-fadeIn">
      <div className="bg-white p-6 md:p-8 rounded-lg">
        <h3 className="text-xl font-semibold text-center mb-6 text-rose-800">2. Información Básica</h3>
        <div className="space-y-5">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Título del Testimonio <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Edit className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-rose-500"
                placeholder="Ej: Mi experiencia en..."
                required
                aria-required="true"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Descripción Breve <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <FileText className="w-5 h-5 text-gray-400 absolute left-3 top-3.5 pointer-events-none" />
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-rose-500"
                rows={3}
                placeholder="Un resumen conciso..."
                required
                 aria-required="true"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  const renderStep3 = () => (
    <div key="step3" className="w-full animate-fadeIn">
      <div className="bg-white p-6 md:p-8 rounded-lg">
        <h3 className="text-xl font-semibold text-center mb-6 text-rose-800">3. Ubicación</h3>
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-rose-600 mr-2" />
                Departamento y Ciudad <span className="text-red-500">*</span>
              </div>
            </label>
            {/* DepartmentCitySelector should handle setting formData.idcity via onCiudadSelected */}
            <DepartmentCitySelector 
                onCiudadSelected={handleCiudadSelected} 
                // Pass current value if needed for initialization: initialCityId={formData.idcity}
            /> 
          </div>
          
          <div className="bg-rose-50 p-3 rounded-lg border border-rose-100">
            <p className="text-sm text-rose-700 flex items-start">
              <Info size={16} className="inline mr-2 mt-0.5 flex-shrink-0 text-rose-500" />
              <span>La ubicación ayuda a contextualizar tu testimonio.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
  
  const renderStep4 = () => (
    <div key="step4" className="w-full animate-fadeIn">
      <div className="bg-white p-6 md:p-8 rounded-lg">
        <h3 className="text-xl font-semibold text-center mb-6 text-rose-800">4. Detalles Adicionales</h3>
        <div className="space-y-5">
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Contenido / Transcripción <span className="text-red-500">*</span>
            </label>
             <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-rose-500"
                rows={4}
                placeholder="Contenido completo. Si es audio/video, puedes añadir una transcripción..."
                required
                aria-required="true"
              />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="typre" className="block text-sm font-medium text-gray-700 mb-1">
                <div className="flex items-center">
                  <ListChecks className="w-4 h-4 text-rose-600 mr-1.5" />
                  Tipo <span className="text-red-500">*</span>
                </div>
              </label>
              <select
                id="typre"
                name="typre"
                value={formData.typre}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-rose-500 bg-white appearance-none pr-8 bg-no-repeat" 
                style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundSize: '1.5em 1.5em' }}
                required
                aria-required="true"
              >
                <option value="0" disabled>Seleccionar...</option>
                <option value="1">Personal</option>
                <option value="2">Histórico</option>
                <option value="3">Cultural</option>
                <option value="4">Otro</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 text-rose-600 mr-1.5" />
                  Evento Relacionado (Opcional)
                </div>
              </label>
              <button 
                type="button"
                onClick={() => setIsEventModalOpen(true)} 
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg hover:bg-gray-100 text-left text-gray-700 focus:outline-none focus:ring-2 focus:ring-rose-300 truncate"
              >
                {selectedEvent ? selectedEvent.title : "Seleccionar evento..."}
              </button>

              {selectedEvent && (
                <div className="mt-1.5 px-2 py-1 bg-rose-50 rounded text-xs border border-rose-100 text-rose-700">
                  Evento: {selectedEvent.title}
                </div>
              )}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center">
                <Tag className="w-4 h-4 text-rose-600 mr-1.5" />
                Etiquetas (Opcional)
              </div>
            </label>
            {/* TagsSelectionContainer should handle setting formData.selectedTags via onTagsSelect */}
            <TagsSelectionContainer 
                onTagsSelect={handleTagsSelected} 
                // Pass current tags if needed: initialTags={formData.selectedTags} 
            /> 
            
            {formData.selectedTags.length > 0 && (
              <div className="mt-2">
                <p className="text-xs text-gray-600 mb-1.5">Etiquetas seleccionadas:</p>
                <div className="flex flex-wrap gap-1.5">
                  {formData.selectedTags.map((tag: Tag) => (
                    <span key={tag.id} className="bg-rose-100 text-rose-800 text-xs px-2.5 py-1 rounded-full font-medium">
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
       {/* Event Selection Modal - Placed here for context but rendered conditionally via state */}
      <EventSelectionModal
          isOpen={isEventModalOpen}
          onClose={() => setIsEventModalOpen(false)}
          onSelectEvent={handleEventSelected}
      />
    </div>
  );

  // --- Step Content Array ---
  const stepContent = [
    renderStep1(),
    renderStep2(),
    renderStep3(),
    renderStep4()
  ];

  // --- Component Render ---
  if (!isOpen) return null; // Don't render anything if modal is closed

  return (
    <div 
        className="fixed inset-0 bg-white bg-opacity-70 flex justify-center items-center z-50 p-4 transition-opacity duration-300 ease-in-out" 
        role="dialog" 
        aria-modal="true" 
        aria-labelledby="modal-title"
    >
      {/* Use a form element if appropriate, otherwise div is fine */}
      <div className="bg-gradient-to-b from-rose-50 to-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 sm:p-5 border-b border-gray-200 flex-shrink-0">
            <h2 id="modal-title" className="text-xl sm:text-2xl font-semibold text-rose-900">Crear Testimonio</h2>
            <button 
                onClick={onClose} 
                className="text-gray-400 hover:text-rose-700 transition-colors p-1 rounded-full hover:bg-rose-100 focus:outline-none focus:ring-2 focus:ring-rose-300"
                aria-label="Cerrar modal"
            >
                <X size={24} />
            </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-4 sm:p-6 flex-grow">
          {/* Success Message */}
          {success && (
            <div className="bg-green-50 border-l-4 border-green-500 text-green-800 p-4 mb-5 rounded-md shadow-sm flex items-center" role="alert">
              <Check className="h-5 w-5 mr-2.5 text-green-600 flex-shrink-0" />
              <div>
                <p className="font-semibold">¡Éxito!</p>
                <p className="text-sm">Tu testimonio ha sido enviado.</p>
              </div>
            </div>
          )}
          
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 text-red-800 p-4 mb-5 rounded-md shadow-sm" role="alert">
               <p className="font-bold">Error</p>
              <p className="text-sm">{error}</p>
            </div>
          )}
          
          {/* Step Indicator */}
          <FormSteps 
            currentStep={currentStep} 
            totalSteps={totalSteps} 
            goToStep={goToStep} 
          />
          
          {/* Step Content */}
          <div className="mt-6"> 
            {stepContent[currentStep]}
          </div>
        </div>

         {/* Modal Footer with Navigation */}
        <div className="px-4 sm:px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl flex-shrink-0">
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 0 || loading}
              className={`px-5 py-2 rounded-lg flex items-center text-sm sm:text-base font-medium transition-colors duration-200
                ${currentStep === 0 || loading ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              <ChevronLeft className="h-5 w-5 mr-1" />
              Anterior
            </button>
            
            {currentStep === totalSteps - 1 ? (
              // Final Submit Button
              <button
                type="button" // Change to type="submit" if the outer container is a <form>
                onClick={handleSubmit}
                disabled={loading || success} // Disable after success too
                className="px-5 py-2 bg-rose-600 text-white rounded-lg flex items-center text-sm sm:text-base font-medium hover:bg-rose-700 disabled:bg-rose-300 transition-colors duration-200"
              >
                {loading ? (
                    <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Enviando...
                    </>
                ) : 'Enviar Testimonio'}
                {!loading && <Check className="h-5 w-5 ml-1.5" />}
              </button>
            ) : (
              // Next Step Button
              <button
                type="button"
                onClick={nextStep}
                disabled={ // Disable logic based on current step validation needs
                  loading ||
                  (currentStep === 0 && !fileUploaded) || 
                  (currentStep === 1 && (!formData.title || !formData.description)) ||
                  (currentStep === 2 && !formData.idcity) 
                  // Don't disable based on Step 4 fields here, final validation is on submit
                }
                className={`px-5 py-2 rounded-lg flex items-center text-sm sm:text-base font-medium transition-colors duration-200
                  ${ // Determine button style based on disabled state
                    (currentStep === 0 && !fileUploaded) || 
                    (currentStep === 1 && (!formData.title || !formData.description)) ||
                    (currentStep === 2 && !formData.idcity) 
                    ? 'bg-rose-300 text-white cursor-not-allowed' 
                    : 'bg-rose-600 text-white hover:bg-rose-700'
                  }` // Corrected: No extra brace here
                } 
              >
                Siguiente
                <ChevronRight className="h-5 w-5 ml-1" />
              </button>
            )}
          </div>
        </div>
      </div> {/* End Modal Content container */}
    </div> /* End Modal Wrapper */
  );
};

