import { useGuestLogin } from "../hooks/useInivitado";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

function SplashPage() {
  const navigate = useNavigate();
  const { continuarComoInvitado } = useGuestLogin();
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [fadeState, setFadeState] = useState("in");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const oLetterRef = useRef(null);
  
  // Palabras que se alternarán en el subtítulo
  const changingWords = ["INDEPENDENCIA", "PATRIMONIO", "IDENTIDAD", "LIBERTAD", "CULTURA"];
  
  useEffect(() => {
    setIsLoaded(true);
    
    // Manejo de la animación para cambiar palabras cada 2 segundos
    const wordInterval = setInterval(() => {
      // Primero hacemos fade out
      setFadeState("out");
      
      // Después de completar el fade out, cambiamos la palabra y hacemos fade in
      setTimeout(() => {
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % changingWords.length);
        setFadeState("in");
      }, 500); // La mitad del intervalo para fade out/in
      
    }, 2000); // Cambio cada 2 segundos
    
    return () => clearInterval(wordInterval);
  }, []);

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  // Función para manejar la transición al hacer clic en "Comenzar"
  const handleStart = () => {
    setIsTransitioning(true);
    
    // Calculamos la posición de la letra O para centrar la animación
    const oElement = oLetterRef.current;
    if (oElement) {
      const rect = oElement.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Aplicamos los estilos de transición al elemento raíz para centrar el zoom
      document.documentElement.style.setProperty('--zoom-center-x', `${centerX}px`);
      document.documentElement.style.setProperty('--zoom-center-y', `${centerY}px`);
    }
    
    // Después de la animación, navegamos a la página principal
    setTimeout(() => {
      continuarComoInvitado();
    }, 1000); // Tiempo de la animación
  };

  return (
    <div className={`relative h-screen w-screen overflow-hidden ${isTransitioning ? 'zooming' : ''}`}>
      {/* Background con overlay y animación sutil de zoom */}
      <div 
        className={`absolute inset-0 bg-[url('../assets/desierto-salar-uyuni-bolivia-1504208619.jpg')] bg-cover bg-center transition-transform duration-10000 ${isTransitioning ? 'zoom-bg' : ''}`}
        style={{ 
          transform: isLoaded && !isTransitioning ? 'scale(1.05)' : 'scale(1)',
          transition: 'transform 30s ease-out'
        }}
      >
        <div className={`absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70 ${isTransitioning ? 'fade-out' : ''}`}></div>
      </div>


      {/* Header con logo y botones con animación de entrada */}
      <header className={`absolute top-0 w-full p-6 flex justify-between items-center z-20 transition-all duration-1000 
        ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'} 
        ${isTransitioning ? 'fade-out' : ''}`}>
        <div className="text-white font-bold text-xl">
          <span className="text-red-500 hover:animate-pulse">B</span>
          <span className="text-yellow-400 hover:animate-pulse">I</span>
          <span className="text-green-500 hover:animate-pulse">C</span>
          <span className="text-white hover:text-yellow-400 transition-colors duration-300">ENTENARIO</span>
        </div>
        <div className="flex gap-4">
          <button 
            className="border-2 border-white text-white py-2 px-6 rounded-full bg-transparent hover:bg-white hover:bg-opacity-20 hover:text-yellow-400 transition-all duration-300 font-semibold hover:shadow-glow"
            onClick={handleLogin}
          >
            Inicia Sesión
          </button>
          <button 
            className="border-2 border-white text-white py-2 px-6 rounded-full bg-transparent hover:bg-white hover:bg-opacity-20 hover:text-yellow-400 transition-all duration-300 font-semibold hover:shadow-glow"
            onClick={handleRegister}
          >
            Regístrate
          </button>
        </div>
      </header>

      {/* Main Content con animación */}
      <main className={`absolute inset-0 flex flex-col justify-center items-center z-10 px-4 transition-all duration-1500 
        ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Título BOLIVIA con animación de letra por letra */}
        <h1 className={`text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-widest relative z-30
            ${isTransitioning ? 'zoom-title' : ''}`}
            style={{ 
              letterSpacing: "4rem", 
              textShadow: "0 0 20px rgba(0,0,0,0.5)",
              animation: isLoaded && !isTransitioning ? "shimmer 3s infinite" : "none"
            }}
        >
          <span className="inline-block" style={{ animationDelay: "0.1s" }}>B</span>
        
          <span 
            className="inline-block o-letter"
            style={{ animationDelay: "0.3s" }}
            ref={oLetterRef}
          >
            O
          </span>
          <span className="inline-block" style={{ animationDelay: "0.4s" }}>L</span>
          <span className="inline-block" style={{ animationDelay: "0.5s" }}>I</span>
          <span className="inline-block" style={{ animationDelay: "0.6s" }}>V</span>
          <span className="inline-block" style={{ animationDelay: "0.7s" }}>I</span>
          <span className="inline-block" style={{ animationDelay: "0.8s" }}>A</span>
        </h1>
        
        {/* Subtítulo con palabra cambiante */}
        <h2 className={`text-2xl md:text-3xl text-yellow-400 mt-4 font-semibold overflow-hidden
            ${isTransitioning ? 'fade-out' : ''}`}
            style={{ 
              letterSpacing: "0.5rem", 
              textShadow: "0 0 20px rgba(0,0,0,0.5)" 
            }}
        >
          200 AÑOS DE{" "}
          <span 
            className={`inline-block transition-opacity duration-500 ${fadeState === "in" ? "opacity-100" : "opacity-0"}`}
          >
            {changingWords[currentWordIndex]}
          </span>
        </h2>
        
        {/* Descripción con aparecer gradual */}
        <p className={`text-white text-center max-w-2xl mt-6 text-lg
            ${isTransitioning ? 'fade-out' : ''}`}>
          Celebramos dos siglos de historia, cultura y libertad.
          <br />
          Un recorrido por nuestra identidad, patrimonio y futuro.
        </p>

        {/* Botón CTA con animación de pulso suave */}
        <div className={`mt-16 transition-all duration-2000 
            ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
            ${isTransitioning ? 'fade-out' : ''}`}>
          <button
            className="bg-red-600 text-white font-bold py-3 px-16 rounded-full hover:bg-amber-300 transition-all duration-300 transform hover:scale-105 shadow-lg animate-pulse-slow"
            onClick={handleStart}
            style={{ animation: "pulse 3s infinite" }}
            disabled={isTransitioning}
          >
            Comenzar la Experiencia
          </button>
        </div>
      </main>
      
      {/* Círculo de transición que simulará la letra O expandiéndose */}
      <div className={`o-portal ${isTransitioning ? 'expanding' : ''}`}></div>
      
      {/* Estilos CSS para animaciones customizadas */}
      <style jsx>{`
        :root {
          --zoom-center-x: 50%;
          --zoom-center-y: 50%;
        }
        
        @keyframes shimmer {
          0% { text-shadow: 0 0 10px rgba(255,255,255,0.1); }
          50% { text-shadow: 0 0 20px rgba(255,255,255,0.5); }
          100% { text-shadow: 0 0 10px rgba(255,255,255,0.1); }
        }
        
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        
        .hover\\:shadow-glow:hover {
          box-shadow: 0 0 10px rgba(255,255,255,0.5);
        }
        
        .animate-pulse-slow {
          animation: pulse 3s infinite;
        }
        
        h1 span {
          animation: letterFadeIn 0.5s forwards;
          opacity: 0;
        }
        
        @keyframes letterFadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        /* Estilos para la transición de zoom */
        .zooming {
          perspective: 1500px;
          transform-style: preserve-3d;
        }
        
        .zoom-bg {
          transition: all 2s cubic-bezier(0.65, 0, 0.35, 1);
          transform: scale(3) !important;
          filter: blur(3px);
        }
        
        .zoom-title {
          animation: moveLettersApart 1s ease-in forwards;
        }
        
        @keyframes moveLettersApart {
          0% { letter-spacing: 4rem; }
          100% { letter-spacing: 8rem; opacity: 0.3; }
        }
        
        .fade-out {
          animation: fadeOut 0.7s forwards;
        }
        
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        
        /* Estilos para el "portal" de la letra O */
        .o-letter {
          position: relative;
          z-index: 50;
        }
        
        .o-portal {
          position: fixed;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0);
          width: 5px;
          height: 5px;
          top: var(--zoom-center-y);
          left: var(--zoom-center-x);
          transform: translate(-50%, -50%);
          opacity: 0;
          z-index: 40;
          pointer-events: none;
          box-shadow: 0 0 0 rgba(255, 255, 255, 0);
          transition: none;
        }
        
        .o-portal.expanding {
          animation: expandPortal 2s cubic-bezier(0.19, 1, 0.22, 1) forwards;
          background-color: white;
        }
        
        @keyframes expandPortal {
          0% {
            width: 5px;
            height: 5px;
            opacity: 0;
          }
          10% {
            opacity: 1;
            box-shadow: 0 0 100px 10px rgba(255, 255, 255, 0.8);
          }
          100% {
            width: 250vw;
            height: 250vw;
            opacity: 1;
            box-shadow: 0 0 0 30px rgba(255, 255, 255, 0);
          }
        }
      `}</style>
    </div>
  );
}

export default SplashPage;