const mongoose = require("mongoose");
const router = require("express").Router();

const group = require("../models/modelGroups");
const msgs = require('../models/modelMsg');


router.get("/", async (req, res) => {
  const groups = await group.find().populate('msgs');
  res.json(groups);
});



router.get("/:id", async (req, res) => {
  const groups = await group.findById(req.params.id).populate('msgs').sort({date:-1});
  res.json(groups);
});

router.post("/", async (req, res) => {
  const tempGroup = new group({
    name: req.body.name,
  });
  const saveGroup = await tempGroup.save();
  res.json(saveGroup);
});

router.put("/msgs/:id", async (req, res) => {
  const text = req.body.text;
  const sender = req.body.sender;
  const tempMsg = new msgs({text, sender});
  const msg = await tempMsg.save();
  const msgId = msg._id;
  const groupId = req.params.id;

  const updatedGroup = await group.findByIdAndUpdate(
    groupId,
    { $push: { msgs: msgId } },
    { new: true }
  );
  console.log(updatedGroup)
  res.json(updatedGroup);


});


router.delete("/", async (req, res) => {
  const r = await group.deleteMany({});
  res.status(200).json(r);
});

module.exports = router;
