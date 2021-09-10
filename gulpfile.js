const gulp = require('gulp');
const webpack = require('webpack-stream');
const sass = require('gulp-sass')(require('sass'));
const dist =
  'C:/Users/rihard/Desktop/OpenServer/domains/localhost/engine/admin';

gulp.task('build-html', () => {
  return gulp.src('./app/src/index.html').pipe(gulp.dest(dist));
});

gulp.task('build-js', () => {
  return gulp
    .src('./app/src/script.js')
    .pipe(
      webpack({
        mode: 'development',
        output: {
          filename: 'script.js',
        },
        watch: true,
        devtool: 'source-map',
        module: {
          rules: [
            {
              test: /\.m?js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: [
                    [
                      '@babel/preset-env',
                      {
                        debug: true,
                        corejs: 3,
                        useBuiltIns: 'usage',
                      },
                    ],
                    '@babel/react',
                  ],
                },
              },
            },
            {
              test: /\.s[ac]ss$/i,
              use: [
                // Creates `style` nodes from JS strings
                'style-loader',
                // Translates CSS into CommonJS
                'css-loader',
                // Compiles Sass to CSS
                'sass-loader',
              ],
            },
          ],
        },
      })
    )
    .pipe(gulp.dest(dist));
});

gulp.task('build-sass', () => {
  return (
    gulp
      // .src('./app/scss/style.scss')
      .src('./app/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest(dist))
  );
});

gulp.task('build-api', () => {
  return gulp.src('./app/api/**/*.*').pipe(gulp.dest(dist + '/api'));
});

gulp.task('build-assets', () => {
  return gulp.src('./app/assets/**/*.*').pipe(gulp.dest(dist + '/assets'));
});

gulp.task('watch', () => {
  gulp.watch('./app/src/index.html', gulp.parallel('build-html'));
  gulp.watch('./app/assets/**/*.*', gulp.parallel('build-assets'));
  gulp.watch('./app/api/**/*.*', gulp.parallel('build-api'));
  gulp.watch('./app/**/*.scss', gulp.parallel('build-sass'));
  gulp.watch('./app/**/*.js', gulp.parallel('build-js'));
});

gulp.task(
  'build',
  gulp.parallel(
    'build-html',
    'build-assets',
    'build-api',
    'build-sass',
    'build-js'
  )
);

gulp.task('default', gulp.parallel('watch', 'build'));
