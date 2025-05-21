import { useState } from "react";
import PanelUser from "../components/PanelUser";
import PanelPostUser from "../components/PanerPostUser";
import Colecciones from "../components/Colecciones";
import FolderList from "../../Coleciones/components/listFolders";

function PerfilPage() {
  const [activeTab, setActiveTab] = useState("informacion");

  // Colores inspirados en el bicentenario de Bolivia
  // Rojo, amarillo y verde (bandera) con tonos elegantes
  const colors = {
    primary: "#A42029", // Rojo boliviano elegante
    secondary: "#F9B934", // Amarillo dorado elegante
    tertiary: "#224D17", // Verde boliviano oscuro
    light: "#F5F5F5",
    dark: "#333333",
    accent: "#D4AF37", // Dorado para acentos
  };

  // Función para manejar el cambio de pestañas
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Renderizar el contenido según la pestaña activa
  const renderContent = () => {
    switch (activeTab) {
      case "informacion":
        return <PanelUser />;
      case "testimonios":
        return <PanelPostUser />;
      case "colecciones":
        return (
          <div>
            <Colecciones />
            <FolderList />
          </div>
        );
      default:
        return <PanelUser />;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen pb-12">
      {/* Encabezado con colores bicentenario */}
      <div 
        className="w-full py-8 px-4 text-center" 
        style={{ 
          background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.tertiary} 100%)`,
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
        }}
      >
        <h1 className="text-3xl font-bold text-white mb-2">Mi Perfil</h1>
        <p className="text-gray-200">Bienvenido a tu espacio personal</p>
      </div>

      {/* Sistema de pestañas */}
      <div className="container mx-auto px-4 -mt-6">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Navegación de pestañas */}
          <div className="flex border-b">
            <TabButton 
              active={activeTab === "informacion"} 
              onClick={() => handleTabChange("informacion")}
              color={colors.primary}
            >
              Información Personal
            </TabButton>
            <TabButton 
              active={activeTab === "testimonios"} 
              onClick={() => handleTabChange("testimonios")}
              color={colors.primary}
            >
              Testimonios
            </TabButton>
            <TabButton 
              active={activeTab === "colecciones"} 
              onClick={() => handleTabChange("colecciones")}
              color={colors.primary}
            >
              Mis Colecciones
            </TabButton>
          </div>

          {/* Contenido de la pestaña */}
          <div className="p-6">
            {renderContent()}
          </div>
        </div>
      </div>

      {/* Pie de página con acento de colores */}
      <div 
        className="w-full mt-12 py-4 text-center"
        style={{ 
          borderTop: `3px solid ${colors.secondary}`,
          background: colors.light
        }}
      >
        <p style={{ color: colors.dark }}>© 2025 | Diseño inspirado en el Bicentenario de Bolivia</p>
      </div>
    </div>
  );
}

// Componente para los botones de pestañas
function TabButton({ children, active, onClick, color }) {
  return (
    <button
      className={`flex-1 py-4 px-6 font-medium transition-all duration-200 focus:outline-none ${
        active ? "text-white" : "text-gray-600 hover:text-gray-800"
      }`}
      style={{
        backgroundColor: active ? color : "transparent",
        borderBottom: active ? "none" : `1px solid #e5e7eb`,
      }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default PerfilPage;