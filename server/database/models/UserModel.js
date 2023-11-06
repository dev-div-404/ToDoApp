import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email:{ type: String, required: true },
    passWord:{ type: String, required: true }
})

export default mongoose.model('users',userSchema);