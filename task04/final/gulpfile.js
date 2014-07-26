var gulp = require('gulp'),
     gutil=require('gulp-util'),
	 less=require('gulp-less'),
	 path=require('path'),
	 uglify=require('gulp-uglify'),
	 concat=require('gulp-concat'),
	 coffee=require('gulp-coffee'),
	 livereload = require('gulp-livereload'),
	 lr = require('tiny-lr'),
	 server = lr();
	

var jsSources = [
	'components/scripts/common.js',
	'components/scripts/*.js'
];

var lessSources = [
	'components/less/*.less'	
];	

var coffeeSources = [
	'components/coffee/*.coffee'	
];	
	 
gulp.task('js',function(){
     gulp.src(jsSources)
     .pipe(uglify())
	 .pipe(concat('script.js'))
	 .pipe(gulp.dest('js'));

});

gulp.task('less',function(){
      gulp.src(lessSources)
      .pipe(less({
	  paths: [ path.join(__dirname, 'components/less')]
	  }  
	  )
	  .on('error',gutil.log))
     
	 .pipe(concat('style.css'))
	 .pipe(gulp.dest('css'))
	 .pipe(livereload());

});

gulp.task('coffee',function(){
     gulp.src(coffeeSources)
     .pipe(coffee({bare:true}).on('error',gutil.log)
	 )
	 
	 .pipe(gulp.dest('components/scripts'));
	 
	 //.pipe(livereload());

});

gulp.task('coffee', function() {
	gulp.src(coffeeSources)
		.pipe(coffee({ bare: true})
			.on( 'error', gutil.log))
		.pipe(gulp.dest('components/scripts'));
});



gulp.task('watch',function(){
var server= livereload();
gulp.watch(jsSources,['js']);
gulp.watch(lessSources,['less']);
gulp.watch(coffeeSources,['coffee']);
gulp.watch(['js/script.js','*.html'],function(e){
server.changed(e.path);
});


});
gulp.task('default' , ['less','coffee','js','watch']);