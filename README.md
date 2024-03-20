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

Clone the repository and run:

```shell
yarn
```

## Tests

### Running tests

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
yarn test:coverage
```

You can then find a more detailed coverage report by opening the following file in a browser:

 `tsp-typescript-client/coverage/lcov-report/index.html`

[contributing]: CONTRIBUTING.md
[protocol]: https://github.com/eclipse-cdt-cloud/trace-server-protocol

## Release/publish

Publishing this repository's npm package and creating a corresponding GitHub release with git tag (latest only), all happen on GitHub CI.

### Publish next package

A `next` package is automatically published to `npm` every time a PR is merged.

### Publish latest / release

Whenever a new release is desired, including publishing a corresponding `latest` package to `npm`, it can be triggered through a PR. The following has to be done:

Create a new branch for your PR. e.g.

```bash
git branch new-release && git checkout new-release
```

Then decide if the release shall be a `Major`, `Minor` or `Patch` release and use the corresponding command below to step the package's version, according to the release type. A new release commit will be created:

``` bash
yarn version:major
# or
yarn version:minor
# or
yarn version:patch
```

Modify the _version tag_ in file `./RELEASE`, to match the new release. Then amend the release commit to include this change:

```bash
<edit ./RELEASES to update tag>
git add RELEASE && git commit --amend
```

Finally, push the branch and use it to create a PR. When the PR is merged, a GitHub release should be created with auto-generated release notes, as well as a git tag. Then the `publish-latest` CI job should trigger and if everything goes well, publish the new version of the repo's package to `npm`.
