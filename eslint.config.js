import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';
import prettierRecommended from 'eslint-plugin-prettier/recommended';

export default defineConfig([
  globalIgnores(['dist', 'coverage']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: {
        ...globals.browser,
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        vi: 'readonly',
      },
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      complexity: ['error', { max: 10 }],
      'max-depth': ['error', 3],
      'max-lines': ['warn', { max: 300, skipBlankLines: true, skipComments: true }],
      'max-lines-per-function': ['warn', { max: 80, skipBlankLines: true, skipComments: true }],
    },
  },
  {
    // Lógica de dominio: cálculos, utilidades, reducers y validaciones.
    files: ['src/lib/**/*.{ts,tsx}', 'src/utils/**/*.{ts,tsx}', 'src/features/*/lib/**/*.{ts,tsx}'],
    rules: {
      complexity: ['error', { max: 5 }],
      'max-lines-per-function': ['warn', { max: 50, skipBlankLines: true, skipComments: true }],
    },
  },
  {
    // Tests, datos estáticos, tipos y configuración quedan fuera de los límites de tamaño.
    files: [
      '**/*.test.{ts,tsx}',
      '**/*.d.ts',
      'src/data/**/*.{ts,tsx}',
      'src/test/**/*.{ts,tsx}',
      '**/*.config.{js,ts}',
    ],
    rules: {
      complexity: 'off',
      'max-lines': 'off',
      'max-lines-per-function': 'off',
    },
  },
  prettierRecommended,
]);
