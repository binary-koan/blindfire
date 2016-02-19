import { assign } from "lodash";
import browserifyBase from "browserify";
import watchifyBase from "watchify";

export function browserify(config) {
  return browserifyBase(assign({}, config));
}

export function watchify(config) {
  return watchifyBase(browserifyBase(assign({}, watchifyBase.args, config)));
}
