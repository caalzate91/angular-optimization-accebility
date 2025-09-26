# Rick & Morty Angular App

Este proyecto es una aplicación Angular que consume la API pública de Rick & Morty.  
Incluye optimizaciones de rendimiento, soporte multi-idioma e implementación de tests con **Jest**.

---

## 🚀 Características principales

- **Optimización LCP** con `ngOptimize` y `fetchpriority=high` en la imagen principal del header.
- **Carga optimizada de personajes**: solo las 3 primeras imágenes tienen prioridad, el resto usan `loading="lazy"`.
- **Internacionalización (i18n)** con `@angular/localize`, configurado en **inglés (en), español (es) y francés (fr)**.
- **Pruebas unitarias y de integración** con **Jest** para componentes y servicios.
- **Arquitectura modular** con separación clara de servicios, componentes y pruebas.

---

## 📦 Instalación

Clona el repositorio e instala las dependencias:

```bash
git clone <repo-url>
cd angular-optimization-accesibility
npm install
