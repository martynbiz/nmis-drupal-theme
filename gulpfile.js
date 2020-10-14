'use strict';

/*
TODO 
Replace js task with js_webpack 
Linting - https://tech.uaccount.uk/2018/02/28/how-to-add-javascript-linting-to-your-project-using-eslint-and-gulp.html
const {src, task} = require('gulp');
Remove unused packages e.g. isotope 
*/

// Ignore me - demo 

const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const webpack = require('webpack-stream');
const jest = require('gulp-jest').default;
const eslint = require('gulp-eslint');
const argv = require('yargs').argv; 
const sassLint = require('gulp-sass-lint');

/**
 * You can choose whether to use Dart Sass or Node Sass by setting the sass.compiler
 * property. Node Sass will be used by default, but it's strongly recommended that
 * you set it explicitly for forwards-compatibility in case the default ever changes.
 * @see https://www.npmjs.com/package/gulp-sass
 */
sass.compiler = require('node-sass');

// scss files
const SASS_SRC = './assets/sass/**/*.scss';

// pick up .js but not *.bundle.js or js files in js/modules - these belong to webpack
const JS_SRC = ['./assets/js/**/*.js', '!./assets/js/modules/**/*.js', '!./assets/js/**/*.bundle.js'];

// only bundle *.bundle.js files, and any js in the modules dir
const JSES_SRC = ['./assets/js/**/*.bundle.js', './assets/js/modules/**/*.js'];

//Task for compiling sass. Run with 'gulp sass'
gulp.task('sass', function() {
    return gulp.src(SASS_SRC)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/css'));
});

// compile js_webpack/* files to es5
gulp.task("js", function() {
    return gulp.src(JS_SRC)
        //.pipe(babel({
            //presets: ['@babel/env']
        //}))
        .pipe(gulp.dest("./dist/js"));
});

// compile js_webpack/* files to es5, and bundle modules
// also, we're auto running jest tests as modules allow us to do that
gulp.task('js_webpack', ['jest'], function() {
    return gulp.src(JSES_SRC)
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('jest', function() {
    return gulp.src('./assets/js/modules/**/__tests__')
        .pipe(jest(require('./jest.config.js')));
});

// @see https://sasstools.github.io/make-sass-lint-config/
gulp.task('lintjs', () => {
    return gulp.src(argv.file ? argv.file : './assets/js/**/*.js')
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
});

gulp.task('lintsass', function () {
    return gulp.src(argv.file ? argv.file : './assets/sass/**/*.s+(a|c)ss')
        .pipe(sassLint())
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError())
});

// Static server
gulp.task('serve', function() {

    // browserSync.init({
    //     server: {
    //         baseDir: "./"
    //     },
    //     startPath: "/demo",
    //     ghostMode: false
    // });

    // watch the src files and html files for changes
    gulp.watch(SASS_SRC, ['sass']);
    gulp.watch(JS_SRC, ["js"]);
    gulp.watch(JSES_SRC, ["js_webpack"]);

    // // watch the dist files, and browser sync when changes
    // gulp.watch(["./dist/**/*", "./demo/**/*"]).on('change', browserSync.reload);
});

// Default `gulp` task
gulp.task('default', ['serve']);
