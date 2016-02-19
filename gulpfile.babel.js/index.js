import { map, values } from "lodash";
import gulp from "gulp";
import pluginLoader from "gulp-load-plugins";
import requireDir from "require-dir";
const plugins = pluginLoader();

import * as config from "./config";
const tasks = map(requireDir("./tasks"), "default");

values(tasks).forEach(task => task(gulp, plugins, config));

gulp.task("default", ["dev"]);
