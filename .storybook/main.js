const path = require("path");

module.exports = {
  stories: ['../src/components/**/__stories__/*.tsx'],
  addons: [
    '@storybook/addon-actions/register',
    '@storybook/addon-links/register',
    '@storybook/addon-knobs/register',
    '@storybook/addon-viewport/register'
  ],
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve('babel-loader'),
          options: {
            presets: [['react-app', { flow: false, typescript: true }]],
          },
        }
      ]
    });
    config.resolve.extensions.push('.ts', '.tsx');
    return config;
  },
};
