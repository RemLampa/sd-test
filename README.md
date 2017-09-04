# Sleighdogs Test

### Initial setup

```bash
$ npm install
```

Note: Requires Python >= v.2.5.0 & < 3.0.0 (due to the use of `gyp` in creating responsive images).

### Development build

```bash
$ npm run dev
```

or

```bash
$ npm run dev:watch
```

This will generate an unminified `index.html` file in `/dev`.

### Production build

```bash
$ npm run build
```

This will generate a minified `index.html` file in `/dist`.

### To run dev server

```bash
$ npm start
```

Point browser to [`http://localhost:8080`](http://localhost:8080)

## To deploy to Github Pages

```bash
$ npm run deploy
```