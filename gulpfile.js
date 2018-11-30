var gulp = require('gulp');  
var concat = require('gulp-concat');

gulp.task( 'default', [ 'scripts' ], function () {
    gulp.watch(['./src/*.js', './src/gameplay/*.js'], function() {
      gulp.run('scripts');
  });
});

gulp.task('scripts', function() {
  gulp.src(['./src/*.js', './src/gameplay/*.js'])
    .pipe(concat('game.js'))
    .pipe(gulp.dest('./build/'))
});