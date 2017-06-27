'use strict';
/*****************************************
    Variables
******************************************/
//Dependency Variables
var autoprefixer = require('gulp-autoprefixer'),
   base64 = require('gulp-css-base64'),
   bs = require('browser-sync').create(),
   cached = require('gulp-cached'),
   changed = require('gulp-changed'),
   //concat = require('gulp-concat'),
   del = require('del'),
   gulp = require('gulp'),
   gulpif = require('gulp-if'),
   //minify = require('gulp-minify'),
   notify = require('gulp-notify'),
   plumber = require('gulp-plumber'),
   pug = require('gulp-pug'),
   pugInheritance = require('gulp-pug-inheritance'),
   reload = bs.reload,
   sass = require('gulp-sass'),
   sourcemaps = require('gulp-sourcemaps');

//Browsersync Variables
var sitePort = Math.floor(Math.random() * (49150 - 1024 + 1)) + 1024;
var uiPort = sitePort + 1;


/*****************************************
JavaScript Tasks
******************************************/
// //Delete old compiled JS
// gulp.task('cleanJS', function() {
//    return del('js/front-end/frontEnd*.js');
// });
// //Conconate JS
// gulp.task('concatJS', ['cleanJS'], function() {
//    return gulp.src(['js/front-end/jquery*.js',
//          'js/front-end/*.js',
//          '!js/**/frontEnd*.js'
//       ])
//       .pipe(plumber({ errorHandler: notify.onError('<%= error.message %>') }))
//       .pipe(concat('frontEnd.js'))
//       .on('error', function(err) {
//          new Error(err);
//       })
//       .pipe(plumber.stop())
//       .pipe(gulp.dest('./js/front-end/'));
// });
// //Minify JS
// gulp.task('minifyJS', ['concatJS'], function() {
//    return gulp.src('js/front-end/frontEnd.js')
//       .pipe(plumber({ errorHandler: notify.onError('<%= error.message %>') }))
//       .pipe(minify({
//          noSource: true,
//          mangle: false
//       }))
//       .on('error', function(err) {
//          new Error(err);
//       })
//       .pipe(plumber.stop())
//       .pipe(gulp.dest('./js/front-end/'))
//       .pipe(bs.stream());
// });


/*****************************************
    SCSS/CSS Tasks
******************************************/
// Delete old compiled CSS
gulp.task('cleanCSS', function() {
   return del('style/css/**');
});
// Compile SCSS, Prefix, Write Sourcemap
gulp.task('compileCSS', ['cleanCSS'], function() {
   return gulp.src(['style/scss/**/*.scss'])
      .pipe(plumber({ errorHandler: notify.onError('<%= error.message %>') }))
      .pipe(sourcemaps.init())
      .pipe(sass({ outputStyle: 'compressed' }).on('error', function(err) {
         new Error(err);
      }))
      .pipe(autoprefixer({
         browsers: ['last 2 versions'],
         cascade: false
      }))
      .pipe(sourcemaps.write('./'))
      .pipe(plumber.stop())
      .pipe(gulp.dest('style/css'))
      .pipe(bs.stream({ match: '**/*.css' }));
});

/*****************************************
    PUG Tasks
******************************************/
//Compile changed PUG files to and push to browser
gulp.task('compileChangedPUG', function() {
   return gulp.src(['pug/**/*.pug'])
      .pipe(plumber({ errorHandler: notify.onError('<%= error.message %>') }))
      .pipe(changed('./', { extension: '.html' }))
      .pipe(gulpif(global.isWatching, cached('pug')))
      .pipe(pugInheritance({ basedir: './pug', skip: 'node_modules' }))
      .pipe(pug({
         pretty: true,
         notify: false
      }))
      .pipe(plumber.stop())
      .pipe(gulp.dest('./'));
});
/**
 * Important!!
 * Separate task for the reaction to `.pug` files to call reload only after all pug files have
 * been compiled
 */
gulp.task('pushPUG', ['compileChangedPUG'], function() {
   return gulp.src(['pug/**/*.pug'])
      .pipe(bs.stream({
         once: true
      }));
});
//set global watching variable
gulp.task('setWatch', function() {
   global.isWatching = true;
});

//Delete old compiled HTML files
gulp.task('cleanPUG', function() {
   return del(['./*.html', 'includes/*.html']);
});
//Compile Remaining PUG files to HTML
gulp.task('compileAllPUG', ['cleanPUG'], function() {
   return gulp.src(['pug/**/*.pug'])
      .pipe(plumber({ errorHandler: notify.onError('<%= error.message %>') }))
      .pipe(pug({
         pretty: true,
         notify: false
      }))
      .pipe(plumber.stop())
      .pipe(gulp.dest('./'))
});

/*****************************************
    BrowserSync & Watch Tasks
******************************************/
gulp.task('reload', function() {
   bs.reload();
   return;
});
//Browsersync watch and serve changes
//gulp.task('serve', ['compileCSS', 'minifyJS', 'setWatch', 'compilePUG', ], function() {
gulp.task('serve', ['compileCSS', 'setWatch', 'compileAllPUG', ], function() {
   bs.init({
      notify: false,
      server: {
         baseDir: './'
      },
      port: sitePort,
      ui: {
         port: uiPort
      }
   })
   gulp.watch('style/**/*.scss', ['compileCSS']);
   //gulp.watch(['js/**', '!js/front-end/frontEnd*.js'], ['minifyJS']);
   gulp.watch(['js/**'], ['reload']);
   gulp.watch('pug/**/*.pug', ['pushPUG']);
});
//Default gulp task start watching
gulp.task('default', ['serve']);
