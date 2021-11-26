import client from "../client";
import bcrypt from "bcrypt";

export default {
    Mutation: {
        createUser: async(_, {firstName, lastName, username, password, email}) => {
            try {
                const existingUser = await client.user.findFirst({
                    where:{
                        OR: [
                            {username},
                            {email}
                        ]
                    }
                });
                if(existingUser) {
                    throw new Error("the username/password already taken.")
                }
                const uglyPassword = await bcrypt.hash(password, 10);
                return client.user.create({
                    data: {
                        firstName,
                        lastName,
                        username,
                        email,
                        password: uglyPassword
                    }
                });
            } catch(e){
                return e;
            }
        },
    },
}