// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import nextPlugin from '@next/eslint-plugin-next';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      // Disable specific rules that are causing issues
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      'react/no-unescaped-entities': 'off',
      '@next/next/no-html-link-for-pages': 'warn',
    },
    ignores: [
      // Ignore macOS hidden files
      '**/._*',
      // Ignore node_modules
      '**/node_modules/**',
      // Ignore build output
      '**/.next/**',
      '**/out/**',
      '**/build/**',
      '**/dist/**',
      // Ignore coverage output
      '**/coverage/**',
      // Ignore environment files
      '**/.env*',
      '!**/.env.example',
    ],
  }
);
