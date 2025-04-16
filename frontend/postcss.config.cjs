module.exports = {
  plugins: {
    'tailwindcss': {},
    'autoprefixer': {},
    'postcss-nested': {},
    'postcss-preset-env': {},
    'cssnano': process.env.NODE_ENV === 'production' ? {} : false
  }
}