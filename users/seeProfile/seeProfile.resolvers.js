import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
    Query: {
        seeProfile: (_, {username}) => client.user.findUnique({where: {username}}),
    }
}