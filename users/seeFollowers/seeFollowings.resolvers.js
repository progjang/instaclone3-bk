import client from "../../client"

export default {
    Query: {
        seeFollowings: async(_,{username, page}) => {
            const ok = await client.user.findUnique({where:{username}, select:{id:true}});
            if(!ok){
                return {
                    ok: false,
                    error: "User not found."
                }
            }
            const followings = await client.user.findUnique({where:{username}}).followings({skip:(page-1)*5, take:5});
            const totalFollowings = await client.user.count({where:{followers: {some:{username}} }});
            return {
                ok: true,
                followings,
                totalPages: Math.ceil(totalFollowings / 5)
            };
        },
    },
}