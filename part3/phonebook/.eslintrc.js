module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "node": true,
        "es2021": true
    },
    "extends": "eslint:recommended",
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest"
    },
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "never"
        ],
        "eqeqeq": "error",
        "no-trailing-spaces": "error",
        "object-curly-spacing": [
            "error",
            "always"
        ],
        "arrow-spacing": [
            "error",
            { "before": true, "after": true }
        ],
        "no-console": 0
    }
}
