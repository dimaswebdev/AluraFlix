import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import unusedImportsPlugin from "eslint-plugin-unused-imports";
import testingLibraryPlugin from "eslint-plugin-testing-library";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"], // Verifica arquivos JS e JSX
    languageOptions: {
      globals: {
        ...globals.browser, // Variáveis globais do navegador
        ...globals.jest, // Variáveis globais do Jest
      },
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
      "unused-imports": unusedImportsPlugin, // Plugin para identificar importações não utilizadas
      "testing-library": testingLibraryPlugin, // Plugin para melhores práticas de teste
    },
    settings: {
      react: {
        version: "detect", // Detecta automaticamente a versão do React
      },
    },
    rules: {
      ...pluginJs.configs.recommended.rules, // Regras recomendadas do ESLint
      ...pluginReact.configs.flat.recommended.rules, // Regras recomendadas do React
      ...testingLibraryPlugin.configs.react.rules, // Regras para Testing Library
      "prettier/prettier": "error", // Ativa Prettier como regra do ESLint
      "react/prop-types": "warn", // Gera avisos sobre validações de PropTypes
      "react/react-in-jsx-scope": "off", // Desabilita a regra para importar React (não necessário no React 17+)
      "no-console": "warn", // Emite avisos para console.log (boa prática)
      "no-unused-vars": "off", // Evita redundância com unused-imports
      "unused-imports/no-unused-imports": "error", // Emite erro para importações não utilizadas
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_", // Ignora variáveis que começam com "_"
          args: "after-used",
          argsIgnorePattern: "^_", // Ignora argumentos que começam com "_"
        },
      ],
    },
  },
  prettierConfig, // Inclui as configurações do Prettier
];
