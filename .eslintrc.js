module.exports = {
  plugins: [
    'ember'
  ],
  extends: [
    'eslint:recommended',
    'plugin:ember/recommended', // or 'plugin:ember/base'
    'airbnb-base'
  ],
  rules: {
    "comma-dangle": ["error", "never"],
    "no-underscore-dangle": "off"
  }
};
