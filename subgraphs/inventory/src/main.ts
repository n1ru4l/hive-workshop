import { parse } from "graphql";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { createYoga } from "graphql-yoga";
import { createServer } from "node:http";

const typeDefs = parse(/* GraphQL */ `
  extend type Product @key(fields: "upc") {
    upc: String! @external
    weight: Int @external
    price: Int @external
    inStock: Boolean
    shippingEstimate: Int @requires(fields: "price weight")
  }
`);

const inventory = [
  { upc: "1", inStock: true },
  { upc: "2", inStock: false },
  { upc: "3", inStock: true },
];

type Inventory = (typeof inventory)[number];
type Product = {
  price: number;
  weight: number;
  upc: string;
};

type Context = {
  inventory: Inventory[];
};

const resolvers = {
  Product: {
    __resolveReference(object: Product, context: Context) {
      return {
        ...object,
        ...context.inventory.find((product) => product.upc === object.upc),
      };
    },
    shippingEstimate(object: Product) {
      // free for expensive items
      if (object.price && object.price > 1000) return 0;
      // estimate is based on weight
      const estimate = object.weight ? object.weight * 0.5 : 0;
      if (!isNaN(estimate)) return estimate;
      return 0;
    },
  },
};

const yoga = createYoga<Context>({
  schema: buildSubgraphSchema([{ typeDefs, resolvers }]),
  context() {
    return { inventory };
  },
  landingPage: false,
  graphqlEndpoint: "/",
  graphiql: {
    title: "Inventory Subgraph",
  },
});

const server = createServer(yoga);

server.listen(7002, () => {
  console.log(`🚀 Server ready at http://localhost:7002`);
});
