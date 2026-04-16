var express = require("express");
var router = express.Router();

const subjectsController = require("../controllers/subjects");

router.get("/", subjectsController.getAllSubjects);

//localhost:3000/cats/5sa4d949qw86d5sa4d6sa
//req.params.id

router.get("/:id", subjectsController.getSubjectById);

router.delete("/:id", subjectsController.deleteSubject);

router.put("/:id", subjectsController.updateSubject);

router.post("/", subjectsController.createSubject);

module.exports = router;
