const path = require('path')
const tsImportPluginFactory = require('ts-import-plugin')
const rewireSass = require('react-app-rewire-scss')
const { getLoader } = require('react-app-rewired')

module.exports = (config, env) => {
  const tsLoader = getLoader(
    config.module.rules,
    rule =>
      rule.loader &&
      typeof rule.loader === 'string' &&
      rule.loader.includes('ts-loader')
  )

  const importOptions = {
    style: false,
    libraryName: 'lodash',
    libraryDirectory: null,
    camel2DashComponentName: false
  }

  tsLoader.options = {
    getCustomTransformers: () => ({
      before: [tsImportPluginFactory(importOptions)]
    })
  }

  // Enable SCSS
  config = rewireSass(config, env)

  // Aliases
  config.resolve.alias = {
    ...config.resolve.alias,
    '~/*': path.resolve(__dirname, 'src/')
  }

  return config
}
