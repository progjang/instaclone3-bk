import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
    Mutation: {
      unfollowUser: protectedResolver(async (_, { username }, { loggedInUser }) => {
          const ok = await client.user.findUnique({
            where: { username },
          });
          if (!ok) {
            return {
              ok: false,
              error: "Can't unfollow user.",
            };
          }
          try {
            await client.user.update({
                where: {
                  id: loggedInUser.id,
                },
                data: {
                  followings: {
                    disconnect: {
                      username,
                    },
                  },
                },
              });
          } catch(e){
              console.log(e);
              return {
                  ok: false,
                  error: e
              }
          }
          return {
            ok: true,
          };
        }
      ),
    },
  };