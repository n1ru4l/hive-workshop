import { defineConfig } from "@graphql-hive/gateway";

export const gatewayConfig = defineConfig({
  // supergraph: {
  //   type: "hive",
  //   endpoint: "<TODO: Add supergraph CDN endpoint>",
  //   key: "<TODO: Add CDN access key>",
  // },
  // reporting: {
  //   type: "hive",
  //   token: "<TODO: Add reporting access key>",
  //   enabled: true,
  //   selfHosting: {
  //     applicationUrl: "http://localhost:8080",
  //     graphqlEndpoint: "http://localhost:8082/graphql",
  //     usageEndpoint: "http://localhost:8081",
  //   },
  // },
  // persistedDocuments: {
  //   type: "hive",
  //   endpoint: "<TODO: Add target CDN endpoint>",
  //   token: "<TODO: Add reporting access key>",
  // },
});
