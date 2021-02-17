import mongoose from "mongoose";
const { Schema, model } = mongoose

let user = new Schema({
    mail: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

let Users = model('user', user)

export default Users 