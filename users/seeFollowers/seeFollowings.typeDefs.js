import { gql } from "apollo-server-express";

export default gql`
    type SeeFollowingsResult {
        ok:Boolean!
        error:String
        followings: [User]
        totalPages: Int
    } 

    type Query {
        seeFollowings(username:String! page:Int): SeeFollowingsResult!
}
`