const config = {
  plugins: {
    [prefixSelector({
      prefix: '/data-viz-playground',
      transform(prefix, selector, prefixedSelector) {
        if (selector.startsWith('html') || selector.startsWith('body')) {
          return selector;
        }
        return prefixedSelector;
      },
    })]: {},
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;
