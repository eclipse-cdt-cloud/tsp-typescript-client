# tsp-typescript-client

Client-side implementation, in typescript, of the [Trace Server Protocol][protocol].

> Notice: this implementation is currently in the "Works on my computer" phase. Testing will come soon.

**👋 Want to help?** Read our [contributor guide][contributing].

## Build from sources

### Prerequisites

First, you need Node.js and yarn:

It's suggested to install [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) to manage node on your machine. Once that's done, install the required version:

```bash
   nvm install 18
   # optional: make it the default version
   nvm alias default
   # or set it every time like so
   nvm use 18
```

Then install `yarn`:

```bash
npm i -g yarn  # the default version should be ok
```

### Building

Clone the repository and run (with Yarn):

```shell
yarn
```

## Tests

To run tests once, at the root of the project do:

```shell
yarn test --verbose
```

To keep tests running do:

```shell
yarn test --verbose --watch
```

### Test coverage

The following command prints a coverage report to the terminal. As of now it covers all typescript files of the project, including those that are not supposed to have tests.

```shell
yarn test --coverage --collectCoverageFrom='src/**/*.ts'
```

[contributing]: CONTRIBUTING.md
[protocol]: https://github.com/eclipse-cdt-cloud/trace-server-protocol
