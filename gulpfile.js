var gulp    = require("gulp"),
    sass    = require("gulp-sass"),
    concat  = require("gulp-concat"),
    uglify  = require("gulp-uglify"),
    nodemon = require("gulp-nodemon")
    pump    = require("pump");


gulp.task(".min.js", function(cb){
    pump([
        gulp.src("./src/*.js"),
        uglify(),
        concat("invasion.min.js"),
        gulp.dest("./dist")
    ], cb);
}); 


gulp.task("default", function(){
    nodemon({
        tasks: [".min.js"],
        ext: "js html",
        script: "server.js"
    });
});