"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import { getWeatherAnimation } from "@/hooks/getWeatherAnimation";

export default function AnimatedWeatherBackground({
  weatherCode,
}: {
  weatherCode: number;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const animationType = getWeatherAnimation(weatherCode);

  // Generate particles once with useMemo
  const rainDrops = useMemo(
    () =>
      Array.from({ length: animationType === "storm" ? 80 : 50 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 0.3 + Math.random() * 0.4,
        height: 20 + Math.random() * 30,
      })),
    [animationType]
  );

  const drizzleDrops = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 0.6 + Math.random() * 0.5,
        height: 10 + Math.random() * 15,
      })),
    []
  );

  const snowflakes = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 5 + Math.random() * 5,
        drift: -15 + Math.random() * 30,
        size: 8 + Math.random() * 8,
      })),
    []
  );

  const clouds = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        id: i,
        top: 10 + Math.random() * 50,
        delay: Math.random() * 10,
        duration: 20 + Math.random() * 20,
        scale: 0.7 + Math.random() * 0.6,
        opacity: 0.15 + Math.random() * 0.2,
      })),
    []
  );

  const sunRays = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 4,
        duration: 3 + Math.random() * 2,
        size: 2 + Math.random() * 3,
      })),
    []
  );

  const fogLayers = useMemo(
    () =>
      Array.from({ length: 4 }, (_, i) => ({
        id: i,
        delay: i * 3,
        duration: 12 + Math.random() * 6,
        opacity: 0.15 + Math.random() * 0.15,
      })),
    []
  );

  if (!mounted) {
    return null;
  }

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background:
            animationType === "sunny"
              ? "linear-gradient(180deg, #f9d71c 0%, #fbc02d 100%)"
              : animationType === "cloudy"
              ? "linear-gradient(180deg, #5b9bd5 0%, #b3d9f2 100%)"
              : animationType === "overcast"
              ? "linear-gradient(180deg, #78909c 0%, #b0bec5 100%)"
              : animationType === "rain"
              ? "linear-gradient(180deg, #4a6572 0%, #232526 100%)"
              : animationType === "drizzle"
              ? "linear-gradient(180deg, #607d8b 0%, #90a4ae 100%)"
              : animationType === "storm"
              ? "linear-gradient(180deg, #1f1c2c 0%, #928dab 100%)"
              : animationType === "fog"
              ? "linear-gradient(180deg, #b0bec5 0%, #eceff1 100%)"
              : animationType === "snow"
              ? "linear-gradient(180deg, #e0f2f7 0%, #b3e5fc 100%)"
              : "linear-gradient(180deg, #b3e5fc 0%, #81d4fa 100%)",
        }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />

      {/* Sunny - Floating Sun Rays */}
      {animationType === "sunny" && (
        <div className="absolute inset-0">
          {sunRays.map((ray) => (
            <motion.div
              key={`ray-${ray.id}`}
              className="absolute rounded-full bg-white/90 shadow-lg"
              style={{
                width: `${ray.size * 4}px`,
                height: `${ray.size * 4}px`,
                left: `${ray.left}%`,
                top: `${ray.top}%`,
                boxShadow: "0 0 20px rgba(255, 255, 255, 0.8)",
              }}
              initial={{ opacity: 0.8, scale: 1.0 }}
              animate={{
                opacity: [0.8, 1, 0.8],
                scale: [1.0, 1.4, 1.0],
              }}
              transition={{
                duration: ray.duration,
                delay: ray.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}

      {/* Cloudy - Drifting Clouds */}
      {animationType === "cloudy" && (
        <div className="absolute inset-0">
          {clouds.map((cloud) => (
            <motion.div
              key={`cloud-${cloud.id}`}
              className="absolute"
              style={{
                top: `${cloud.top}%`,
                opacity: cloud.opacity,
                scale: cloud.scale,
              }}
              initial={{ x: "-150px" }}
              animate={{ x: "calc(100vw + 150px)" }}
              transition={{
                duration: cloud.duration,
                delay: cloud.delay,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <svg width="150" height="80" viewBox="0 0 150 80">
                <ellipse cx="40" cy="40" rx="40" ry="25" fill="white" />
                <ellipse cx="80" cy="35" rx="45" ry="28" fill="white" />
                <ellipse cx="120" cy="40" rx="35" ry="23" fill="white" />
              </svg>
            </motion.div>
          ))}
        </div>
      )}

      {/* Overcast - Dense Cloud Cover */}
      {animationType === "overcast" && (
        <div className="absolute inset-0">
          {clouds.map((cloud) => (
            <motion.div
              key={`overcast-${cloud.id}`}
              className="absolute"
              style={{
                top: `${cloud.top}%`,
                opacity: cloud.opacity + 0.2,
                scale: cloud.scale * 1.3,
              }}
              initial={{ x: "-150px" }}
              animate={{ x: "calc(100vw + 150px)" }}
              transition={{
                duration: cloud.duration * 1.2,
                delay: cloud.delay,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <svg width="180" height="100" viewBox="0 0 180 100">
                <ellipse cx="50" cy="50" rx="50" ry="35" fill="#9e9e9e" />
                <ellipse cx="100" cy="45" rx="55" ry="38" fill="#9e9e9e" />
                <ellipse cx="150" cy="50" rx="45" ry="33" fill="#9e9e9e" />
              </svg>
            </motion.div>
          ))}
          <motion.div
            className="absolute inset-0 bg-gray-600/15"
            animate={{ opacity: [0.15, 0.2, 0.15] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
        </div>
      )}

      {/* Drizzle - Light Rain */}
      {animationType === "drizzle" && (
        <div className="absolute inset-0">
          {drizzleDrops.map((drop) => (
            <motion.div
              key={`drizzle-${drop.id}`}
              className="absolute w-0.5 bg-blue-300/40 rounded-full"
              style={{
                left: `${drop.left}%`,
                height: `${drop.height}px`,
              }}
              initial={{ y: "-10%", opacity: 0.4 }}
              animate={{ y: "110vh", opacity: [0.4, 0.6, 0.3] }}
              transition={{
                duration: drop.duration,
                delay: drop.delay,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
          <motion.div
            className="absolute inset-0 bg-gray-400/5"
            animate={{ opacity: [0.05, 0.1, 0.05] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </div>
      )}

      {/* Rain - Falling Raindrops */}
      {animationType === "rain" && (
        <div className="absolute inset-0">
          {rainDrops.map((drop) => (
            <motion.div
              key={`rain-${drop.id}`}
              className="absolute w-0.5 bg-blue-200/60 rounded-full"
              style={{
                left: `${drop.left}%`,
                height: `${drop.height}px`,
              }}
              initial={{ y: "-10%", opacity: 0.6 }}
              animate={{ y: "110vh", opacity: [0.6, 0.8, 0.4] }}
              transition={{
                duration: drop.duration,
                delay: drop.delay,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
          <motion.div
            className="absolute inset-0 bg-blue-900/10"
            animate={{ opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </div>
      )}

      {/* Storm - Heavy Rain + Lightning */}
      {animationType === "storm" && (
        <div className="absolute inset-0">
          {rainDrops.map((drop) => (
            <motion.div
              key={`storm-${drop.id}`}
              className="absolute w-0.5 bg-blue-100/70 rounded-full"
              style={{
                left: `${drop.left}%`,
                height: `${drop.height}px`,
              }}
              initial={{ y: "-10%" }}
              animate={{ y: "110vh" }}
              transition={{
                duration: drop.duration * 0.7,
                delay: drop.delay,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
          <motion.div
            className="absolute inset-0 bg-white"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0, 0, 0, 0, 0.9, 0, 0.7, 0],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              repeatDelay: 4,
            }}
          />
          <motion.div
            className="absolute inset-0 bg-black/20"
            animate={{ opacity: [0.2, 0.3, 0.2] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </div>
      )}

      {/* Snow - Falling Snowflakes */}
      {animationType === "snow" && (
        <div className="absolute inset-0">
          {snowflakes.map((flake) => (
            <motion.div
              key={`snow-${flake.id}`}
              className="absolute text-white/90"
              style={{
                left: `${flake.left}%`,
                fontSize: `${flake.size}px`,
              }}
              initial={{ y: "-5%", x: 0, rotate: 0 }}
              animate={{
                y: "105vh",
                x: flake.drift,
                rotate: 360,
              }}
              transition={{
                duration: flake.duration,
                delay: flake.delay,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              ❄
            </motion.div>
          ))}
        </div>
      )}

      {/* Fog - Horizontal Drifting Layers */}
      {animationType === "fog" && (
        <div className="absolute inset-0">
          {fogLayers.map((layer) => (
            <motion.div
              key={`fog-${layer.id}`}
              className="absolute inset-0"
              style={{
                background: `linear-gradient(90deg, transparent, rgba(176, 190, 197, ${layer.opacity}), transparent)`,
              }}
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{
                duration: layer.duration,
                delay: layer.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
