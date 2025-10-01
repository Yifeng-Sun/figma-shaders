import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export const Footer = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 4500); // 1.5s delay + 3s display time

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.footer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-20"
        >
          <div className="bg-black/30 backdrop-blur-lg px-6 py-3 rounded-full border border-white/10">
            <div className="flex flex-col items-center gap-1 text-center">
              <p className="text-sm text-white/80">
                Shoutout to{" "}
                <span className="font-semibold text-primary">Daniela Muntyan</span>
                {" "}for the original design, and{" "}
                <span className="font-semibold text-primary">Claude Code</span>
              </p>
              <p className="text-xs text-white/60">
                Licensed under{" "}
                <a
                  href="https://creativecommons.org/licenses/by/4.0/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 transition-colors underline"
                >
                  CC BY 4.0
                </a>
              </p>
            </div>
          </div>
        </motion.footer>
      )}
    </AnimatePresence>
  );
};
