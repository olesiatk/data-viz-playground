const prefixSelector = require('postcss-prefix-selector');

module.exports = {
  plugins: [
    prefixSelector({
      prefix: '#__prefix',
      transform: (prefix, selector, prefixedSelector) => {
        if (selector.startsWith('html') || selector.startsWith('body')) {
          return selector;
        }
        return prefixedSelector;
      },
    }),
    require('tailwindcss'),
    require('autoprefixer'),
  ],
};
