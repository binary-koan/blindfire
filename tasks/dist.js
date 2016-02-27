import del from "del";
import buffer from "vinyl-buffer";
import source from "vinyl-source-stream";

import { browserify } from "./helpers/browserify";

export default function(gulp, $, config) {
  const { dirs, files } = config;

  // Wipes `build` and `dist` directories before any task.
  gulp.task("dist:clean", () =>
    del([dirs.build, dirs.dist])
  );

  // Copies and minifies the Phaser build for distribution.
  gulp.task("dist:phaser", () =>
    gulp.src([files.phaser])
      .pipe($.rename("phaser.min.js"))
      .pipe($.uglify())
      .pipe($.sourcemaps.init())
      .pipe($.sourcemaps.write("."))
      .pipe(gulp.dest(dirs.dist))
  );

  // Bundle all scripts together for distribution.
  gulp.task("dist:scripts", ["dev:lint"], () =>
    bundler(config.bundle).bundle()
      .pipe(source("game.min.js"))
      .pipe(buffer())
      .pipe($.sourcemaps.init({ loadMaps: true }))
      .pipe($.uglify())
      .pipe($.sourcemaps.write("."))
      .pipe(gulp.dest(dirs.dist))
  );

  // Copy all required application assets into the final build directory.
  gulp.task("dist:assets", () => {
    var filterHTML = $.filter("*.html", { restore: true });

    return gulp.src(files.assets)
      .pipe(filterHTML)
      .pipe($.processhtml())
      .pipe(filterHTML.restore)
      .pipe(gulp.dest(dirs.dist));
  });

  // The main distribution task.
  gulp.task("dist", [ "dist:clean" ], (done) =>
    gulp.start(["dist:assets", "dist:phaser", "dist:scripts"], done)
  );
};
