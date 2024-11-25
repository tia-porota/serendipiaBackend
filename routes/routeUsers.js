const mongoose = require("mongoose");
const router = require("express").Router();
const user = require("../models/modelUsers.js");

//get all
router.get("/", async (req, res) => {
  try {
    const users = await user.find().populate('idGroups');
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get by id
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const users = await user.findById(id).populate('idGroups');;
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

// post
router.post("/", async (req, res) => {
  console.log(req.body);
  const tempUser = new user({
    user: req.body.user,
  });
  const newUser = await tempUser.save();
  console.log(newUser)
  res.status(201).json(newUser);
});


router.put("/", async (req, res) => {
  const userId = req.body.id;
  const groupCode = req.body.groupCode;

  const updatedUser = await user.findByIdAndUpdate(
    userId,
    { $push: { idGroups: groupCode } },
    { new: true }
  );
  res.status(201).json(updatedUser);
})

//borrar todo alv
router.delete("/", async (req, res) => {
  await user.deleteMany({});
  res.status(200);
});
module.exports = router;