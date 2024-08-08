import { type CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  ignoreNoDocuments: true,
  // TODO: provide your own CDN key and target ID
  schema: {
    "http://localhost:8082/artifacts/v1/<TODO: target-id>/sdl.graphql": {
      headers: {
        "X-Hive-CDN-Key": "<TODO: Provide Key>",
      },
    },
  },
  generates: {
    "./example-app/src/graphql/": {
      documents: ["./example-app/src/**/*.tsx"],
      preset: "client",
      plugins: [],
      config: {
        useTypeImports: true,
        documentMode: "string",
      },
      presetConfig: {
        // TODO: enable persisted document generation
        // persistedDocuments: true,
      },
    },
    "./schema.graphqls": {
      plugins: ["schema-ast"],
      config: {
        includeDirectives: true,
      },
    },
  },
};

export default config;
