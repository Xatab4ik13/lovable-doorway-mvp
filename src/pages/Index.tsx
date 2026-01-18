import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Preloader from "@/components/Preloader";
import logoGarmony from "@/assets/logo-garmony.png";
import heroImage from "@/assets/hero-interior.jpg";

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
              className="w-full h-[120%] object-cover opacity-60"
              initial={{ scale: 1.1 }}
              animate={{ scale: isPreloaderComplete ? 1 : 1.1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background" />
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
              className="mt-10 text-sm md:text-base tracking-[0.3em] uppercase text-muted-foreground font-light"
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
                Коллекции
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

        {/* Collections Preview */}
        <section id="collections" className="py-24 md:py-32 px-6 md:px-12">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-20">
              <span className="text-xs tracking-[0.3em] uppercase text-accent">
                Наши коллекции
              </span>
              <h2 className="mt-4 text-3xl md:text-5xl font-serif font-light tracking-wide">
                Безупречный дизайн
              </h2>
              <div className="mt-6 w-16 h-px bg-accent mx-auto" />
            </div>

            {/* Collection Cards */}
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              <CollectionCard
                title="Impuls"
                description="Современные решения для динамичного образа жизни"
                number="01"
              />
              <CollectionCard
                title="Costa"
                description="Элегантность средиземноморского стиля"
                number="02"
              />
            </div>
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

interface CollectionCardProps {
  title: string;
  description: string;
  number: string;
}

const CollectionCard = ({ title, description, number }: CollectionCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="group relative p-8 md:p-12 bg-card border border-border hover:border-accent/30 transition-all duration-500 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      {/* Number */}
      <span className="absolute top-6 right-6 text-5xl md:text-7xl font-serif text-muted/30 group-hover:text-accent/20 transition-colors duration-500">
        {number}
      </span>

      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-2xl md:text-3xl font-serif tracking-wide mb-4 group-hover:text-accent transition-colors duration-300">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground font-light leading-relaxed max-w-xs">
          {description}
        </p>

        {/* Hover Arrow */}
        <div 
          className={`mt-8 flex items-center gap-3 transition-all duration-300 ${
            isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
          }`}
        >
          <span className="text-xs tracking-[0.2em] uppercase text-accent">
            Подробнее
          </span>
          <div className="w-8 h-px bg-accent" />
        </div>
      </div>

      {/* Bottom Line */}
      <div 
        className={`absolute bottom-0 left-0 h-px bg-accent transition-all duration-500 ${
          isHovered ? "w-full" : "w-0"
        }`}
      />
    </motion.div>
  );
};

export default Index;
