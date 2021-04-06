# ensemble

Dotclear 2 theme

## Installation

Using Dotclear 2 common module installation procedures (DotAddict or manual installation).

For development (in order to build assets):

```
npm i
```

## Build

```
gulp build [--production]
```

## Make Dotclear package

```
gulp build --production
gulp pack
```

Package building will use some properties from `package.json`:

* name: will be used as folder name
* module: must be 'theme' or 'plugin'
* version: will be used in archive name
