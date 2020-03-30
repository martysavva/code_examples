'use strict';

// include gulp
var gulp = require('gulp');

//include plugins
var clean      = require('gulp-clean');
var changed    = require('gulp-changed');
var concat     = require('gulp-concat');
var uglify     = require('gulp-uglify');
var htmlmin    = require('gulp-htmlmin');
var less       = require('gulp-less');
var path       = require('path');
var livereload = require('gulp-livereload');
var inject     = require('gulp-inject');
var mkdirp     = require('mkdirp');
var strip      = require('gulp-strip-comments');
var stripDebug = require('gulp-strip-debug');


//all scripts used by the app
var scripts = [
    './node_modules/jquery/dist/jquery.min.js',
    './node_modules/angular/angular.min.js',
    './node_modules/angular-resource/angular-resource.min.js',
    './node_modules/angular-ui-router/release/angular-ui-router.min.js',
    './node_modules/angular-jwt/dist/angular-jwt.min.js',
    './node_modules/angular-cookies/angular-cookies.min.js',
    './node_modules/angular-sanitize/angular-sanitize.min.js',
    './node_modules/angular-translate/dist/angular-translate.min.js',
    './node_modules/angular-translate-storage-local/angular-translate-storage-local.min.js',
    './node_modules/angular-translate-storage-cookie/angular-translate-storage-cookie.min.js',
    './node_modules/angular-translate-loader-static-files/angular-translate-loader-static-files.min.js',
    './node_modules/angular-ui-bootstrap/ui-bootstrap.min.js',
    './node_modules/angular-ui-bootstrap/ui-bootstrap-tpls.min.js',
    './node_modules/angular-xeditable/dist/js/xeditable.min.js',
    './node_modules/moment/min/moment.min.js',
    './node_modules/moment-timezone/builds/moment-timezone-with-data.min.js',
    './node_modules/highcharts/highcharts.js',
    './node_modules/underscore/underscore-min.js',
    './node_modules/ng-country-select/dist/ng-country-select.min.js',
    './node_modules/angular-toggle-switch/angular-toggle-switch.min.js',
    './node_modules/angular-spinner/node_modules/spin.js/spin.min.js',
    './node_modules/angular-spinner/angular-spinner.min.js',
    './node_modules/ng-file-upload/dist/ng-file-upload-all.min.js',
    './src/app/assets/lib/FileSaver.js',
    './src/app/assets/lib/Blob.js',
    './src/app/app.module.js',
    './src/app/*.js',
    './src/app/code/**/*.js'
];




//region PRODUCTION
    //All tasks need to be run in order
    //The last task in the chain is called which will start at the top of the chain and runn all tasks in order

    //remove old buld folder
    gulp.task('removeBuildFolder', function () {
        return gulp.src('./build', {read: false})
            .pipe(clean());
    });

    //create new build folder
    gulp.task('createBuildFolder',['removeBuildFolder'], function () {
        return mkdirp('./build', function (err) {
            if (err) {
                console.error(err);
            }
        });
    });

    //Copy default index.html page into build folder
    gulp.task('htmlPageProd',['createBuildFolder'], function() {
        return gulp.src('./index.html')
            .pipe(changed('./build'))
            //.pipe(minifyHTML())
            .pipe(gulp.dest('./build'))
            .pipe(livereload());
    });

    //copy remaining assets into build folder
    gulp.task('copyAssets', ['htmlPageProd'], function () {
        return gulp.src([
                './src/app/assets/**/*.json',
                './src/app/assets/**/*.png',
                './src/app/assets/**/*.jpg',
                './src/app/assets/**/*.gif',
                './src/app/assets/**/*.eot',
                './src/app/assets/**/*.svg',
                './src/app/assets/**/*.ttf',
                './src/app/assets/**/*.woff',
                './src/app/assets/**/*.woff2',
                './src/app/assets/**/*.css'], {
                base: './src'
            })
            .pipe(gulp.dest('./build'));
    });

    //copy remaining html into build folder
    gulp.task('copyHtml', ['copyAssets'], function () {
        return gulp.src([
                './src/app/code/**/*.html',
                './src/app/assets/**/*.html'], {
                base: './src'
            })
        .pipe(strip()) //strip HTML comments
        .pipe(gulp.dest('./build'));
});

    //concatenate all js files and copy to build folder
    gulp.task('prodScripts', ['copyHtml'], function() {
        return gulp.src(scripts)
            .pipe(strip()) //strip comments
            .pipe(stripDebug()) //strip debug (console etc)
            .pipe(concat('script.js'))
            .pipe(gulp.dest('./build/app/assets/scripts/'))
            .pipe(livereload());

    });

    //compile LESS and copy into build folder
    gulp.task('prodLess',['prodScripts'], function () {
        return gulp.src('./src/app/assets/less/**/bootstrap.less')
            .pipe(less({
                paths: [ 'less' ]
            }))
            .pipe(gulp.dest('./build/app/assets/styles/'))
            .pipe(livereload());
    });


    //Inject compiled js/css into index.html inside build folder
    gulp.task('prodInject', ['prodLess'], function(){
        return gulp.src('./build/index.html')
            .pipe(inject(gulp.src([
                './build/app/assets/scripts/script.js',
                './build/app/assets/styles/*.css'], {read: false}), {relative: true}))
            .pipe(gulp.dest('./build'))
            .pipe(livereload());
    });


    // production gulp task
    gulp.task('build.production', ['prodInject'], function() {});

//endregion



//region DEVELOPMENT

    //remove old index.html from src
    gulp.task('removeDevHtml', function(){
        return gulp.src('./src/index.html', {read: false})
            .pipe(clean());
    });


    // copy index.html to src
    gulp.task('htmlPageDev',['removeDevHtml'], function() {
        return gulp.src('./index.html')
            .pipe(changed('./src'))
            .pipe(gulp.dest('./src'))
            .pipe(livereload());
    });

    //inject js paths into index.html within src
    gulp.task('devScripts', ['htmlPageDev'], function() {
        var scriptsClone = scripts.slice(0);
        scriptsClone.push('./src/app/assets/styles/bootstrap.css');
        scriptsClone.push('./src/app/assets/styles/xeditable.css');


        return gulp.src('./src/index.html')
            .pipe(inject(gulp.src(scriptsClone, {read: false}), {relative: true}))
            .pipe(gulp.dest('./src'))
            .pipe(livereload());
    });


    //compile less files and copy to src
    gulp.task('lessDev', function () {
        return gulp.src('./src/app/assets/less/bootstrap.less')
            .pipe(less({
                paths: [ 'less' ]
            }))
            .pipe(gulp.dest('./src/app/assets/styles/'))
            .pipe(livereload());
    });



    //watch html files for changes
    gulp.task('watchHtml', function () {
        return gulp.src([
                './src/app/code/**/*.html'
            ])
            .pipe(livereload());
    });


    // development gulp task
    gulp.task('build.development', ['devScripts', 'lessDev'], function() {

        livereload({ start: true });

        //watch js files
        gulp.watch('./src/app/*.js', function() {
            livereload.reload();
        });
        //watch js files
        gulp.watch('./src/app/code/**/*.js', function() {
            livereload.reload();
        });
        //watch less files
        gulp.watch('./src/app/assets/less/*.less', function() {
            gulp.run('lessDev');
        });
        //watch html files
        gulp.watch('./src/app/code/**/*.html', function() {
            livereload.reload();
        });
    });
//endregion













