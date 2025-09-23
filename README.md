# Angular Sofkau — Optimización, i18n y Tests

Este repositorio contiene una aplicación Angular con optimizaciones para producción, soporte i18n (multi-idioma), configuración de pruebas con Jest y soporte para SSR/PWA. El README describe las mejoras aplicadas, comandos útiles y dónde encontrar los archivos relevantes.

**Proyecto:**
- **Nombre:** `angular-sofkau` (según `package.json`).
- **Código fuente:** `src/`.

**Scripts importantes:**
- **`npm run build`**: Construcción de producción con optimizaciones y hashing.
- **`npm run build:i18n`**: Construye la aplicación localizada para todos los idiomas configurados.
- **`npm run build:locale`**: Construye la aplicación para la locale especificada usando `LOCALE`.
- **`npm run serve:i18n`**: Construye las versiones localizadas y las sirve con `serve-i18n.js`.
- **`npm run build:analyze`**: Genera `stats.json` y abre el analizador de bundles (`webpack-bundle-analyzer`).
- **`npm run build:ssr` / `npm run dev:ssr` / `npm run serve:ssr`**: Comandos relacionados con SSR (Angular Universal).
- **`npm test` / `npm run test:watch` / `npm run test:coverage`**: Ejecutan pruebas con Jest.

**Internacionalización (i18n)**
- **Locales configuradas:** `en` y `es` (ver `angular.json`).
- **Archivos de traducción:** `src/locale/messages.en.xlf` y `src/locale/messages.es.xlf`.
- **Cómo extraer mensajes:** `npm run extract-i18n` (usa el builder de Angular CLI `extract-i18n`).
- **Cómo construir locales:**
	- Construir todas las locales: `npm run build:i18n`.
	- Construir una locale concreta (bash): `LOCALE=es npm run build:locale`.
	- Servir las versiones localizadas: `npm run serve:i18n`.
- **Configuración clave en `angular.json`:**
	- `i18n.sourceLocale` está configurado como `en-US`.
	- Cada locale tiene su `translation` apuntando a `src/locale/messages.*.xlf` y `baseHref` apropiado.
	- Las configuraciones de build (`es` y `en`) usan `localize` y `outputPath` separados.

**Optimización y producción**
- **AOT & Build Optimizer:** La configuración de producción activa `aot: true` y `buildOptimizer: true`.
- **Optimization flags:** `optimization.scripts`, `optimization.styles` y `optimization.fonts` activados.
- **Output hashing:** `outputHashing: "all"` para cache busting en producción.
- **Source maps:** Desactivados en `production` (`sourceMap: false`) para reducir el tamaño del bundle.
- **Chunks:** `namedChunks: false` y `vendorChunk: false` en producción para mejor caché y menor cantidad de ficheros.
- **Extracción de licencias:** `extractLicenses: true` en producción.
- **Presupuestos (budgets):** Configurados para avisos/errores si el bundle supera tamaños definidos.
- **Service Worker / PWA:** `serviceWorker: true` y `ngswConfigPath: "ngsw-config.json"` habilitados para caching offline en producción.

Consejo rápido para analizar el bundle:
- Ejecuta `npm run build:analyze` y revisa el reporte visual generado por `webpack-bundle-analyzer`.

**Server-side Rendering (SSR) y prerender**
- El proyecto incluye configuración de Angular Universal (`@nguniversal/express-engine`).
- Comandos útiles:
	- Desarrollo SSR: `npm run dev:ssr`.
	- Construir y servir SSR (producción): `npm run build:ssr` seguido de `npm run serve:ssr`.
	- Prerender: `npm run prerender`.

**Testing (Jest + Karma helpers)**
- **Runner principal:** `jest` (ver `jest.config.js` y `setup-jest.ts`).
- **Comandos:**
	- Ejecutar pruebas: `npm test`.
	- Ejecutar en modo watch: `npm run test:watch`.
	- Generar cobertura: `npm run test:coverage`.
- **Ubicación de pruebas:** Hay tests unitarios e integration tests dentro de `src/app/components/` y servicios en `src/app/services/`.
- **Notas:** El proyecto mantiene también configuraciones de Karma (presentes en `angular.json`) pero las pruebas por defecto están configuradas para ejecutarse con Jest (más rápidas y adecuadas para CI).

**Arquitectura y archivos clave**
- **Configuración de Angular CLI:** `angular.json` — contiene las configuraciones de build, serve, locales, SSR y prerender.
- **Scripts npm:** `package.json` — contiene los comandos de build, serve, test y análisis.
- **Traducciones:** `src/locale/messages.en.xlf`, `src/locale/messages.es.xlf`.
- **Service worker config:** `ngsw-config.json`.
- **Server (SSR):** `server.ts` y `src/main.server.ts`.

**Cómo ejecutar rápido en desarrollo (bash)**
- Servir en modo desarrollo: `npm start` (usa configuración `development`).
- Servir SSR en dev: `npm run dev:ssr`.
- Ejecutar pruebas en watch: `npm run test:watch`.

**Cómo preparar para producción (resumen)**
1. Asegúrate de que las traducciones están actualizadas: `npm run extract-i18n` y actualiza `src/locale/*.xlf`.
2. Construye la app localizada: `npm run build:i18n` (genera builds por cada locale configurada).
3. (Opcional) Analiza el bundle: `npm run build:analyze`.
4. Despliega los `dist/` generados (cada locale tiene su carpeta si se usa localize).

**Notas finales y recomendaciones**
- Mantener dependencias actualizadas para aprovechar mejoras de tamaño y compilación.
- Revisar `webpack-bundle-analyzer` regularmente tras cambios grandes.
- Mantener pruebas unitarias y de integración actualizadas para cubrir componentes críticos; hay ejemplos en `src/app/components`.

