# ensemble

[![Release](https://img.shields.io/github/v/release/franck-paul/ensemble)](https://github.com/franck-paul/ensemble/releases)
[![Date](https://img.shields.io/github/release-date/franck-paul/ensemble)](https://github.com/franck-paul/ensemble/releases)
[![Issues](https://img.shields.io/github/issues/franck-paul/ensemble)](https://github.com/franck-paul/ensemble/issues)
[![Dotclear](https://img.shields.io/badge/dotclear-v2.25-dev-blue.svg)](https://fr.dotclear.org/download)
[![License](https://img.shields.io/github/license/franck-paul/ensemble)](https://github.com/franck-paul/ensemble/blob/master/LICENSE)

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
