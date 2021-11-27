import { createWriteStream } from "fs";
import client from "../../client";
import bcrypt from "bcrypt";
import { protectedResolver } from "../users.utils";

export default {
    Mutation: {
        editProfile: protectedResolver(
            async(_, {firstName, lastName, username, email, password:newPassword, bio, avatar}, {loggedInUser}) => {
                let avatarUrl = null;
                if(avatar){
                    const {filename, createReadStream} = await avatar;
                    const readStream = createReadStream();
                    const newFilename = loggedInUser.id + Date.now() + filename
                    const writeStream = createWriteStream(process.cwd() + "/uploads/" + newFilename);
                    readStream.pipe(writeStream);
                    avatarUrl = `http://localhost:3000/static/${newFilename}`;
                }

                try{
                    // user check
                    const user = await client.user.findFirst({where:{id:loggedInUser.id}});
                    // making uglyPassword

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
                            ...(uglyPassword && {password: uglyPassword}),
                            bio,
                            ...(avatarUrl && {avatar: avatarUrl})
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