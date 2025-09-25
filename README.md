# AngularSofkau

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.16.

## Development server

Run `ng serve` for a dev server in english language. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via Jest.

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## New implementations

- Implementation of the `NgOptimizedImage` directive to optimize images, used both in the app and in the `character-list` component.
- Compression of images located in the `assets` folder to improve performance.
- Resizing of images in the `assets` folder to enhance performance.
- Integration of `@angular/localize` and configuration of the application in `angular.json` to generate builds for both languages.
- Implementation of a new `language-switcher` component that allows live language switching within the application.
- Accessibility improvements through alternative texts, also managed via i18n.
- Addition of new unit tests for the language switcher component, as well as for existing services and components.


### How to test language switching

To test the multilingual functionality of the application:

1. Build the app using the i18n configuration:
   ```bash
   npm run build:i18n
   ```

2. Serve the application using a static server (like `http-server`), pointing to the following path:
    ```bash
    dist/angular-sofkau/browser
    ```
    Make sure to note the port (e.g., 4000) used by the server or the URL provided by the server (e.g., http://127.0.0.1:4000/).

3. Open the browser and navigate to:
    - server/url/en-US for English (e.g, http://localhost:4000/en-US or http://127.0.0.1:4000/en-US/)
    - server/url/es for Spanish (e.g, http://localhost:4000/es or http://127.0.0.1:4000/es/)
    
    Inside the application, use the language switcher to change the language and see the content update accordingly.