# Local Hive instance

This folder contains the docker compose file for running GraphQL Hive on your own machine.

You can start the whole stack via the following command.

```sh
docker compose up
```

Then visit `http://localhost:8080` for the Hive dashboard.

## CLI configuration

By default, the Hive CLI will use the cloud registry.
We have to explicitly configure the CLI to use the local endpoint.

**hive.json**

```json
{
  "registry": {
    "endpoint": "http://localhost:8082/graphql"
  }
}
```
