var gulp = require('gulp');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var cleanCss = require('gulp-clean-css');
var jsMinify = require('gulp-minify');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();


//change source to what ever technology used for the application (Angular , React , ... etc )
var srcType = "src";
var paths = {
    html: {
        src: 'src/**/*.html',
        dist: 'dist'
    },
    images: {
        src: 'src/resources/images/**/*',
        dist: 'dist/resources/images'
    },
    style: {
        src: 'src/resources/style/main',
        dist: 'dist/resources/style/'
    },
    js: {
        src: 'src/resources/js/**/*.js',
        dist: 'dist/resources/js/'
    }
};


//Copy all html files and views
gulp.task('copyHtmlFiles', function() {
    return gulp.src(paths.html.src)
        .pipe(gulp.dest(paths.html.dist));
});

//Copy all static images and optimize them
gulp.task('images', function() {
    return gulp.src(paths.images.src)
        .pipe(imagemin({ optimizationLevel: 5 }))
        .pipe(gulp.dest(paths.images.dist));
});


//Compile main Sass file and minify ... all other Sass files should be imported in main.less
gulp.task('compileSass', function() {
    return gulp.src(paths.style.src + ".scss")
        .pipe(sass())
        .pipe(cleanCss())
        .pipe(gulp.dest(paths.style.dist));
});


//Concat all javascript files in one single file named main.js and minify it.
gulp.task('scripts', function() {
    return gulp.src([
            './node_modules/hammerjs/hammer.min.js',
            paths.js.src
        ])
        .pipe(concat('main.js'))
        .pipe(jsMinify())
        .pipe(gulp.dest(paths.js.dist));
});


// Static server and files watch only for static sites
gulp.task('static-server-and-watch', function() {
    browserSync.init({
        server: {
            baseDir: "./dist/"
        }
    });

    //Watch any change in html, css or js files to reload browserSync 
    gulp.watch(paths.style.src + ".scss", ['compileSass', browserSync.reload]);
    gulp.watch(paths.js.src, ['scripts', browserSync.reload]);
    gulp.watch(paths.html.src, ['copyHtmlFiles', browserSync.reload]);
});





//last 2 tasks should be added only if we have node server not only static server
gulp.task('default', ['scripts', 'copyHtmlFiles', 'images', 'compileSass', 'static-server-and-watch']);
