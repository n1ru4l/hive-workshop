# GraphQL Hive Workshop

This repository contains the material used in the GraphQL Hive Workshop at GraphQL Conf 2023.

[You can find the workshop slides here.](https://speakerdeck.com/n1ru4l/graphql-hive-workshop)

The video for the workshop will be added later on as it is available on YouTube.

## Prerequisites

- Install Node.js on your machine
- Install pnpm on your machine

## Install dependencies

```bash
pnpm install
```

## Start Subgraphs

```bash
pnpm run start:subgraphs
```

## Publish Subgraphs

Don't forget to pass in the `--registry.accessToken` flag

### Echo

```bash
pnpm hive schema:publish \
  ./subgraphs/echo/src/main.ts \
   --service echo \
   --url http://localhost:7005
```

### Accounts

```bash
pnpm hive schema:publish \
  ./subgraphs/accounts/src/main.ts \
   --service accounts \
   --url http://localhost:7001
```

### Products

```bash
pnpm hive schema:check \
  ./subgraphs/products/src/main.ts \
   --service products

pnpm hive schema:publish \
  ./subgraphs/products/src/main.ts \
   --service products \
   --url http://localhost:7003
```

### Inventory

```bash
pnpm hive schema:check \
  ./subgraphs/inventory/src/main.ts \
   --service inventory

pnpm hive schema:publish \
  ./subgraphs/inventory/src/main.ts \
   --service inventory \
   --url http://localhost:7002
```

### Reviews

```bash
pnpm hive schema:check \
  ./subgraphs/reviews/src/main.ts \
   --service reviews

pnpm hive schema:publish \
  ./subgraphs/reviews/src/main.ts \
   --service reviews \
   --url http://localhost:7004
```

## Download Apollo Router

```bash
curl -fsSL https://graphql-hive.com/apollo-router-download.sh | bash
```

## Run Apollo Router

```bash
HIVE_CDN_ENDPOINT="http://localhost:8082/artifacts/v1/653d03a9-16c0-407d-ad26-78f5c10c76d8" \
  HIVE_CDN_KEY="hv2ODFlNDk0YzctMmQ1ZC00YzZkLWJhMmEtODYzYmI1MGYzODYyOjJkNzViZTk2MjVjMjUzOWQzMTZhZDc2NGU5Y2I3MDBhZGNlYjUwMWE=" \
  ./router --dev
```

## Run Apollo Router with Usage Reporting

```bash
HIVE_TOKEN="99c12887d40e9ad41aaa0e46677b064b" \
  HIVE_ENDPOINT="http://localhost:8081" \
  HIVE_CDN_ENDPOINT="http://localhost:8082/artifacts/v1/653d03a9-16c0-407d-ad26-78f5c10c76d8" \
  HIVE_CDN_KEY="hv2ODFlNDk0YzctMmQ1ZC00YzZkLWJhMmEtODYzYmI1MGYzODYyOjJkNzViZTk2MjVjMjUzOWQzMTZhZDc2NGU5Y2I3MDBhZGNlYjUwMWE=" \
  ./router --dev --config supergraph.yaml
```

## Further Links

- [Hive CLI GitHub Integration example](https://github.com/n1ru4l/hive-github-workflow-example)
- [GraphQL Hive documentation](https://the-guild.dev/graphql/hive/docs)
- [GraphQL Hive Self-Hosting documentation](https://the-guild.dev/graphql/hive/docs/self-hosting/get-started)
