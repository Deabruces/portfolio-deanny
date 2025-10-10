import React, { useState, useEffect } from "react";
import { Sparkles, Code, Palette, Rocket } from "lucide-react";
import "./NarrativeHero.css";

export default function NarrativeHero() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Initialize theme from global theme system
    if (typeof window !== "undefined") {
      const theme =
        document.documentElement.getAttribute("data-theme") ||
        localStorage.getItem("theme");
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;

      let isDarkTheme = prefersDark; // default

      if (theme === "dark") {
        isDarkTheme = true;
      } else if (theme === "light") {
        isDarkTheme = false;
      } else if (theme === "light dark") {
        // Auto mode - use system preference
        isDarkTheme = prefersDark;
      }

      setIsDark(isDarkTheme);

      // Listen for theme changes from the global system
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (
            mutation.type === "attributes" &&
            mutation.attributeName === "data-theme"
          ) {
            const newTheme =
              document.documentElement.getAttribute("data-theme");
            const prefersDark = window.matchMedia(
              "(prefers-color-scheme: dark)",
            ).matches;

            let newIsDark = prefersDark;
            if (newTheme === "dark") {
              newIsDark = true;
            } else if (newTheme === "light") {
              newIsDark = false;
            } else if (newTheme === "light dark") {
              newIsDark = prefersDark;
            }

            setIsDark(newIsDark);
          }
        });
      });

      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-theme"],
      });

      return () => observer.disconnect();
    }
  }, []);

  const steps = [
    {
      text: "¿Necesitas un sitio web?",
      subtext: "Bienvenido, estás en el lugar correcto",
      icon: Sparkles,
      color: "purple-pink",
    },
    {
      text: "No uno cualquiera...",
      subtext: "Algo que realmente destaque",
      icon: Code,
      color: "blue-cyan",
    },
    {
      text: "Uno que tu competencia envidie",
      subtext: "Diseño + Desarrollo = Impacto",
      icon: Palette,
      color: "orange-red",
    },
    {
      text: "Creo experiencias digitales increíbles",
      subtext: "¿Listo para despegar?",
      icon: Rocket,
      color: "green-emerald",
      isFinal: true,
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 3000);

    return () => clearTimeout(timer);
  }, [currentStep, steps.length]);

  const goToStep = (index) => {
    setCurrentStep(index);
  };

  const currentStepData = steps[currentStep];
  const Icon = currentStepData.icon;

  return (
    <div
      className={`narrative-hero-container ${isDark ? "narrative-dark" : "narrative-light"}`}
    >
      {/* Elementos decorativos de fondo */}
      <div className="narrative-background-blobs">
        <div className="narrative-blob narrative-blob-1"></div>
        <div className="narrative-blob narrative-blob-2"></div>
        <div className="narrative-blob narrative-blob-3"></div>
      </div>

      {/* Contenido principal */}
      <div className="narrative-hero-content">
        {/* Icono animado */}
        <div className="narrative-icon-container">
          <div
            key={currentStep}
            className={`narrative-icon-wrapper narrative-gradient-${currentStepData.color}`}
          >
            <Icon
              className="narrative-icon narrative-icon-large"
              strokeWidth={2}
            />
          </div>
        </div>

        {/* Texto principal con animación */}
        <div className="narrative-text-container">
          <h1 key={`title-${currentStep}`} className="narrative-hero-title">
            {currentStepData.text}
          </h1>
          <p
            key={`subtitle-${currentStep}`}
            className="narrative-hero-subtitle"
          >
            {currentStepData.subtext}
          </p>
        </div>

        {/* Controles de navegación */}
        <div className="narrative-controls">
          <div className="narrative-dots-container">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => goToStep(index)}
                className={`narrative-dot ${index === currentStep ? "narrative-active" : ""}`}
                aria-label={`Ir al paso ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="narrative-cta-container">
          <button className="narrative-cta-button">Hablemos</button>
        </div>

        {/* Badge decorativo */}
        <div className="narrative-badge">✨ 100% Creativo</div>
      </div>
    </div>
  );
}
