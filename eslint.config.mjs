import globals from 'globals';
import pluginJs from '@eslint/js';
import { configs } from '@typescript-eslint/eslint-plugin'; 
import pluginReact from 'eslint-plugin-react';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      globals: globals.browser,
    },
  },
  pluginJs.configs.recommended,
  configs.recommended, 
  pluginReact.configs.recommended,
];
