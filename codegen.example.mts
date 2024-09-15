import { type CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  ignoreNoDocuments: true,
  // TODO: provide your own CDN key and target ID
  schema: {
    "<TODO: add schema SDL CDN URL>": {
      headers: {
        "X-Hive-CDN-Key": "<TODO: add cdn access key>",
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
