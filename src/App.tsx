import { useState, useEffect } from "react";
import { ShaderCanvas } from "./components/ShaderCanvas";
import { ShaderSelector } from "./components/ShaderSelector";
import { CenterDisplay } from "./components/CenterDisplay";
import { motion } from "framer-motion";

export default function App() {
  const [canvasSize, setCanvasSize] = useState(600);
  const [selectedShader, setSelectedShader] = useState(1);
  const [currentSection, setCurrentSection] = useState(0);

  // Set dark mode
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  // Adjust canvas size based on window size
  useEffect(() => {
    const handleResize = () => {
      const size =
        Math.min(window.innerWidth, window.innerHeight) * 0.7;
      setCanvasSize(size);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Handle shader selection - changes the section
  const handleSelectShader = (id: number) => {
    setSelectedShader(id);
    setCurrentSection(id - 1); // Map shader ID to section (0-indexed)
    localStorage.setItem("selectedShader", id.toString());
  };

  // Load shader preference from localStorage on initial load
  useEffect(() => {
    const savedShader = localStorage.getItem("selectedShader");
    if (savedShader) {
      const shaderId = parseInt(savedShader, 10);
      setSelectedShader(shaderId);
      setCurrentSection(shaderId - 1);
    }
  }, []);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 relative">
      {/* Shader Selector */}
      <ShaderSelector
        selectedShader={selectedShader}
        onSelectShader={handleSelectShader}
      />

      {/* Main layout container with shader */}
      <div className="relative flex flex-col items-center justify-center">
        {/* Shader Circle */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <ShaderCanvas
            size={canvasSize}
            shaderId={selectedShader}
          />

          {/* Center Display - Always shown */}
          <CenterDisplay
            size={canvasSize}
            currentSection={currentSection}
          />
        </motion.div>
      </div>
    </div>
  );
}