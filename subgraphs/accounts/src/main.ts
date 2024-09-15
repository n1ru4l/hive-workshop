import { parse } from "graphql";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { createYoga } from "graphql-yoga";
import { createServer } from "node:http";

const typeDefs = parse(/* GraphQL */ `
  extend type Query {
    me: User
    user(id: ID!): User
    users: [User]
  }

  type User @key(fields: "id") {
    id: ID!
    name: String
    username: String
  }
`);

const users = [
  {
    id: "1",
    name: "Ada Lovelace",
    birthDate: "1815-12-10",
    username: "@ada",
  },
  {
    id: "2",
    name: "Alan Turing",
    birthDate: "1912-06-23",
    username: "@complete",
  },
];

type User = (typeof users)[number];

type Context = {
  users: User[];
};

const resolvers = {
  User: {
    __resolveReference(user: User, context: Context) {
      return { ...user, ...context.users.find((u) => u.id === user.id) };
    },
  },
  Query: {
    me(_: unknown, __: unknown, context: Context) {
      return context.users[0];
    },
    users(_: unknown, __: unknown, context: Context) {
      return context.users;
    },
    user(_: unknown, args: { id: string }, context: Context) {
      return context.users.find((user) => user.id === args.id);
    },
  },
};

const yoga = createYoga<Context>({
  schema: buildSubgraphSchema([{ typeDefs, resolvers }]),
  context() {
    return { users };
  },
  landingPage: false,
  graphqlEndpoint: "/",
  graphiql: {
    title: "Accounts Subgraph",
  },
});

const server = createServer(yoga);

server.listen(7001, () => {
  console.log(`🚀 Server ready at http://localhost:7001`);
});
