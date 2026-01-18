import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logoGR from "@/assets/logo-gr.png";

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const [phase, setPhase] = useState<"logo" | "reveal" | "done">("logo");

  useEffect(() => {
    // Phase 1: Show logo for 2s
    const logoTimer = setTimeout(() => {
      setPhase("reveal");
    }, 2000);

    // Phase 2: Reveal animation takes 1.2s
    const revealTimer = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 3200);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(revealTimer);
    };
  }, [onComplete]);

  // Number of vertical panels for the curtain effect
  const panelCount = 7;
  const panels = Array.from({ length: panelCount }, (_, i) => i);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Logo Animation */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-10"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: phase === "logo" ? 1 : 0,
              scale: phase === "logo" ? 1 : 1.1,
            }}
            transition={{ 
              duration: phase === "logo" ? 1 : 0.5,
              ease: "easeOut"
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center"
            >
              {/* Logo */}
              <motion.img
                src={logoGR}
                alt="GR"
                className="h-20 md:h-32 w-auto brightness-0 invert"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
              
              {/* Decorative line */}
              <motion.div
                className="h-px bg-accent mt-6"
                initial={{ width: 0 }}
                animate={{ width: 80 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              />
              
              {/* Tagline */}
              <motion.p
                className="mt-6 text-xs tracking-[0.4em] uppercase text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                Фабрика дверей
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Curtain Panels - Reveal Effect */}
          {phase === "reveal" && (
            <div className="absolute inset-0 flex z-20">
              {panels.map((index) => (
                <motion.div
                  key={index}
                  className="flex-1 bg-background"
                  initial={{ y: 0 }}
                  animate={{ 
                    y: index % 2 === 0 ? "-100%" : "100%" 
                  }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {/* Subtle gradient on panels */}
                  <div 
                    className="w-full h-full"
                    style={{
                      background: `linear-gradient(${index % 2 === 0 ? '180deg' : '0deg'}, 
                        hsl(var(--background)) 0%, 
                        hsl(var(--card)) 100%)`
                    }}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
