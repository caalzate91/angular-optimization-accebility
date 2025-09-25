# Angular App – Rendimiento y Accesibilidad  

Este repositorio contiene una aplicación en **Angular** donde se implementaron optimizaciones enfocadas en:  

1. ⚡ **Rendimiento (LCP) con `NgOptimizedImage`**  
2. 🌍 **Usabilidad y Accesibilidad con i18n (`@angular/localize`)**  

---

## ⚡ Optimización de Imágenes con `NgOptimizedImage`  

El objetivo fue mejorar la métrica **Largest Contentful Paint (LCP)** de la vista inicial.  

### Ajustes realizados  
- Identificación de la imagen con mayor impacto en el **LCP**.  
- Reemplazo de la etiqueta `<img>` por la directiva **`NgOptimizedImage`**.  
- Marcado de la imagen principal como **`priority`** y definición de **width/height** reales.  
- Configuración de **lazy-loading** en imágenes no críticas.  

### Validación  
Se utilizó **Lighthouse** para evaluar el impacto:  

- **Antes de la optimización:** LCP elevado debido a la carga tardía de la imagen principal.  
- **Después de la optimización:** Reducción significativa en el tiempo de renderizado.

---

## 🌍 Internacionalización (i18n) con `@angular/localize`  

El objetivo fue mejorar la **usabilidad y accesibilidad** para usuarios con diferentes configuraciones de idioma.  

### Ajustes realizados  
- Integración de **Angular Localize** en el proyecto.  
- Configuración para detectar automáticamente el idioma del navegador.  
- Implementación de selector de idioma en la interfaz para permitir cambio manual.  
- Inclusión de archivos de traducción:  
  - `es.json` → Español  
  - `en.json` → Inglés  

### Resultado  
- La app ahora se adapta dinámicamente según el idioma del navegador.  
- El usuario puede alternar el idioma en cualquier momento desde un select 

---

## 🚀 Ejecución del proyecto  

```bash
# Instalar dependencias
npm install

# Servir en modo desarrollo
npm start 


---

📌 **Autor:** Brayan Niño  
