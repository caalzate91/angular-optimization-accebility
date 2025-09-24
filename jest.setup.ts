import '@angular/localize/init';
import 'jest-preset-angular/setup-jest.js';

// 👉 Patch global TextEncoder/TextDecoder for Angular tests
import { TextEncoder, TextDecoder } from 'util';

Object.assign(globalThis, {
  TextEncoder,
  TextDecoder,
});
