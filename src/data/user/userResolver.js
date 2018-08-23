import User from './userModel';

export default {
    Query: {
        users: async() => {
            return await (User.find({}));
        },
        user: async(_, { id }) => {
            return await (User.findOne({ _id: id }));
        },
    },
    Mutation: {
        updateUser: async(root, { id, name }, context) => {
            let user = await User.findOneAndUpdate({ _id: id }, { name: name }, { new: true });

            if (!user) {
                return {
                    ok: false,
                    message: "user not found"
                };
            } else {
                return user;
            }

        },
    }
}