Reto curso L3: Optimizacion,Usabilidad y pruebas en Angular del 16 al 19
a)	Optimización con NgOptimizedImage
•	Ejecutemos lighthouse
 ![Ejecucion lighthouse inicial](src/assets/img1.PNG)
•	Identifica la imagen que más impacta el LCP de la vista inicial.
 ![Revisamos reporte de lighthouse](src/assets/img2.PNG)
•	Revisamos la imagen que mas impacta en lighthouse
 ![Imagen identificada](src/assets/img3.PNG)
R: La imagen que mas impacta es la primera imagen visible
 
•	Codigo
  ![Codigo](src/assets/img4.PNG)
•	 Reemplaza su <img> por la directiva NgOptimizedImage, marca la imagen LCP con priority y define width/height reales.
 ![Nuevo codigo](src/assets/img5.PNG)
•	Se ajusta el Width para que no se modifique la imagen con este cambio
•	Se ejecuta nuevamente lighthouse 
![Nuevo reporte lighthouse](src/assets/img6.PNG)

•	Para imágenes no críticas, aplica lazy-load.
Validamos las imágenes no criticas
 ![Imagenes no criticas](src/assets/img7.PNG)

Codigo
 ![Codigo](src/assets/img8.PNG)
Aplicamos lazy-load
![Nuevo codigo](src/assets/img9.PNG)
 
Ejecutamos nuevamente lighthouse 
![Nuevo reporte lighthouse con lazyload](src/assets/img10.PNG)
•	Por ultimo añadido optimizamos también el footer
![Footer](src/assets/img11.PNG)
 Codigo
 ![Codigo](src/assets/img12.PNG)
 
Modificamos para mejor optimización 
![Nuevo codigo](src/assets/img13.PNG)
 
Ejecutamos lighthouse nuevamente
![Ultimo reporte de lighthouse](src/assets/img14.PNG)
 
b)	 Usabilidad y Accesibilidad con i18n (Angular Localize)
• Ajusta la aplicación para que detecte el idioma y que se pueda cambiar a otro idioma.
Ajustamos angular.json
![Codigo añadido angular.json](src/assets/img15.PNG)
 
Y en el html añadimos las directivas i18n y le adjuntamos un nombre  
![Nuevas directivas localice](src/assets/img16.PNG)

Ejecutamos la directiva ng extract-i18n --output-path src/locale para generar el archivo Messages.xlf
 ![Archivo generado messages.xlf](src/assets/img17.PNG)
Se crea un nuevo archivo para que tengan las traducciones
![Se crea archivo con el mismo contenido del messages.xlf y se traduce los targets](src/assets/img18.PNG)
 
Ejecutamos el comando para ver la pagina traducida al español
ng serve --configuration=es

![Pagina internacionalizada ES](src/assets/img19.PNG)
 
Ahora ejecutamos ng serve y trae el lenguaje original (Ingles)
![Pagina original EN](src/assets/img20.PNG)

C) Pruebas con Jest — 3 pruebas nuevas 
Escribe 3 pruebas adicionales (pueden ser unitarias o de integración ligera) las cuales se 
sugieren los siguientes :
*Servicio con HTTP: caso de éxito (y opcional error) verificando método/URL y respuesta 
simulada.
*Creamos el archivo rick-morty.service.spec.ts
![creacion](src/assets/img21.PNG)

Importamos librerias- declaramos las variables que vamos a utilizar y hacemos un mock con la misma informacion de la API
![Estructura](src/assets/img26.PNG)
Traemos la informacion necesaria para ejecutar jtest y creamos nuestro primera prueba
![Estructura](src/assets/img27.PNG)

Creamos un segundo escenario 
![Estructura](src/assets/img28.PNG)
Ejecutamos con jtest
![Ejecucion del escenario en JTEST](src/assets/img22.PNG)
*Componente: interacción del usuario y verificación del DOM con selectores accesibles. 
Creamos el archivo character-list.component.spec.ts
![creacion2](src/assets/img24.PNG)
Importamos librerias- declaramos las variables que vamos a utilizar y hacemos un mock con la misma informacion de la API
![Estructura](src/assets/img29.PNG)
Ejecutamos con Jtest
![Ejecucion de los 2 escenarios de Jtest](src/assets/img23.PNG)

*Integración ligera: componente + servicio + HTTP mock. 

![Ejecucion de los 3 escenarios de JTEST](src/assets/img25.PNG)