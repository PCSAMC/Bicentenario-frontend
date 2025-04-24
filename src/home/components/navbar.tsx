import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Definición de interfaces para TypeScript
interface SubMenuItem {
  name: string;
  path: string;
}

interface NavItem {
  title: string;
  submenu: SubMenuItem[];
}

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);
  const navigate = useNavigate();

  const toggleSubmenu = (index: number) => {
    if (activeSubmenu === index) {
      setActiveSubmenu(null);
    } else {
      setActiveSubmenu(index);
    }
  };

  // Navitems con rutas para cada elemento del submenú
  const navItems: NavItem[] = [
    {
      title: "Inicio Rápido",
      submenu: [
        { name: "Historia", path: "/historia" },
        { name: "Cronología", path: "/cronologia" },
        { name: "Personajes Destacados", path: "/personajes" }
      ]
    },
    {
      title: "Testimonios Destacados",
      submenu: [
        { name: "Patriotas", path: "/testimonios/patriotas" },
        { name: "Comunidades", path: "/testimonios/comunidades" },
        { name: "Regiones", path: "/testimonios/regiones" }
      ]
    },
    {
      title: "Eventos Históricos",
      submenu: [
        { name: "Proclamaciones", path: "/eventos/proclamaciones" },
        { name: "Batallas", path: "/eventos/batallas" },
        { name: "Hitos Culturales", path: "/eventos/hitos-culturales" }
      ]
    },
    {
      title: "Recursos Educativos",
      submenu: [
        { name: "Documentos", path: "/recursos/documentos" },
        { name: "Multimedia", path: "/galeriaVideos" },
        { name: "Actividades", path: "/recursos/actividades" }
      ]
    }
  ];

  // Función para manejar la navegación
  const handleNavigation = (path: string) => {
    navigate(path);
    setActiveSubmenu(null); // Cierra el submenú después de la navegación
    setIsOpen(false); // Cierra el menú móvil si está abierto
  };

  return (
    <header className="bg-transparent hover:bg-black/20 py-4 px-6 backdrop-blur-sm fixed w-full z-50 transition-all duration-500">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="text-white font-bold text-xl">
              <span className="text-red-500 hover:animate-pulse">B</span>
              <span className="text-yellow-400 hover:animate-pulse">i</span>
              <span className="text-green-500 hover:animate-pulse">c</span>
              <span className="text-white hover:text-yellow-400 transition-colors duration-300">entenario</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-4">
            {navItems.map((item, index) => (
              <div key={index} className="relative group">
                <button 
                  className="text-white hover:text-amber-300 px-3 py-2 rounded-lg flex items-center transition-all duration-300 group"
                  onMouseEnter={() => setActiveSubmenu(index)}
                  onMouseLeave={() => setActiveSubmenu(null)}
                >
                  <span className="relative">
                    {item.title}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-300 group-hover:w-full transition-all duration-300"></span>
                  </span>
                  <ChevronDown className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:rotate-180" />
                </button>
                {/* Submenu */}
                <div 
                  className={`absolute z-10 left-0 mt-2 w-56 rounded-md shadow-lg bg-white/10 backdrop-blur-lg transform transition-all duration-300 origin-top-left ${
                    activeSubmenu === index 
                      ? "opacity-100 scale-100" 
                      : "opacity-0 scale-95 pointer-events-none"
                  }`}
                  onMouseEnter={() => setActiveSubmenu(index)}
                  onMouseLeave={() => setActiveSubmenu(null)}
                >
                  <div className="py-1 rounded-md bg-white/80 border border-white/20">
                    {item.submenu.map((subItem, subIndex) => (
                      <button
                        key={subIndex}
                        onClick={() => handleNavigation(subItem.path)}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-white/50 hover:text-red-700 transition-all duration-200 relative group/item"
                      >
                        <span className="relative">
                          {subItem.name}
                          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500/50 group-hover/item:w-full transition-all duration-300"></span>
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-yellow-200 focus:outline-none transition-colors duration-300"
            >
              {isOpen ? (
                <X className="h-8 w-8 animate-spin-once" />
              ) : (
                <Menu className="h-8 w-8" />
              )}
            </button>
          </div>

          {/* Call to action button */}
          <div className="hidden lg:block">
            <button 
              onClick={() => navigate("/login")}
              className="bg-transparent hover:bg-white hover:text-amber-300 text-white font-medium px-6 py-2 rounded-full shadow-md transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 border border-white/30 backdrop-blur-sm mr-2"
            >
              Iniciar Sesión
            </button>
            <button 
              onClick={() => navigate("/register")}
              className="bg-transparent hover:bg-white hover:text-amber-300 text-white font-medium px-6 py-2 rounded-full shadow-md transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 border border-white/30 backdrop-blur-sm"
            >
              Registrarse
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`lg:hidden transition-all duration-500 overflow-hidden ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mt-4 pb-3 space-y-1 bg-black/20 backdrop-blur-md rounded-lg p-2">
          {navItems.map((item, index) => (
            <div key={index} className="px-2">
              <button
                onClick={() => toggleSubmenu(index)}
                className="w-full text-left flex justify-between items-center px-3 py-2 rounded-md text-white hover:bg-white/20 transition-all duration-300 relative group"
              >
                <span className="relative">
                  {item.title}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-300/70 group-hover:w-full transition-all duration-300"></span>
                </span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-300 ${
                    activeSubmenu === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              
              <div
                className={`pl-4 mt-1 space-y-1 overflow-hidden transition-all duration-300 ${
                  activeSubmenu === index
                    ? "max-h-60 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                {item.submenu.map((subItem, subIndex) => (
                  <button
                    key={subIndex}
                    onClick={() => handleNavigation(subItem.path)}
                    className="block w-full text-left px-3 py-2 rounded-md text-white hover:bg-white/10 transition-all duration-300 border-l border-yellow-300/50 relative group/item"
                  >
                    <span className="relative">
                      {subItem.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-300/50 group-hover/item:w-full transition-all duration-300"></span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}
          
          <div className="px-2 pt-4 flex flex-col space-y-2">
            <button 
              onClick={() => navigate("/login")}
              className="w-full bg-white/10 hover:bg-white/20 text-white font-medium px-4 py-2 rounded-md shadow-md transition-all duration-300 border border-white/30 backdrop-blur-sm"
            >
              Iniciar Sesión
            </button>
            <button 
              onClick={() => navigate("/register")}
              className="w-full bg-white/10 hover:bg-white/20 text-white font-medium px-4 py-2 rounded-md shadow-md transition-all duration-300 border border-white/30 backdrop-blur-sm"
            >
              Registrarse
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default NavBar;