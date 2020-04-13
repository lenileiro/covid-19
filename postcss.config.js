module.exports = {
    plugins: {
      'tailwindcss': './tailwind.config.js',
      '@fullhuman/postcss-purgecss':{
        content:[
          './app/**/**.js',
          './public/index.html'
        ],
        defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
      },
      'postcss-import': {},
      'postcss-preset-env': {
        browsers: 'last 2 versions',
      },
      'cssnano': {},
    },
  };