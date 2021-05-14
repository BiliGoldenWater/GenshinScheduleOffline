# genshin-web

This project was bootstrapped using [next.js](https://github.com/vercel/next.js/).

### Prerequisites

- [Node.JS 14+](https://nodejs.org/)
- [yarn 2+](https://yarnpkg.com/)

## Local development

To start a local development instance at: http://localhost:3000

```shell
# Install dependencies
yarn

# Start next.js dev server
yarn dev
```

## Production build

To start a production instance at: http://0.0.0.0:3000

```shell
# Install dependencies
yarn

# Compile project and static assets
yarn build

# Start next.js prod server
yarn start
```

This website uses `getServerSideProps` extensively, so it cannot be served by a static file server.

Refer to the [Dockerfile](../Dockerfile.web) which is a more advanced production build script.

## Environment variables

Compile-time variables:

- (optional) `NEXT_PUBLIC_API_PUBLIC` URL of the API server that is accessible from the internet. Defaults to `https://genshin.chiya.dev/api/v1`.
- (optional) `NEXT_PUBLIC_API_INTERNAL` URL of the API server that is accessible within the local network. This can be useful when running on Docker because requests will be handled faster. e.g. if the API service is named `genshin-sync`, set as `http://genshin-sync:5000`. Falls back to `NEXT_PUBLIC_API_PUBLIC` when not specified.


## Adding new game assets

When adding an image asset for a new item to the [assets](assets/game) folder, the asset index file should be regenerated using `yarn genassets` command.
