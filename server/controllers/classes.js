const Class = require("../models/classes");

exports.getAllClasss = async (req, res) => {
  try {
    const result = await Class.find();
    if (result && result.length !== 0) {
      return res.status(200).send({
        msg: "Classes found!",
        payload: result,
      });
    }
    res.status(404).send({ msg: "Classes not found" });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getClassById = async (req, res) => {
  try {
    const result = await Class.findById(req.params.id);
    if (result) {
      return res.status(200).send({
        msg: "Class found",
        payload: result,
      });
    }
    res.status(404).send({ msg: "Class not found" });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deleteClass = async (req, res) => {
  try {
    const result = await Class.findByIdAndDelete(req.params.id);
    if (result) {
      return res.status(200).send({
        msg: "Class deleted",
      });
    }
    res.status(500).send({ msg: "Something went wrong" });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateClass = async (req, res) => {
  try {
    const data = {
      year: req.body.year,
      code: req.body.code,
      hasRoot: req.body.hasRoot,
      rootNumber: req.body.rootNumber,
    };
    const result = await Class.findByIdAndUpdate(req.params.id, data);
    if (result) {
      return res.status(200).send({
        msg: "Class updated",
        payload: result,
      });
    }
    res.status(500).send({
      msg: "Class was not updated",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.createClass = async (req, res) => {
  try {
    const data = new Class({
      year: req.body.year,
      code: req.body.code,
      hasRoot: req.body.hasRoot,
      rootNumber: req.body.rootNumber,
    });
    const result = await data.save();
    if (result) {
      return res.status(201).send({
        msg: "Class created",
        payload: result,
      });
    }
    res.status(500).send({
      msg: "Class was not created",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};
