// generated on 2016-06-09 using generator-webapp 2.1.0
const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const browserSync = require('browser-sync');
const del = require('del');
const wiredep = require('wiredep').stream;
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const reactify = require('reactify');
const factor = require('factor-bundle');
const glob = require('glob'),
      rename = require('gulp-rename'),
      es = require('event-stream')
      ;


const $ = gulpLoadPlugins();
const reload = browserSync.reload;

// gulp.task('browserify',['scripts'],function(){
//   return browserify({
//       entries: ['app/scripts/components/app.js','app/scripts/components/bussiness-operate.js'],
//       dubug: true,
//       }
//     )
//     .transform(reactify)
//     .plugin(factor, {
//         o: ['.tmp/scripts/components/app.js','.tmp/scripts/components/bussiness-operate.js']
//     })
//     .bundle()

// });
gulp.task('browserify', function(done) {
    glob('app/scripts/components/*.js', function(err, files) {
        if(err) done(err);

        var tasks = files.map(function(entry) {
            return browserify({ entries: [entry],base:'app/'})
                .transform(reactify)
                .bundle()
                .pipe(source(entry))
               .pipe(rename({
                    extname: '.bundle.js'
                }))
                .pipe(gulp.dest('.tmp/'));
            });
        es.merge(tasks).on('end', done);
    })
});
// gulp.task('browserify',function(){
//   return browserify('app/components/app.js')

//     .transform(reactify)
//     .bundle()

//     .pipe(source('app.js'))
//     .pipe(gulp.dest('app/scripts/bundle/'))

// });
// gulp.task('copyBundle',['browserify'], function(){
//     return gulp.src('app/scripts/bundle/*.js')
//       .pipe(gulp.dest('dist/scripts/bundle/'))
//       .pipe(gulp.dest('.tmp/scripts/bundle/'))
// })
gulp.task('styles',  () => {
  return gulp.src('app/styles/*.css')
    .pipe($.sourcemaps.init())
    .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('./.tmp/styles'))
    .pipe(reload({stream: true}));
});

gulp.task('scripts',['browserify'], () => {
  return gulp.src(['app/scripts/**/*.{js,jsx}'])
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.babel({
      presets:['es2015'],
      presets:['react'],
      plugins:['transform-runtime']
    }))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('.tmp/scripts'))
    .pipe(reload({stream: true}));
});

function lint(files, options) {
  return gulp.src(files)
    .pipe(reload({stream: true, once: true}))
    .pipe($.eslint(options))
    .pipe($.eslint.format())
    .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
}

gulp.task('lint', ['scripts'],() => {
  return lint('app/scripts/**/*.js', {
    fix: true
  })
    .pipe(gulp.dest('app/scripts'));
});
gulp.task('lint:test', () => {
  return lint('test/spec/**/*.js', {
    fix: true,
    env: {
      mocha: true
    }
  })
    .pipe(gulp.dest('test/spec/**/*.js'));
});

gulp.task('html', ['styles', 'scripts'], () => {
  return gulp.src('app/*.html')
    .pipe($.useref({searchPath: ['.tmp', 'app', '.']}))
    .pipe($.if('**/*.{js,jsx}', $.uglify()))
    .pipe($.if('*.css', $.cssnano({safe: true, autoprefixer: false})))
    .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
    .pipe(gulp.dest('dist'));
});

gulp.task('images', () => {
  return gulp.src('app/images/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true,
      // don't remove IDs from SVGs, they are often used
      // as hooks for embedding and styling
      svgoPlugins: [{cleanupIDs: false}]
    })))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('fonts', () => {
  return gulp.src(require('main-bower-files')('**/*.{eot,svg,ttf,woff,woff2}', function (err) {})
    .concat('app/fonts/**/*'))
    .pipe(gulp.dest('.tmp/fonts'))
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('extras', () => {
  return gulp.src([
    'app/*.*',
    '!app/*.html'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('serve', ['styles', 'scripts', 'fonts'], () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['.tmp', 'app'],
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch([
    'app/*.html',
    'app/images/**/*',
    '.tmp/fonts/**/*',
    'app/data/**/*'
  ]).on('change', reload);

  gulp.watch('app/styles/**/*.css', ['styles']);
  gulp.watch('app/scripts/**/*.{js,jsx}', ['scripts']);
  gulp.watch('app/fonts/**/*', ['fonts']);
  gulp.watch('bower.json', ['wiredep', 'fonts']);
});

gulp.task('serve:dist', () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['dist']
    }
  });
});

gulp.task('serve:test', ['scripts'], () => {
  browserSync({
    notify: false,
    port: 9000,
    ui: false,
    server: {
      baseDir: 'test',
      routes: {
        '/scripts': '.tmp/scripts',
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch('app/scripts/**/*.{js,jsx}', ['scripts']);
  gulp.watch('test/spec/**/*.js').on('change', reload);
  gulp.watch('test/spec/**/*.js', ['lint:test']);
});

// inject bower components
gulp.task('wiredep', () => {
  gulp.src('app/*.html')
    .pipe(wiredep({
      exclude: ['bootstrap.js'],
      ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest('app'));
});

gulp.task('build', ['html', 'scripts', 'images', 'fonts','extras'], () => {
  return gulp.src('dist/**/*').pipe($.size({title: 'build'}));
});

gulp.task('default', ['clean'], () => {
  gulp.start('build');
});
