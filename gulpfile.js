(function() {
  var gulp   = require('gulp')
    , browserify = require('gulp-browserify')
    // , uglify = require('gulp-uglify')
    , rename = require('gulp-rename');
   
  var getProjectName = function() {
    return require('./package.json').name;
  };

  gulp.task('watch', function() {
    gulp.watch('./app/main.js', ['browserify']);
  })

  gulp.task('browserify', function() {
    return gulp.src('./app/main.js')  
      .pipe(browserify({
        insertGlobals : false
      }))
      .pipe(rename('bundle.js'))
      .pipe(gulp.dest('./app'));
  })

  // gulp.task('uglify', function() {
  //   return gulp.src('./app/bundle.js')  
  //     .pipe(uglify({mangle:false}))
  //     .pipe(gulp.dest('./app/dest'));
  // })


  gulp.task('default', ['watch']);
})()
