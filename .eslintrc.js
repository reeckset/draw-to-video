module.exports = {
  "parser": "babel-eslint",
  "extends": ["airbnb"],
  
  "env": {
    "browser": true,
    "node": true
  },
  "rules": {
    "no-console": "off",
    "comma-dangle": "off",
    "react/jsx-filename-extension": "off",
    "react/prop-types": 0,
    "indent": ["error", 4],
    "react/jsx-indent": ["error", 4],
    "react/jsx-indent-props": ["error", 4],
    "no-plusplus": "off",
    "new-cap": "off",
    "no-restricted-syntax": "off",
    "no-continue": "off",
    "no-unused-expressions": "off",
    "jsx-a11y/media-has-caption": "off",
  }
}
