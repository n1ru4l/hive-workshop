import { parse } from "graphql";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { createYoga, createPubSub } from "graphql-yoga";
import { createServer } from "node:http";

const typeDefs = parse(/* GraphQL */ `
  type Query {
    echo(message: String!): String!
  }

  type Mutation {
    broadcast(message: String!): String
  }

  type Subscription {
    broadcasts: String!
  }
`);

const pubSub = createPubSub<{
  broadcast: [string];
}>();

const resolvers = {
  Query: {
    echo(_: unknown, args: { message: string }) {
      return args.message;
    },
  },
  Mutation: {
    broadcast(_: unknown, args: { message: string }) {
      console.log(args.message);
      pubSub.publish("broadcast", args.message);
      return args.message;
    },
  },
  Subscription: {
    broadcasts: {
      subscribe: () => pubSub.subscribe("broadcast"),
      resolve: (payload: string) => payload,
    },
  },
};

const yoga = createYoga({
  schema: buildSubgraphSchema([{ typeDefs, resolvers }]),
  landingPage: false,
  graphqlEndpoint: "/",
  graphiql: {
    title: "Echo Subgraph",
  },
});

const server = createServer(yoga);

server.listen(7005, () => {
  console.log(`🚀 Server ready at http://localhost:7005`);
});
