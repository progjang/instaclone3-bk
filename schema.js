import {loadFilesSync} from "@graphql-tools/load-files";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { makeExecutableSchema } from "@graphql-tools/schema";

const loadedTypeDefs = loadFilesSync(`${__dirname}/**/*.typeDefs.js`);
const loadedResolvers = loadFilesSync(`${__dirname}/**/*.{queries,mutations}.js`);

const typeDefs = mergeTypeDefs(loadedTypeDefs);
const resolvers = mergeResolvers(loadedResolvers);
console.log(resolvers);

const schema = makeExecutableSchema({typeDefs, resolvers});

export default schema;
