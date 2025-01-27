module.exports = {
  parser: '@typescript-eslint/parser', 
  parserOptions: {
    ecmaVersion: 2020,                 
    sourceType: 'module',              
    ecmaFeatures: {
      jsx: true,                       
    },
  },
  settings: {
    react: {
      version: 'detect', 
    },
  },
  plugins: [
    'react',            
    'react-hooks',      
    '@typescript-eslint', 
    'jsx-a11y',         
    'import',           
  ],
  extends: [
    'eslint:recommended',               
    'plugin:react/recommended',         
    'plugin:react-hooks/recommended',   
    'plugin:@typescript-eslint/recommended', 
    'plugin:jsx-a11y/recommended',      
    'plugin:import/errors',             
    'plugin:import/warnings',
    'plugin:import/typescript',         
    'prettier',                         
  ],
  rules: {
    'react/prop-types': 'off', 
    '@typescript-eslint/explicit-module-boundary-types': 'off', 
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }], 
    'react/jsx-uses-react': 'off', 
    'react/react-in-jsx-scope': 'off', 
  },
  env: {
    browser: true, 
    es6: true,
    node: true,
  },
};
