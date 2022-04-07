# tsp-typescript-client

Client-side implementation, in typescript, of the [Trace Server Protocol][protocol].

> Notice: this implementation is currently in the "Works on my computer" phase. Testing will come soon.

**👋 Want to help?** Read our [contributor guide][contributing].

## Installation

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
