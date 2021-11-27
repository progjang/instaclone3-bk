import { gql } from "apollo-server";

export default gql`
    type EditProfileResult {
        ok: Boolean!
        error: String
    }

    type Mutation {
        editProfile(
            firstName: String
            lastName: String
            username: String
            password: String
            email: String
        ): EditProfileResult!
    }
`;