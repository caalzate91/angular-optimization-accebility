# AngularSofkau

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.16.

## Rick and Morty Character Explorer

A multilingual Angular application that displays characters from the Rick and Morty universe using the [Rick and Morty API](https://rickandmortyapi.com/).

## Features

- 🌍 **Internationalization (i18n)**: Supports English and Spanish languages
- 🚀 **Optimized Performance**: Uses Angular's built-in optimizations
- ♿ **Accessibility**: Focused on accessibility best practices
- 📱 **Responsive Design**: Works on all device sizes
- 🧪 **Unit Testing**: Comprehensive test coverage with Jest

## Development server

Run `ng serve` for a dev server in English. Navigate to `http://localhost:4200/`. 

For Spanish version, run `npm run start:es`. The application will automatically reload if you change any of the source files.

## Internationalization

This project includes full i18n support:

### Available Commands

- `npm run i18n:extract` - Extract translatable text from templates
- `npm run start:es` - Run development server in Spanish
- `npm run build:es` - Build Spanish version
- `npm run build:all` - Build all language versions

### Supported Languages

- **English (en-US)** - Default language
- **Spanish (es)** - Available translation

### Adding New Translations

1. Add `i18n` attributes to your HTML elements:
   ```html
   <h1 i18n="@@unique-id">Text to translate</h1>
   ```

2. Extract messages:
   ```bash
   npm run i18n:extract
   ```

3. Update translation files in `src/locale/`

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

For building specific languages:
- `npm run build` - Build English version
- `npm run build:es` - Build Spanish version  
- `npm run build:all` - Build all language versions

## Running unit tests

Run `npm test` to execute the unit tests via [Jest](https://jestjs.io/).

### Testing Commands

- `npm test` - Run tests once
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
