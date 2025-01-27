import globals from 'globals';
import pluginJs from '@eslint/js';
import { configs } from '@typescript-eslint/eslint-plugin'; // Import TypeScript plugin directly
import pluginReact from 'eslint-plugin-react';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      globals: globals.browser,
    },
  },
  pluginJs.configs.recommended,
  configs.recommended, // Correct usage of TypeScript plugin rules
  pluginReact.configs.recommended,
];
