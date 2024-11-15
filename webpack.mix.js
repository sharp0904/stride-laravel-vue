const mix = require('laravel-mix');
const tailwindcss = require('tailwindcss');

mix.js('resources/js/app.js', 'public/js').vue({
  version: 3
}).sass('resources/scss/app.scss', 'public/css')
  .options({
    processCssUrls: false,
    postCss: [tailwindcss('./tailwind.config.js')],
  })
  .webpackConfig(require('./webpack.config'))
  .options({
    vue: {
      compilerOptions: {
        isCustomElement: tag => ['trix-editor'].includes(tag)
      }
    }
  }).sourceMaps()

if (mix.inProduction()) {
  mix.version();
}
