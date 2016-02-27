import { isFunction, map, values } from "lodash";
import gulp from "gulp";
import pluginLoader from "gulp-load-plugins";
import requireDir from "require-dir";
const plugins = pluginLoader();

import * as config from "./tasks/config";
const tasks = map(requireDir("./tasks"), "default");

values(tasks).filter(isFunction).forEach(task => task(gulp, plugins, config));

gulp.task("default", ["dev"]);
