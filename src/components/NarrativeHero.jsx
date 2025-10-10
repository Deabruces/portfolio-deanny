import React, { useState, useEffect } from "react";
import { Sparkles, Code, Palette, Rocket } from "lucide-react";
import "./NarrativeHero.css";

export default function NarrativeHero() {
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
          <div className="narrative-icon-wrapper narrative-gradient-purple-pink">
            <Rocket
              className="narrative-icon narrative-icon-large"
              strokeWidth={2}
            />
          </div>
        </div>

        {/* Texto principal con animación */}
        <div className="narrative-text-container">
          <div className="narrative-eyebrow">Para emprendedores y negocios</div>
          <h1 className="narrative-hero-title">
            Tu web no vende porque no transmite <span className="narrative-gradient-text">confianza</span>
          </h1>
          <p className="narrative-hero-subtitle">
            Creo sitios web estratégicos que convierten visitantes en clientes. Diseño, desarrollo y SEO que funcionan juntos para hacer crecer tu negocio.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="narrative-cta-container">
          <a
            href="https://calendar.app.google/7zL3cZ713aYB9tCW6"
            className="narrative-cta-button narrative-cta-primary"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Agendar llamada estratégica - Abre en nueva ventana"
          >
            Agendar llamada estratégica
          </a>
          <a
            href="/proyectos"
            className="narrative-cta-button narrative-cta-secondary"
            aria-label="Ver proyectos anteriores"
          >
            Ver proyectos
          </a>
        </div>

        {/* Badge decorativo */}
        <div className="narrative-badge">✨ Respuesta en menos de 24h</div>
      </div>
    </div>
  );
}
