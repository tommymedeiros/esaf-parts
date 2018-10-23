/* gulpfile.js
 * Criado por Tommy Medeiros */

var cached        = require("gulp-cached"),
    // cleanhtml     = require("gulp-cleanhtml"),
    // coffee        = require("gulp-coffee"),
    concat        = require("gulp-concat"),
    // ext           = require("gulp-ext"),
    ftp           = require("gulp-ftp"),
    gulp          = require("gulp"),
    gutil         = require("gulp-util"),
    // haml          = require("gulp-ruby-haml"),
    imagemin      = require("gulp-imagemin"),
    plumber       = require("gulp-plumber"),
    sass          = require("gulp-ruby-sass"),
    uglify        = require("gulp-uglify"),
    path          = {
          layout: ["layout/*"],
           style: ["style/*",
                   "style/**/*"],
             pix: ["pix/*",
                   "pix/**/*"],
      javascript: ["javascript/vendor/fittext.js",
                   "javascript/carousel.js",
                   "javascript/esaf.js"],
           local: "P:/Moodle_2 ESAF/temas/esaf/",
             ftp: "/www/brincadeiras/theme/esaf/"
    },
    onError = function(err) {
      gutil.beep();
      console.log(err);
    };

// Compila o Haml e otimiza o PHP dos componentes
gulp.task("layout", function() {
  return gulp.src(path.local + path.layout)
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(cached("gulp_cache"))
    // .pipe(haml({
    //   doubleQuote: true}))
    // .pipe(cleanhtml())
    // .pipe(ext.replace("php"))
    // .pipe(gulp.dest(path.local + "/layout"))
    .pipe(ftp({
      host: "moodle27.bhe.serpro",
      user: "unise",
      pass: "unise",
      remotePath: path.ftp + "layout"
    }));
});

// Compila o Sass e otimiza as folhas de estilo
gulp.task("style", function() {
  return gulp.src(path.style)
    .pipe(plumber({
      errorHandler: onError
    }))
    // .pipe(cached("gulp_cache"))
    .pipe(sass({
      cacheLocation: "sass_cache",
      style: "compressed",
      sourcemap: false,
      trace: true
    }))
    .pipe(concat("esaf.css"))
    .pipe(gulp.dest(path.local + "style"))
    .pipe(ftp({
      host: "moodle27.bhe.serpro",
      user: "unise",
      pass: "unise",
      remotePath: path.ftp + "style"
    }));
});

// Compila o CoffeeScript
gulp.task("javascript", function() {
  return gulp.src(path.javascript)
    .pipe(plumber({
      errorHandler: onError
    }))
    // .pipe(cached("gulp_cache")) // A remover em caso de concatenacao
    // .pipe(coffee({
    //   bare: true
    // }))
    .pipe(uglify())
    .pipe(concat("esaf.js"))
    .pipe(gulp.dest(path.local + "javascript"))
    .pipe(ftp({
      host: "moodle27.bhe.serpro",
      user: "unise",
      pass: "unise",
      remotePath: path.ftp + "javascript"
    }));
});

// Otimiza as imagens
// gulp.task("pix", function() {
//   return gulp.src(path.pix)
//     .pipe(plumber({
//       errorHandler: onError
//     }))
//     .pipe(cached("gulp_cache"))
//     .pipe(imagemin())
//     .pipe(gulp.dest(path.local + "pix"))
//     .pipe(ftp({
//      host: "moodle27.bhe.serpro",
//      user: "unise",
//      pass: "unise",
//      remotePath: path.ftp + "pix"
//     }));
// });

// Observa alteracoes e roda tarefas
gulp.task("watch", function() {
    // gulp.watch(path.layout, ["layout"]);
    gulp.watch(path.local + path.layout, ["layout"]);
    gulp.watch(path.style, ["style"]);
    gulp.watch(path.javascript, ["javascript"]);
    // gulp.watch(path.local + path.javascript, ["javascript"]);
    // gulp.watch(path.pix, ["pix"]);
  }
);

// Tarefa padrao
gulp.task("default", ["layout",
                      "style",
                      "javascript",
                      // "pix",
                      "watch"]);
