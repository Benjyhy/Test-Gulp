const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const mozjpeg = require('imagemin-mozjpeg');

const source = './src'
const destination = './dist'

gulp.task('css', function(){
    return gulp.src(source + '/sass/hello.scss')
    .pipe(plugins.sass())
    .pipe(plugins.csscomb())
    .pipe(plugins.cssbeautify())
    .pipe(plugins.autoprefixer())
    .pipe(gulp.dest(destination + '/dist/css/'))
})

gulp.task('minify', function(){
    return gulp.src(destination + '/dist/css/*.css')
    .pipe(plugins.csso())
    .pipe(plugins.rename({suffix: '.min'}))
    .pipe(gulp.dest(destination + '/css/'))
})

gulp.task('img', function(){
    return gulp.src(source + '/img/**/*.*')
    .pipe(plugins.imagemin([
        mozjpeg({quality: "60"})
    ]))
    .pipe(gulp.dest(destination + '/img/'))
})

gulp.task('watch', function(){
    gulp.watch(source + '/sass/*.scss', gulp.series('css'));
});

gulp.task('prod', gulp.series(['css', 'minify']));