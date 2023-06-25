import "colors";
import { ApolloServer } from "apollo-server";
import { typeDefs } from "./schema.mjs";
import { resolvers } from "./resolvers.mjs";

const PORT = process.env.PORT || 4000;

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server.listen({ port: PORT }).then(({ url }) => {
  console.log('🚀  Server ready at'.green +` ${url}`.blue.bold)
  console.log('Query at'.magenta + ' https://studio.apollographql.com/dev'.yellow)
}).catch((err) => {
    console.log(`${err}`.red.bold);
});