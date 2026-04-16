var express = require("express");
var router = express.Router();

const studentsController = require("../controllers/students");

router.get("/", studentsController.getAllStudents);

//localhost:3000/cats/5sa4d949qw86d5sa4d6sa
//req.params.id

router.get("/:id", studentsController.getStudentById);

router.delete("/:id", studentsController.deleteStudent);

router.put("/:id", studentsController.updateStudent);

router.post("/", studentsController.createStudent);

module.exports = router;
