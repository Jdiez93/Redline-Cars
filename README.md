# Redline Cars

Una plataforma web de alto rendimiento dedicada a la visualización y gestión de catálogos automotrices. Construida con un enfoque en la velocidad, el SEO y una experiencia de usuario fluida.

**Live Demo:** [https://redline-cars.vercel.app/](https://redline-cars.vercel.app/)

## 🛠️ Stack Tecnológico

Este proyecto utiliza herramientas de vanguardia para maximizar la eficiencia en el desarrollo y la optimización en el cliente:

* **Astro:** Framework principal para lograr una carga ultrarrápida mediante islas de interactividad.
* **React:** Biblioteca para la construcción de componentes de interfaz dinámicos y reutilizables.
* **TypeScript:** Tipado estático para garantizar la robustez y escalabilidad del código.
* **Tailwind CSS:** Framework de utilidades para un diseño moderno, responsivo y mantenible.
* **HTML5:** Estructura semántica avanzada.

## ✨ Características Principales

* **Zero JS por defecto:** Aprovecha la arquitectura de Astro para enviar el mínimo JavaScript necesario al navegador.
* **Arquitectura de Islas:** Los componentes interactivos de React solo se hidratan cuando son visibles o necesarios.
* **Diseño Adaptive:** Interfaz totalmente optimizada para dispositivos móviles, tablets y desktop.
* **Performance:** Puntuaciones altas en Core Web Vitals gracias al renderizado estático.
* **Type Safe:** Desarrollo seguro mediante interfaces y tipos personalizados de TypeScript.

## 📂 Estructura del Proyecto

```text
├── src/
│   ├── components/    # Componentes React y Astro (.astro, .tsx)
│   ├── layouts/       # Plantillas base para las páginas
│   ├── pages/         # Enrutamiento basado en archivos
│   └── styles/        # Configuraciones globales de Tailwind
├── public/            # Activos estáticos (imágenes, fuentes)
└── astro.config.mjs   # Configuración de Astro e integraciones
