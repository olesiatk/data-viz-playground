const prefix = '/data-viz-playground';

module.exports = {
  plugins: {
    'postcss-prefix-selector': {
      prefix,
      transform(prefix, selector, prefixedSelector) {
        // Don't prefix keyframes or global html/body
        if (selector.startsWith('html') || selector.startsWith('body')) {
          return selector;
        }
        return prefixedSelector;
      },
    },
    tailwindcss: {},
    autoprefixer: {},
  },
};