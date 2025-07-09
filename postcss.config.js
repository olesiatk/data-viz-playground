const prefixSelector = require("postcss-prefix-selector");
const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");

module.exports = {
  plugins: [
    prefixSelector({
      prefix: "#__prefix",
      transform: (prefix, selector, prefixedSelector) => {
        if (selector.startsWith("html") || selector.startsWith("body")) {
          return selector;
        }
        return prefixedSelector;
      },
    }),
    tailwindcss,
    autoprefixer,
  ],
};