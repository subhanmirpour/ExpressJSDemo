const asyncHandler = require("express-async-handler");
const Student = require("../models/studentModel");
const mongoose = require("mongoose");

//@desc Get all studnets
//@route GET /api/students
//@access public
const getStudents = asyncHandler(async (req, res) => {
    const students = await Student.find();
    res.status(200.).json(students);
});

const createStudent = asyncHandler(async (req, res) => {
    console.log("The request body is ", req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const student = await Student.create({
        name,
        email,
        phone,
    });
    res.status(201).json(student);
});

const updateStudent = asyncHandler(async (req, res) => {
    const student = await Student.findById(req.params.id);
    if (!student) {
        res.status(404);
        throw new Error("Contact Not Found");
    }
    const updatedStudent = await Student.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.status(200.).json(updatedStudent);
});

const deleteStudent = asyncHandler(async (req, res) => {
    const studentId = req.params.id;
    const isValidId = mongoose.Types.ObjectId.isValid(studentId);
    if (!isValidId) {
        res.status(400);
        throw new Error("Id is not valid");
    }
    const result = await Student.deleteOne({_id: studentId});
    if (result.deletedCount === 0) {
        res.status(404);
        throw new Error("Contact Not Found");
    }
    res.status(200).json({ message: "Student deleted"});
});

const getStudent = asyncHandler(async (req, res) => {
    const student = await Student.findById(req.params.id);
    const studentId = req.params.id;
    const isValidId = mongoose.Types.ObjectId.isValid(studentId);
    if (!isValidId) {
        res.status(400);
        throw new Error("Id is not valid");
    }
    if (!student) {
        res.status(404);
        throw new Error("Contact Not Found");
    }
    res.status(200).json(student);
});


module.exports = {
    getStudents,
    createStudent,
    updateStudent,
    deleteStudent,
    getStudent
};