import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
    email:{ type: String, required: true },
    description : { type: String, required: true },
    date : { type: String, required: true },
    status : {type: Boolean , required: true}
})

export default mongoose.model('tasks',taskSchema);