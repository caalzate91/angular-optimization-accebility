import 'jest-preset-angular/setup-jest';
import { TextEncoder, TextDecoder } from 'util';
import '@angular/localize/init';

(global as any).TextEncoder = TextEncoder;
(global as any).TextDecoder = TextDecoder as any;

beforeAll(() => {
  const link = document.createElement('link');
  link.rel = 'preconnect';
  link.href = 'https://rickandmortyapi.com';
  link.crossOrigin = '';
  document.head.appendChild(link);
});

// Mock para localStorage
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(() => null),
    setItem: jest.fn(() => null),
    removeItem: jest.fn(() => null),
    clear: jest.fn(() => null)
  },
  writable: true
});

// Mock para matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Configuración global de Jest
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));
