# AngularSofkau 

## Ejecución del proyecto 

# Instalar dependencias
npm install

# Servir en modo desarrollo
ng serve

# Reto Técnico — Optimización, i18n (A11y) y Pruebas con Jest en Angular

Este repositorio contiene una aplicación en **Angular** donde se implementaron optimizaciones enfocadas en: 

1.  **Rendimiento (LCP) con `NgOptimizedImage`** 
2.  **Usabilidad y Accesibilidad con i18n (`@angular/localize`)** 
3.  **Pruebas unitarias en Jest en Angular**

## Rendimiento de Imágenes(LCP) con `NgOptimizedImage` 

El objetivo fue mejorar la métrica **(LCP)** de la vista inicial. 

### Ajustes
1. Identificación de la imagen con mayor impacto en el **LCP**. 
2. Reemplazo de la etiqueta `<img>` por la directiva **`NgOptimizedImage`**. 
3. Marcado de la imagen principal como **`priority`** y definición de **width/height** reales. 
4. Configuración de **lazy-loading** en imágenes no críticas. 

### Validación 
Se utilizó **Lighthouse** para evaluar el impacto: 

- **Antes de la optimización:** LCP fue elevado debido a la carga tardía de la imagen principal. 
- **Después de la optimización:** Reducción significativa en el tiempo de renderizado de la imagen principal.

## Internacionalización (i18n) con `@angular/localize` 

El objetivo fue mejorar la **usabilidad y accesibilidad** para usuarios con diferentes configuraciones de idioma. 

### Ajustes realizados 
1. Integración de **Angular Localize** en el proyecto. 
2. Configuración para detectar automáticamente el idioma del navegador. 
3. Implementación de selector de idioma en la interfaz para permitir cambio manual. 
4. Inclusión de archivos de traducción: 
 - `es.json` para Español 
 - `en.json` para Inglés 


