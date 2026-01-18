import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Preloader from "@/components/Preloader";
import logoGarmony from "@/assets/logo-garmony.png";
import heroImage from "@/assets/hero-interior.jpg";
import catalogMockup from "@/assets/catalog-mockup.jpg";

const Index = () => {
  const [isPreloaderComplete, setIsPreloaderComplete] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (!isPreloaderComplete) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isPreloaderComplete]);

  return (
    <>
      {/* Preloader */}
      {!isPreloaderComplete && (
        <Preloader onComplete={() => setIsPreloaderComplete(true)} />
      )}

      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        {/* Hero Section - Full Screen */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          {/* Background Image with Parallax */}
          <div 
            className="absolute inset-0 z-0"
            style={{ transform: `translateY(${scrollY * 0.3}px)` }}
          >
            <motion.img
              src={heroImage}
              alt="Премиальный интерьер с дверью Garmony"
              className="w-full h-[120%] object-cover"
              initial={{ scale: 1.1 }}
              animate={{ scale: isPreloaderComplete ? 1 : 1.1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
            {/* Minimal gradient only at bottom for footer transition */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center text-center px-6">
            {/* Main Logo - Large */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ 
                opacity: isPreloaderComplete ? 1 : 0, 
                y: isPreloaderComplete ? 0 : 30 
              }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <img
                src={logoGarmony}
                alt="Garmony - Фабрика дверей"
                className="h-16 md:h-24 lg:h-28 w-auto brightness-0 invert"
              />
            </motion.div>

            {/* Decorative Line */}
            <motion.div 
              className="h-px bg-accent mt-8"
              initial={{ width: 0 }}
              animate={{ width: isPreloaderComplete ? 120 : 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />

            {/* Tagline */}
            <motion.p 
              className="mt-10 text-sm md:text-base tracking-[0.3em] uppercase text-foreground/90 font-light drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: isPreloaderComplete ? 1 : 0, 
                y: isPreloaderComplete ? 0 : 20 
              }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              Искусство создавать пространство
            </motion.p>

            {/* CTA Button */}
            <motion.a
              href="#collections"
              className="mt-16 group flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: isPreloaderComplete ? 1 : 0, 
                y: isPreloaderComplete ? 0 : 20 
              }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4 group-hover:text-accent transition-colors duration-300">
                Каталог
              </span>
              <div className="w-px h-12 bg-gradient-to-b from-accent to-transparent group-hover:h-16 transition-all duration-300" />
            </motion.a>
          </div>

          {/* Side Decorations */}
          <motion.div 
            className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ 
              opacity: isPreloaderComplete ? 1 : 0, 
              x: isPreloaderComplete ? 0 : -20 
            }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <div className="w-px h-20 bg-gradient-to-b from-transparent via-accent/50 to-transparent" />
            <span className="text-xs tracking-widest text-muted-foreground rotate-90 origin-center whitespace-nowrap">
              EST. 2010
            </span>
            <div className="w-px h-20 bg-gradient-to-b from-transparent via-accent/50 to-transparent" />
          </motion.div>

          {/* Right Side Scroll Indicator */}
          <motion.div 
            className="absolute right-8 bottom-12 hidden lg:flex flex-col items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: isPreloaderComplete ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <motion.div 
              className="w-px h-16 bg-gradient-to-b from-accent/60 to-transparent"
              animate={{ scaleY: [1, 0.6, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="text-[10px] tracking-widest text-muted-foreground uppercase">
              Scroll
            </span>
          </motion.div>
        </section>

        {/* Catalog Section - Full Width */}
        <section id="collections" className="relative flex items-center justify-center min-h-screen py-20">
          {/* Full width catalog image */}
          <div className="w-full max-w-5xl mx-auto px-6">
            <motion.div 
              className="relative"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              {/* Text overlay */}
              <motion.div 
                className="text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-light tracking-wide leading-tight">
                  Откройте
                </h2>
                <p className="mt-4 text-lg md:text-xl text-muted-foreground font-light tracking-wider">
                  для себя новый каталог
                </p>
                <div className="mt-6 w-16 h-px bg-accent mx-auto" />
              </motion.div>

              {/* Catalog image - full width */}
              <motion.img
                src={catalogMockup}
                alt="Каталог Garmony — коллекции дверей премиум-класса"
                className="w-full h-auto"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-border">
          <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <img
              src={logoGarmony}
              alt="Garmony"
              className="h-8 w-auto brightness-0 invert opacity-70"
            />
            <p className="text-xs text-muted-foreground tracking-wider">
              © 2025 Garmony. Фабрика дверей премиум-класса
            </p>
            <a 
              href="tel:+7800000000" 
              className="text-sm text-foreground hover:text-accent transition-colors tracking-wider"
            >
              +7 (800) 000-00-00
            </a>
          </div>
        </footer>
      </div>
    </>
  );
};


export default Index;
