const path = require('path');

// TODO なんか機能してないので調査
// この辺のissueと同じかも https://github.com/storybookjs/storybook/issues/9564
module.exports = async ({ config }) => {
  config.module.rules.push({
    test: /\.(woff|woff2|eot|ttf|svg|png)$/,
    loaders: ["file-loader"],
    include: path.resolve(__dirname, "../public/font/")
  });

  return config;
}