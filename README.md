## DEVELOPMENT source files
1. Clone or fork repo
```
git clone https://github.com/und3rdg/test_pulse.git
```

2. Install all node packages
```
npm install
```

2. Run dev server http://localhost:4000/ 
```
npm start
```


If you don't have a time for that you can check it online:
http://player-card.undg.xyz/


## PRODUCTION  quick instalation

Install it like any other library.
```
npm install @undg/player-card
```

Import it to your javascript files

```
import '@undg/player-card'
```

In index.html you need:

```
<div
    data-StatCard
    data-api_url="node_modules/@undg/player-card/api/player-stats.json"
    data-img_url="node_modules/@undg/player-card/assets/img/"
></div>
```

and styles (probably you can import it to webpack instead)

```
<link rel="stylesheet" media="screen" href="node_modules/@undg/player-card/dist/css/style.css" />
```

## Usage

* `npm start` - run gulp in browserSync mode (check last lines in gulpfile.js for more info) / alias [npm run bs]
    It will create local server on address localhost:4000 and localhost:40001 (tools)

* `npm run dev` - run gulp in dev mode (without hot reload) / alias [npm run watch]

* `npm run prod` - run gulp in default mode (compile code for production)

* `npm test` - run test in watch mode

* `npm run test:once` - run test once




## githooks:

They are installed automatically. With help of `husky` I can push them to repository and  be sure that certain tasks are not skipped during development.

* pre-commit -  run tests and compile code for production.
* pre-push -  empty file. Normally I have more stuff in git hooks.



## Tests
* mocha/chai/jsdom



## Compiler

* es6: babel + browserify with caching
* source maps only in dev mode
* SCSS with autoprefixing, optimizing and all usual good stuff

