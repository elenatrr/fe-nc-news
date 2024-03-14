module.exports = {
    "settings": {
      "react": {
        "version": "detect"
      }
    },
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "indent": ["error", 2],
      "quotes": ["error", "double"],
      "semi": ["error", "always"],
      "no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
      "eqeqeq": "error",
      "no-trailing-spaces": "error",
      "comma-spacing": ["error", { "before": false, "after": true }],
      "prefer-const": "error",
      "no-console": "error",
    }
}
