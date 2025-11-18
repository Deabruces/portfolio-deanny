---
title: "Aplicación para contar calorías"
image: "./images/calorie-tracker.jpg"
summary: "Tracker inteligente de calorías que convierte el control nutricional en un hábito simple. Con React + TypeScript, permite registrar comidas y ejercicio en segundos, visualizando tu balance calórico en tiempo real."
date: "02-08-2025"
tags: ["html", "css", "javascript", "react", "typescript", "vite", "tailwind"]
starred: true
---

<div class="container content-grid">

**[✨ Ver demostración en vivo](https://calorie-tracker.deannybruces.com/)** | **[📂 Código en GitHub](https://github.com/Deabruces/calorie-tracker)**

---

## El Problema

Llevar un control de calorías debería ser simple, pero la mayoría de apps te hacen:
- Registrarte con correo electrónico
- Buscar en bases de datos interminables de alimentos
- Pagar suscripciones mensuales
- Aprender interfaces complicadas

**¿El resultado?** El 80% de las personas abandona el seguimiento nutricional en la primera semana.

## La Solución

Una app **instantánea, sin registro, sin fricción**. Abres, agregas comida o ejercicio, ves tu balance. Así de simple.

### Funcionalidad Real

**Escenario típico:** Desayuno de 450 calorías + café de 120 calorías + sesión de gym (-350 calorías) = Balance instantáneo de +220 calorías.

La app muestra:
- ✅ **Consumido:** 570 calorías
- ✅ **Quemado:** 350 calorías
- ✅ **Balance neto:** +220 calorías

Todo actualizado **en tiempo real** mientras escribes.

---

## Características Clave

### 🎯 Gestión Intuitiva
- **Agregar entradas rápidas:** Nombre, calorías, categoría (comida o ejercicio)
- **Editar sobre la marcha:** Corrige cantidades sin reiniciar
- **Eliminar con un clic:** Limpieza instantánea de entradas incorrectas

### 📊 Visualización Clara
- **Balance calórico neto:** Verde cuando estás en déficit, rojo en superávit
- **Separación automática:** Comidas vs. ejercicios en secciones distintas
- **Totales dinámicos:** Números actualizados mientras escribes

### 💾 Persistencia Local
- **Datos guardados automáticamente:** Tu progreso nunca se pierde
- **Sin servidores, sin registro:** Todo funciona offline en tu navegador
- **Privacidad total:** Tus datos nunca salen de tu dispositivo

### 🎨 Diseño Responsivo
- **Adaptable a cualquier pantalla:** Desktop, tablet, móvil
- **Interfaz minimalista:** Sin distracciones, solo lo esencial
- **Animaciones sutiles:** Feedback visual en cada acción

---

## Stack Técnico

Esta app utiliza tecnologías modernas para ofrecer **rendimiento máximo** con **complejidad mínima**:

| Tecnología | Propósito |
|-----------|-----------|
| **React 19** | Componentes reactivos con actualizaciones instantáneas |
| **TypeScript** | Type safety para 0 errores en producción |
| **Vite** | Build ultrarrápido (HMR en <50ms) |
| **Tailwind CSS** | Diseño responsivo sin escribir CSS custom |
| **LocalStorage API** | Persistencia de datos sin backend |

### ¿Por qué esta combinación?

- **React + TypeScript:** Previene bugs antes de que lleguen al navegador
- **Vite:** Desarrollo 10x más rápido que webpack tradicional
- **Tailwind:** Responsive design en minutos, no horas
- **LocalStorage:** Funciona offline, sin costos de servidor

---

## Ejemplos de Uso

### 👤 Ejemplo 1: Déficit Calórico
Usuario buscando perder peso con **déficit de 500 calorías**:
- Desayuno: 350 cal
- Almuerzo: 600 cal
- Cena: 450 cal
- Ejercicio: -400 cal
- **Balance:** +1000 cal

La app calcula automáticamente si está por debajo/arriba de su meta.

### 💪 Ejemplo 2: Superávit para Ganar Masa
Usuario construyendo músculo con **superávit de 300 calorías**:
- Comida pre-entreno: 200 cal
- Comida post-entreno: 800 cal
- Resto del día: 1200 cal
- Entrenamiento: -500 cal
- **Balance:** +1700 cal

### 🏃 Ejemplo 3: Mantenimiento
Usuario manteniendo peso actual:
- Seguimiento diario para equilibrar ingesta/gasto
- Ajustes según actividad del día
- Visión clara del balance energético

---

## Desarrollo y Arquitectura

### Componentes Principales
```
App.tsx (Raíz)
├── Header.tsx (Título y totales)
├── CalorieTracker.tsx (Formulario de entrada)
├── CalorieList.tsx (Lista de entradas)
└── CalorieDisplay.tsx (Balance visual)
```

### Estado Global con useReducer
Gestión de estado predecible con acciones tipadas:
- `ADD_ACTIVITY` - Agregar nueva entrada
- `UPDATE_ACTIVITY` - Editar entrada existente
- `DELETE_ACTIVITY` - Eliminar entrada
- `RESET_TRACKER` - Limpiar todo

### Persistencia Inteligente
Los datos se guardan **automáticamente** después de cada cambio:
```typescript
useEffect(() => {
  localStorage.setItem('calorieData', JSON.stringify(state));
}, [state]);
```

---

## Aprendizajes del Proyecto

### Desafíos Superados
1. **Sincronización de estado:** Evitar re-renders innecesarios con `useMemo`
2. **Validación de inputs:** Prevenir valores negativos y caracteres inválidos
3. **Accesibilidad:** Navegación completa por teclado y lectores de pantalla
4. **Responsive design:** Grid adaptativo sin media queries manuales

### Optimizaciones Aplicadas
- **Code splitting:** Separación de código para mejor organización
- **Lazy loading:** Componentes cargados cuando son necesarios
- **Memoización:** Evita cálculos repetidos innecesarios con `useMemo`
- **Tree shaking:** Vite elimina código no utilizado automáticamente

---

## Próximas Mejoras

- [ ] **Gráficos semanales:** Visualizar tendencias con Chart.js
- [ ] **Metas personalizadas:** Configurar objetivo de calorías diario
- [ ] **Exportar datos:** Descargar historial en CSV
- [ ] **Modo oscuro:** Toggle entre temas claro/oscuro
- [ ] **PWA:** Instalable como app nativa con service workers

---

## ¿Por Qué Este Proyecto Importa?

Este no es solo un "contador de calorías más". Es un **experimento en simplicidad**:

- ✅ **Sin barreras de entrada:** Funciona en 3 segundos, sin registros
- ✅ **Sin monetización agresiva:** Sin ads, sin paywalls, sin suscripciones
- ✅ **Sin complejidad innecesaria:** Solo las funciones que realmente usarás
- ✅ **Código abierto:** Aprende, modifica, mejora

**La mejor app de fitness es la que usas todos los días.** Esta está diseñada para eso.

---

**[🚀 Pruébala ahora](https://calorie-tracker.deannybruces.com/)** • **[📂 Ver el código](https://github.com/Deabruces/calorie-tracker)**

</div>
