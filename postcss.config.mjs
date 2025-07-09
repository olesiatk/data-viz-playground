import prefixSelector from 'postcss-prefix-selector';

const config = {
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
    '@tailwindcss/postcss',
  ],
};

export default config;