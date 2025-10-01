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
    title: "Yifeng Sun",
    content: [
      "Software Engineer",
      "Backend & Distributed Systems",
      "Brooklyn, New York",
      "ys@yifengsun.com"
    ]
  },
  {
    id: 1,
    title: "Work",
    content: [
      "Software Engineer @ Walmart - Anomaly Detection",
      "Real-time pricing pipeline with Kafka & Kotlin",
      "Reduced P99 latency from 1200ms to 310ms",
      "Software Engineer Intern @ Tesla - Material Flow",
      "Go/Gin backend platform, reduced DB load by 29%",
      "Software Engineer Intern @ Xiaomi - MIUI Privacy"
    ]
  },
  {
    id: 2,
    title: "Education",
    content: [
      "M.S. Computer Engineering @ NYU",
      "2022 - 2024",
      "B.E. Software Engineering @ Northeastern",
      "2018 - 2022"
    ]
  },
  {
    id: 3,
    title: "Skills",
    content: [
      "Java, Kotlin, Go, Python",
      "Kafka, Kubernetes, Docker, Jenkins",
      "PostgreSQL, Cassandra, MongoDB, Redis",
      "AWS, GCP, Spring Boot"
    ]
  }
];

export const CenterDisplay = ({
  size,
  currentSection
}: CenterDisplayProps) => {
  const [displaySize, setDisplaySize] = useState(size * 0.7);
  const [showDetails, setShowDetails] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const section = sections[currentSection] || sections[0];

  // Resize display for responsive design
  useEffect(() => {
    setDisplaySize(size * 0.7);
  }, [size]);

  // Reset details when section changes
  useEffect(() => {
    setShowDetails(false);
  }, [currentSection]);

  return (
    <div
      className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer"
      style={{
        width: displaySize,
        height: displaySize
      }}
      ref={containerRef}
      onClick={() => setShowDetails(!showDetails)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={section.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full flex flex-col items-center justify-center rounded-full bg-black/30 backdrop-blur-lg p-8 border border-white/10"
        >
          {/* Section Title - Only show when details are hidden */}
          <AnimatePresence mode="wait">
            {!showDetails && (
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="text-[32px] font-bold tracking-tight text-primary text-center px-4"
              >
                {section.title}
              </motion.h1>
            )}
          </AnimatePresence>

          {/* All Content Items - Display only when clicked */}
          <AnimatePresence mode="wait">
            {showDetails && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="flex-1 flex flex-col items-center justify-center w-full px-12 space-y-4 overflow-y-auto"
              >
                {section.content.map((item, idx) => (
                  <p key={idx} className="text-center max-w-full break-words text-[16px] leading-relaxed text-white/90 px-2 py-1">
                    {item}
                  </p>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
