import { gql } from "apollo-server";

export default gql`
    type User {
        id: Int!
        firstName: String!
        lastName: String
        username: String!
        email: String!
        bio: String
        avatar: String
        followings: [User]
        followers: [User]
        createdAt: String!
        updatedAt: String!
    }
    type Mutation {
        createUser(firstName:String! lastName:String username:String! email:String! password:String!): User    
    }
`;