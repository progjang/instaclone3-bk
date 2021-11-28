import client from "../../client"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default {
    Mutation: {
     login: async(_, {username, password}) => {
         //check username
         const user = await client.user.findFirst({where:{username}});
         if(!user) {
             return {
                 ok: false,
                 error: "can't find such user with the username."
             }
         }
         // check password
         const okPassword = await bcrypt.compare(password, user.password)
         if(!okPassword) {
             return {
                ok: false,
                error: "the password is wrong password"             }
         }
         // issue Token
         const token = jwt.sign({id: user.id}, process.env.SECRET_KEY);
         return {
             ok: true,
             error: "na",
             token: token
         }
     }   
    },
}