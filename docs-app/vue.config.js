const { IgnorePlugin } = require('webpack')

module.exports = {
  baseUrl: '/gameicons-webfont/',
  outputDir: '../docs',
  pwa: {
    name: 'GameIcons Webfont @rolodromo'
  },

  lintOnSave: false,
  configureWebpack: {
    plugins: [new IgnorePlugin(/^\.\/locale$/, /moment$/)]
  }
}
