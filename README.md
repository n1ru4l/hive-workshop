# GraphQL Hive Workshop

This repository contains the material used in the GraphQL Hive Workshop at GraphQL Conf 2024.

For this workshop you will run your own local GraphQL Hive instance using Docker.

## Prerequisites

- Install Docker on your machine
- Install Node.js on your machine
- Install pnpm on your machine

## Install dependencies

```bash
pnpm install
```

## Start local GraphQL Hive instance

```bash
cd graphql-hive
docker compose up
```

Visit `http://localhost:8080`

## Sign up, create an organization and project

Follow https://the-guild.dev/graphql/hive/docs/get-started/first-steps for signing up, creating your organization and create a "Federation" project.

## Create registry access token

## Publish Subgraphs

Run these commands for publishing each subgraph to the GraphQL Hive schema registry.

### `accounts`

```bash
npx hive schema:publish \
  --service accounts \
  --url http://localhost:7001 \
  ./subgraphs/accounts/src/main.ts
```

### `inventory`

```bash
npx hive schema:publish \
  --service inventory \
  --url http://localhost:7002 \
  ./subgraphs/inventory/src/main.ts
```

### `products`

```bash
npx hive schema:publish \
  --service products \
  --url http://localhost:7003 \
  ./subgraphs/products/src/main.ts
```

### `reviews`

```bash
npx hive schema:publish \
  --service reviews \
  --url http://localhost:7004 \
  ./subgraphs/reviews/src/main.ts
```

### `echo`

```bash
npx hive schema:publish \
  --service echo \
  --url http://localhost:7005 \
  ./subgraphs/echo/src/main.ts
```
