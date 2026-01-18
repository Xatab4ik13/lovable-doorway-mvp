import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Preloader from "@/components/Preloader";
import logoGarmony from "@/assets/logo-garmony.png";
import heroImage from "@/assets/hero-interior.jpg";
import catalogMockup from "@/assets/catalog-mockup.jpg";

const Index = () => {
  const [isPreloaderComplete, setIsPreloaderComplete] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const transitionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: transitionRef,
    offset: ["start end", "end start"]
  });
  
  const transitionOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.8, 1]);

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

        {/* Gold Line Transition */}
        <div className="relative">
          <motion.div 
            className="h-[3px] w-full bg-accent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </div>

        {/* Catalog Section - White Background */}
        <section id="collections" className="relative pb-20 bg-white overflow-hidden">
          {/* Text with staggered animation */}
          <motion.div 
            className="text-center mb-16 px-6 pt-16 md:pt-24"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="text-3xl md:text-5xl lg:text-6xl font-sans font-light tracking-[0.3em] uppercase text-charcoal"
              initial={{ opacity: 0, y: 30, letterSpacing: "0.5em" }}
              whileInView={{ opacity: 1, y: 0, letterSpacing: "0.3em" }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              Откройте
            </motion.h2>
            <motion.p 
              className="mt-4 text-base md:text-lg text-charcoal/60 font-light tracking-[0.2em] uppercase"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              для себя новый каталог
            </motion.p>
            <motion.div 
              className="mt-6 h-px bg-accent mx-auto"
              initial={{ width: 0 }}
              whileInView={{ width: 64 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
          </motion.div>

          {/* Catalog image with scale and fade animation */}
          <motion.div
            className="flex justify-center px-6"
            initial={{ opacity: 0, scale: 0.9, y: 60 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ 
              duration: 1.2, 
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          >
            <motion.img
              src={catalogMockup}
              alt="Каталог Garmony — коллекции дверей премиум-класса"
              className="max-w-full h-auto"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.6 }}
            />
          </motion.div>
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
