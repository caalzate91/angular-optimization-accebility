# Soportes de trabajo

## Optimización, i18n (A11y) y Pruebas con Jest en Angular

Nombre: Julieth Tatiana García Zuluaga

---

## 🚀 Ejecución del proyecto en diferentes idiomas

Para correr la aplicación en **español**:

```bash
ng serve --configuration=es
```

Para correr la aplicación en **inglés**:

```bash
ng serve --configuration=en
```

---

### A) Optimización con `NgOptimizedImage`

- Identifica la imagen que más impacta el **LCP** de la vista inicial.  

![Banner](/src/assets/lcp1.png)

>De acuerdo con el reporte generado con Lighthouse, la imagen que más impacto negativo tiene sobre el LCP es la del banner.  

- Reemplaza su `<img>` por la directiva `NgOptimizedImage`, marca la imagen LCP con `priority` y define `width/height` reales.  

![Banner](/src/assets/image-priority.png)

- Para imágenes no críticas, aplica **lazy-load**. 

![Banner](/src/assets/image-lazy.png)

- Ejecuta Lighthouse antes/después y adjunta evidencias (capturas).  

![Banner](/src/assets/lcp2.png)

> El performance mejoró un poco, pero sigue presentando problemas la imagen del banner; aunque ya se configuró como `priority`, sigue siendo pesada o tarda en renderizar.

---

### B) Usabilidad y Accesibilidad con i18n (`@angular/localize`)

- Ajusta la aplicación para que detecte el idioma y que se pueda cambiar a otro idioma.  
- Al ejecutar con este comando:

![Banner](/src/assets/localize-es.png)

 La página se muestra en **español**.  

![Banner](/src/assets/localize-es-screen.png)

- Al ejecutar con este otro comando:

![Banner](/src/assets/localize-en.png)

La página se muestra en **inglés**:

![Banner](/src/assets/localize-en-screen.png)

---

### C) Pruebas con Jest – 3 pruebas nuevas

Se escribieron **3 pruebas adicionales** (unitarias o de integración ligera):

#### 1. Servicio con HTTP: caso de éxito y error

Se agrega esta prueba:

![Banner](/src/assets/test-http-success.png)

- Verifica que:
  - Se usa la **URL correcta**.
  - Se hace con el método correcto (**GET**).
  - El servicio devuelve la respuesta simulada (`mockResponse`).

- También se agrega una prueba de **error**:

![Banner](/src/assets/test-http-error.png)

- Garantiza que el servicio propague los errores del backend (500) en lugar de devolver datos incorrectos.

![Banner](/src/assets/result-http.png)

- Se evidencia que, además de las 29 pruebas existentes, estas dos funcionan correctamente.

#### 2. Componente: interacción del usuario y verificación del DOM

Se agrega esta prueba:

![Banner](/src/assets/test-component.png)

- Valida que:
  - Al inicializar (page=1) se renderizan los nombres (`h3.character-name`) y las imágenes con `alt`.
  - El botón **Previous** está deshabilitado en la primera página y **Next** habilitado.
  - Se simula un clic en **Next** y se verifica que el servicio se invoca con `page=2`.  

- Se evidencia que, adicional a las pruebas anteriores, está funciona correctamente:

![Banner](/src/assets/result-component.png)

#### 3. Integración ligera: Componente + Servicio + HTTP mock

- Se agregan pruebas de integración con el servicio real y `HttpTestingController`.

![Banner](/src/assets/test-integration1.png)

![Banner](/src/assets/test-integration2.png)

El resultado de la prueba es:

![Banner](/src/assets/result-integration.png)

> El error observado en consola no significa que la prueba falló, ya que el total de pruebas pasaron; sino que el componente está imprimiendo el `HttpErrorResponse` simulado.
