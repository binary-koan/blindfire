// Where this project source code lives.
const SRC = "src/app";

// Where final distribution files will be copied.
const DIST = "dist";

// Where compiled scripts will be placed.
const BUILD = "build";

// Where static assets (textures, fonts, sprites, sounds etc.) live.
const STATIC = "static";

// Which Phaser build was selected to develop the game.
const PHASER = "node_modules/phaser/build/custom/phaser-arcade-physics.js";

export const dirs = { build: BUILD, dist: DIST };

export const files = {
  assets: `${STATIC}/**`,
  scripts: `${SRC}/**/*.js`,
  phaser: PHASER
};

export const browserify = {
  debug: true,
  standalone: "app",
  entries: [`${SRC}/app.js`],
  transform: ["babelify"]
};
