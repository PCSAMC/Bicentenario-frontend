
import HeroSection from "../components/hero";
import NavBar from "../components/navbar";
import PowerSection from "../components/PoderTestimonios";
import AutomaticCarousel from "../components/carrusel";
import SectionSeparator from "../components/separador";
import FeaturesSection from "../components/carracteristicas";
import BlogSection from "../components/blog";
import TestimonialsSection from "../components/testimonios";
import ContactSection from "../components/contactos";
import Footer from "../components/footer";
export default function BicentenarioHomepage() {
  return (
    <div className="flex flex-col min-h-screen font-sans">
      <NavBar />
      <main className="flex-grow">
        <HeroSection />
        <AutomaticCarousel />
        <PowerSection />
        <FeaturesSection />
        <BlogSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}



