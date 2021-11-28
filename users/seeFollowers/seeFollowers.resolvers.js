import client from "../../client"

export default {
    Query: {
        seeFollowers: async(_,{username, page}) => {
            const ok = await client.user.findUnique({where:{username}, select:{id:true}});
            if(!ok){
                return {
                    ok: false,
                    error: "User not found."
                }
            }
            const followers = await client.user.findUnique({where:{username}}).followers({skip:(page-1)*5, take:5});
            const totalFollowers = await client.user.count({where:{followings: {some:{username}} }});
            return {
                ok: true,
                followers,
                totalPages: Math.ceil(totalFollowers / 5)
            };
        },
    },
}