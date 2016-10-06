/**
 *  Require packages
 */
var r = require;
var gulp        = r('gulp'),
    ts          = r('gulp-typescript'),
    tslint      = r('gulp-tslint'),
    compass     = r('gulp-compass'),
    cssmin      = r('gulp-cssmin'),
    concat      = r('gulp-concat'),
    uglify      = r('gulp-uglify'),
    rename      = r('gulp-rename'),
    watch       = r('gulp-watch'),
    browserify  = r('gulp-browserify'),
    runSequence = r('run-sequence');

var tsProject = ts.createProject('tsconfig.json', {
    typescript: r('typescript')
});

/**
 * Configuration assets of project
 */
var project = {
    basePath: './src/',
    init: function() {
        this.scripts        = this.basePath + '/assets/scripts';
        this.stylesheets    = this.basePath + '/assets/stylesheets';
        this.js             = this.basePath + '/dist/js';
        this.css            = this.basePath + '/dist/css';
        this.banner         = '/**\n' +
                              ' * <%= pkg.name %>\n' +
                              ' * <%= grunt.template.today("yyyy-mm-dd") %>\n' +
                              ' */\n';
        return this;
    }
}.init();

gulp.task('libjs', function() {
    return gulp.src([
        'node_modules/core-js/client/shim.min.js',
        'node_modules/zone.js/dist/zone.js',
        'node_modules/reflect-metadata/Reflect.js',
        'node_modules/systemjs/dist/system.src.js',
        'src/dist/bower/jquery/dist/jquery.min.js',
        'src/dist/bower/bootstrap/dist/js/bootstrap.min.js'
    ])
    .pipe(concat('libs.js'))
    .pipe(gulp.dest(project.js))
});

gulp.task('libcss', function() {
    return gulp.src([
        'src/dist/bower/bootstrap/dist/css/bootstrap.min.css',
        'src/dist/bower/bootstrap/dist/css/bootstrap-theme.min.css',
        'src/dist/fontawesome/css/font-awesome.min.css'
    ])
    .pipe(concat('libs.css'))
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(project.css))
});

gulp.task('js', function() {
  return gulp.src([project.scripts + '/*.js', '!' + project.scripts + '/*.min.js'])
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(project.js));
});

gulp.task('css', function() {
  return gulp.src(project.stylesheets + '/*.scss')
        .pipe(compass({
            css: project.css,
            sass: project.stylesheets
        }))
        .pipe(gulp.dest(project.css))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(project.css));
});

/**
 * Default task
 */
gulp.task('default', ['libjs', 'libcss', 'js', 'css']);

/**
 * Watch task
 */
gulp.task('watch', function() {
    gulp.watch(project.scripts + '/*.js', ['js']);
    gulp.watch(project.stylesheets + '/*.scss', ['css']);
});