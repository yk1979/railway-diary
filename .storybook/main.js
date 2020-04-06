const path = require("path");

module.exports = {
  stories: ['../src/components/**/__stories__/*.tsx'],
  addons: ['@storybook/addon-actions', '@storybook/addon-links'],
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve('babel-loader'),
          options: {
            presets: [['react-app', { flow: false, typescript: true }]],
          },
        },
        {
          loader: require.resolve("ts-loader"),
        },
        {
          loader: require.resolve("react-docgen-typescript-loader"),
          options: {
          tsconfigPath: path.resolve(__dirname, "../tsconfig.json"),
        },
        }
      ]
    });
    config.resolve.extensions.push('.ts', '.tsx');
    return config;
  },
};
