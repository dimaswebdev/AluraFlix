import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"], // Verifica arquivos JS e JSX
    languageOptions: {
      globals: globals.browser, // Variáveis globais do navegador
      parserOptions: {
        ecmaVersion: 2021, // Versão do ECMAScript
        sourceType: "module", // Usa ES Modules
        ecmaFeatures: {
          jsx: true, // Habilita suporte a JSX
        },
      },
    },
    plugins: {
      react: pluginReact, // Plugin React
      prettier: prettierPlugin, // Plugin Prettier
    },
    settings: {
      react: {
        version: "detect", // Detecta automaticamente a versão do React
      },
    },
    rules: {
      ...pluginJs.configs.recommended.rules, // Regras recomendadas do ESLint
      ...pluginReact.configs.flat.recommended.rules, // Regras recomendadas do React
      "prettier/prettier": "error", // Ativa Prettier como regra do ESLint
      "react/prop-types": "warn", // Gera avisos sobre validações de PropTypes
      "react/react-in-jsx-scope": "off", // Desabilita a regra para importar React (não necessário no React 17+)
      "no-console": "warn", // Emite avisos para console.log (boa prática)
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }], // Ignora variáveis iniciadas com "_"
    },
  },
  prettierConfig, // Inclui as configurações do Prettier
];
