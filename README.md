# ensemble

Dotclear 2 theme

## Installation

Using Dotclear 2 theme/plugin installation procedures (via DotAddict or manual installation).

For development (in order to build assets):

```bash
npm i
```

## Build

```bash
npm run build
```

## Make Dotclear package

```bash
npm run pack
```

Package building will use some properties from `package.json`:

* name: will be used as folder name
* module: must be 'theme' or 'plugin'
* version: will be used in archive name

Notes:

* Use node v14
