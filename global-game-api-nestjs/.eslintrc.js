module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    // Install
    "@typescript-eslint/naming-convention": [
      "error",
      {
        "selector": "interface",
        "format": ["PascalCase"],
        "custom": {
          "regex": "^I[A-Z]",
          "match": true
        }
      }
    ],
    "@typescript-eslint/explicit-function-return-type": "error",
    '@typescript-eslint/explicit-module-boundary-types': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    "@typescript-eslint/no-inferrable-types": "off", // Désactiver la règle qui empêche l'inférence de type
    "@typescript-eslint/typedef": [
      "error",
      {
        "variableDeclaration": false,
        "arrowParameter": false,
        "propertyDeclaration": true
      }
    ],
    "prettier/prettier": 0,
    "require-await": "error",
    //CodeQuality
    "no-console": "warn",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        "vars": "local",
        "args": "none",
        "ignoreRestSiblings": true,
        "varsIgnorePattern": "^_",
        "argsIgnorePattern": "^_",
        "caughtErrorsIgnorePattern": "^_"
      }
    ],
    "no-undef": "off",
    "func-names": "off",
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": [
      "error"
    ],
    "no-param-reassign": "off",
    "no-plusplus": "off",
    "radix": "off",
    "no-restricted-syntax": "off",
    "no-use-before-define": "off",
    "require-await": "error",
    "@typescript-eslint/no-use-before-define": [
      "off"
    ],
    "import/no-default-export": "off",
    "import/prefer-default-export": "off",
    "import/extensions": "off",
    "import/no-unresolved": "off",
    "import/no-extraneous-dependencies": "off",
    "import/no-named-default": "off",
    'no-restricted-syntax': [
      'error',
      {
        selector: 'SpreadElement',
        message: 'The spread operator is not allowed.',
      },
      {
        selector: 'RestElement',
        message: 'The rest operator is not allowed.',
      },
    ],
    //CodeStyle
    "max-classes-per-file": "off",
    "max-len": "off",
    "no-tabs": "error",
    "no-mixed-spaces-and-tabs": "error",
    "linebreak-style": "off",
    "quotes": [
      "error",
      "double"
    ],
    "arrow-parens": [
      "error",
      "as-needed"
    ],
    "comma-dangle": [
      "error",
      "never"
    ]
  },
};
