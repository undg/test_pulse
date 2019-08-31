## Init
1. Clone or fork repo
```
git clone https://github.com/und3rdg/test_pulse.git
```

2. Install all node packages
```
npm i
```

If you don't have a time for that you can check it online:
http://player-card.undg.xyz/



## Usage

* `npm start` - run gulp in browserSync mode (check last lines in gulpfile.js for more info) / alias [npm run bs]
    It will create local server on address localhost:4000 and localhost:40001 (tools)

* `npm run dev` - run gulp in dev mode (without hot reload) / alias [npm run watch]

* `npm run prod` - run gulp in default mode (compile code for production)

* `npm test` - run test in watch mode

* `npm run test:once` - run test once




## githooks:

* pre-commit -  run tests and compile code for production. Normaly I have more stuff in git hooks.



## Tests
* mocha/chai/jsdom



## Compiler
* es6: babel + browserify with caching
* SCSS with autoprefixing, optimizing and all usual good stuff
* source maps only in dev mode

