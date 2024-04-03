const mongoose = require("mongoose");
const studentSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Pleae add the student name"],
    },
    email: {
        type: String,
        required: [true, "Pleae add the student email"],
    },
    phone: {
        type: String,
        required: [true, "Pleae add the student phone"],
    },
},
    {
        timestamps: true,
    });
module.exports = mongoose.model("Student", studentSchema);