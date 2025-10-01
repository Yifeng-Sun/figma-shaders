import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CenterDisplayProps {
  size: number;
  currentSection: number;
}

interface Section {
  id: number;
  title: string;
  content: string[];
}

const sections: Section[] = [
  {
    id: 0,
    title: "Overview",
    content: [
      "Full Stack Developer",
      "AI/ML Enthusiast",
      "Open Source Contributor",
      "Based in San Francisco, CA"
    ]
  },
  {
    id: 1,
    title: "Work",
    content: [
      "Senior Software Engineer @ Tech Company",
      "Led team of 5 developers on cloud platform",
      "Built scalable microservices architecture",
      "2020 - Present"
    ]
  },
  {
    id: 2,
    title: "Education",
    content: [
      "M.S. Computer Science @ University Name",
      "Specialized in Machine Learning",
      "Published 3 research papers",
      "GPA: 3.9/4.0"
    ]
  },
  {
    id: 3,
    title: "Shoutouts",
    content: [
      "Thanks to my mentors and colleagues",
      "Grateful for the open source community",
      "Special thanks to all supporters",
      "Let's build something amazing together!"
    ]
  }
];

export const CenterDisplay = ({
  size,
  currentSection
}: CenterDisplayProps) => {
  const [displaySize, setDisplaySize] = useState(size * 0.7);
  const [currentContentIndex, setCurrentContentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const section = sections[currentSection] || sections[0];

  // Resize display for responsive design
  useEffect(() => {
    setDisplaySize(size * 0.7);
  }, [size]);

  // Auto rotate content items every 4 seconds
  useEffect(() => {
    if (section.content.length <= 1) return;

    const intervalId = setInterval(() => {
      setCurrentContentIndex(prev => (prev + 1) % section.content.length);
    }, 4000);

    return () => clearInterval(intervalId);
  }, [section.content.length]);

  // Reset content index when section changes
  useEffect(() => {
    setCurrentContentIndex(0);
  }, [currentSection]);

  const currentContent = section.content[currentContentIndex];

  return (
    <div
      className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto z-10"
      style={{
        width: displaySize,
        height: displaySize
      }}
      ref={containerRef}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={`${section.id}-${currentContentIndex}`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full flex flex-col items-center justify-center rounded-full bg-black/30 backdrop-blur-lg p-6 border border-white/10"
        >
          {/* Main Content - Centered */}
          <div className="flex flex-col items-center justify-center h-full w-full relative space-y-6">
            {/* Section Title */}
            <div className="text-center max-w-full">
              <h1 className="text-[32px] font-bold tracking-tight text-primary">
                {section.title}
              </h1>
            </div>

            {/* Content Item - Centered and larger */}
            <div className="flex-1 flex items-center justify-center w-full px-8">
              <p className="text-center max-w-full break-words text-[18px] leading-relaxed text-white/90">
                {currentContent}
              </p>
            </div>
          </div>

          {/* Content Carousel Indicators - Bottom */}
          {section.content.length > 1 && (
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center justify-center space-x-2">
              {section.content.map((_, idx) => (
                <motion.button
                  key={idx}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentContentIndex ? 'bg-primary w-6' : 'bg-primary/30'
                  }`}
                  onClick={() => setCurrentContentIndex(idx)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`View item ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
