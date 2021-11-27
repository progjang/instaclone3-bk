require("dotenv").config();
const { ApolloServerPluginLandingPageGraphQLPlayground } = require("apollo-server-core");
const { ApolloServer, gql } = require('apollo-server');
import schema from "./schema";
import { getUser } from "./users/users.utils";

// The GraphQL schema


// A map of functions which return data for the schema.

const server = new ApolloServer({
  schema,
  context: async({req}) => {
    return {
      loggedInUser: await getUser(req.headers.token),
    };
  },
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

const PORT = process.env.PORT;
server.listen(PORT).then(() => {
  console.log(`🚀 Server ready at ${PORT}`);
});