import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        last: {
            type: String,
        },
        email: {
            type: String,
            required: true,
        },
        number: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },

    },
    { timestamps: true }
);

export default mongoose.model("contactnames", userSchema);



// // {
//     "name":"naman",
//     "last": "chaturvedi",
//     "email":"lol$akshjf",
//     "number":"847658743",
//     "topic": "love",
//     "message" : "i vova j"

// }
