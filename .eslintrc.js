module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "plugin:react/recommended",
    "airbnb",
  ],
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: [
    "react",
    "prettier",
  ],
  rules: {
    "no-console": "off",
    "linebreak-style": "off",
    "no-plusplus": "off",
    "quote-props": ["error", "consistent-as-needed"],
    "quotes": ["error", "double"],
    "brace-style": ["error", "stroustrup", { allowSingleLine: true }],
    "comma-dangle": ["error", {
      arrays: "always-multiline",
      objects: "always-multiline",
      imports: "never",
      exports: "never",
      functions: "never",
    }],
    "object-curly-newline": ["error", {
      ObjectExpression: { multiline: true, consistent: true },
      ObjectPattern: { multiline: true, consistent: true },
      ImportDeclaration: { multiline: true, minProperties: 6 },
      ExportDeclaration: { multiline: true, minProperties: 6 },
    }],
    "arrow-parens": ["error", "as-needed"],
    "react/jsx-one-expression-per-line": ["error", { allow: "single-child" }],
    "react/destructuring-assignment": ["error", "never"],
    "jsx-a11y/label-has-associated-control": "off",
  },
};
