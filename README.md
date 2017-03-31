# AuthPlz-UI

A frontend package for the [AuthPlz](https://github.com/ryankurte/authplz) User Management / Authentication / Authorization Microservice. This is intended to provide a base template for AuthPlz implementations.

Built using [React](https://facebook.github.io/react/) and [Webpack](https://webpack.github.io/).

If you would like to be involved with this project, please first read (and agree to abide by) the [Code of Conduct](https://github.com/ryankurte/authplz-ui/blob/master/CONDUCT.md), then go ahead and join the chat on [Gitter](https://gitter.im/authplz/Lobby) or [open an issue](https://github.com/ryankurte/authplz-ui/issues/new).

## Status

Early WIP. Not very useful at all.

## Dependencies

- [Node/NPM](https://nodejs.org/en/)
- Make (but you could just run the commands from the [makefile](makefile) yourself)

## Getting started

1. Check out this repo
2. Run `make install` to install dependencies
3. Run `make build` to build the application
4. [Optionally] run `make minified` to build the minified application

## Usage

Pre-compiled packages are available [here](https://github.com/ryankurte/authplz-ui/releases) for tagged releases.

Precompiled or local development instances can be run against via authplz using `./authplz --static-dir=$(pwd)` (with the correct path to the authplz instance)


------

If you have any questions, comments, or suggestions, feel free to contact us (uhh, me) on gitter or to open an issue or a pull request.
