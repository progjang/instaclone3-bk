import client from "../../client";
import bcrypt from "bcrypt";
import { protectedResolver } from "../users.utils";

export default {
    Mutation: {
        editProfile: protectedResolver(
            async(_, {firstName, lastName, username, email, password:newPassword}, {loggedInUser}) => {
                try{
                    // user check
                    const user = await client.user.findFirst({where:{id:loggedInUser.id}});
                    // making uglyPassword
                    console.log(user);
                    let uglyPassword = null;
                    if(newPassword){
                        uglyPassword = await bcrypt.hash(newPassword, 10);
                    }
                    // update db
                    const updatedUser = await client.user.update({
                        where:{id: user.id},
                        data:{
                            firstName,
                            lastName,
                            username,
                            email,
                            ...(uglyPassword && {password: uglyPassword})
                        }
                    });
                    if(updatedUser.id) {
                        return {
                            ok: true,
                            error: "no error"
                        }
                    }
                } catch{
                    return {
                        ok: false,
                        error: "couldn't update user Profile"
                    }
                }
            },
        )
    },
}