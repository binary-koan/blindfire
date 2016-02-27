import buffer from "vinyl-buffer";
import source from "vinyl-source-stream";

import { watchify } from "./helpers/browserify";

export default function(gulp, $, config) {
  const handleErrors = $.notify.onError("<%= error.message %>");

  const { dirs, files } = config;

  let watcher;

  gulp.task("dev:scripts", ["dev:lint"], () => {
    watcher = watcher || watchify(config.browserify);

    return watcher.bundle()
      .on("error", handleErrors)
      .pipe(source('game.js'))
      .pipe(buffer())
      .pipe(gulp.dest(dirs.build));
  });

  gulp.task("dev:copy-phaser", () =>
    gulp.src([files.phaser])
      .pipe($.rename("phaser.js"))
      .pipe(gulp.dest(dirs.build))
  );

  // gulp.task("dev:watch", () =>
  //   gulp.watch(files.scripts, ["dev:scripts"])
  // );

  gulp.task("dev:lint", () =>
    gulp.src([files.scripts])
      .pipe($.cached("dev:lint"))
      .pipe($.eslint())
      .pipe($.eslint.format("stylish", process.stderr))
  );

  gulp.task("dev", ["dev:copy-phaser", "dev:scripts"]);
};
