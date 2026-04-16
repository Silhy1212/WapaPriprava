var express = require("express");
var router = express.Router();

const classesController = require("../controllers/classes");

router.get("/", classesController.getAllClasss);

//localhost:3000/cats/5sa4d949qw86d5sa4d6sa
//req.params.id

router.get("/:id", classesController.getClassById);

router.delete("/:id", classesController.deleteClass);

router.put("/:id", classesController.updateClass);

router.post("/", classesController.createClass);

module.exports = router;
