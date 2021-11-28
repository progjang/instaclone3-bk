import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
    Mutation: {
        followUser: protectedResolver( async(_, {username}, {loggedInUser}) => {
            const ok = await client.user.findUnique({where: {username}});
            if(!ok) {
                return {
                    ok: false,
                    error: "Couldnt find the username."
                };
            }
            await client.user.update({
                where: {id: loggedInUser.id},
                data: {
                    followings:{
                        connect:{
                            username
                        }
                    }
                }
            });
            return {
                ok: true,
            }
        })//protectedResolver End
    }
}