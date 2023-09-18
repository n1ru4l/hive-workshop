# GraphQL Hive Workshop

## Prerequisites

- Install Docker on your machine
- Install Node.js on your machine
- Install pnpm on your machine

## Install dependencies

```bash
pnpm install
```

## Diff Schemas with GraphQL Inspector

### Add new Field

```bash
pnpm graphql-inspector diff \
  inspector-schemas/add-new-field-before.graphql \
  inspector-schemas/add-new-field-after.graphql
```

### Make Field Type Nullable

```bash
pnpm graphql-inspector diff \
  inspector-schemas/make-field-type-nullable-before.graphql \
  inspector-schemas/make-field-type-nullable-after.graphql
```

### Make Field Non-Type Nullable

```bash
pnpm graphql-inspector diff \
  inspector-schemas/make-field-type-non-nullable-before.graphql \
  inspector-schemas/make-field-type-non-nullable-after.graphql
```

### Change Field Type

```bash
pnpm graphql-inspector diff \
  inspector-schemas/cha
nge-field-type-before.graphql \
  inspector-schemas/change-field-type-after.graphql
```

## Starting Hive

```bash
pnpm run start:hive
```

## Start Subgraphs

```bash
pnpm run start:subgraphs
```

## Publish Subgraphs

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
HIVE_CDN_ENDPOINT="http://localhost:8082/artifacts/v1/a198c4ee-da66-40ef-8d62-f81d9e22e74c" \
  HIVE_CDN_KEY="hv2MjYyYWEwNmYtNzc5MS00N2VjLTkxNDEtZDBjOGVmNjE5NmQ3OjY1MzU5ODliNGZlMWE2YjgzOWYwOTYxZGIxMjgwZWRjY2I0NDExZWU=" \
  ./router --dev
```

## Run Apollo Router with Usage Reporting

```bash
HIVE_TOKEN="de5eeba3e25fb5b969d721ae85bb0363" \
  HIVE_ENDPOINT="http://localhost:8081" \
  HIVE_CDN_ENDPOINT="http://localhost:8082/artifacts/v1/a198c4ee-da66-40ef-8d62-f81d9e22e74c" \
  HIVE_CDN_KEY="hv2MjYyYWEwNmYtNzc5MS00N2VjLTkxNDEtZDBjOGVmNjE5NmQ3OjY1MzU5ODliNGZlMWE2YjgzOWYwOTYxZGIxMjgwZWRjY2I0NDExZWU=" \
  ./router --dev --config supergraph.yaml
```

## Further Links

- [Hive CLI GitHub Integration example](https://github.com/n1ru4l/hive-github-workflow-example)
- [GraphQL Hive documentation](https://the-guild.dev/graphql/hive/docs)
- [GraphQL Hive Self-Hosting documentation](https://the-guild.dev/graphql/hive/docs/self-hosting/get-started)
