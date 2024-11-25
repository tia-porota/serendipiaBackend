const router = require('express').Router();
const mongoose = require('mongoose');
const public = require('../models/modelPublic')
const msgs = require('../models/modelMsg')

router.get("/", async (req, res) => {
    const r = await public.find().populate('msgs');
    res.json(r);
});


router.get("/:id", async (req, res) => {
    const groups = await public.findById(req.params.id).populate('msgs').sort({date:-1});
    res.json(groups);
  });

router.post("/", async (req, res) => {
    const name = req.body.name
    const tempGroup = new public({
        name
    });
    const saveGroup = await tempGroup.save();
    res.status(201).json(saveGroup)
})

router.put("/msgs/:id", async (req, res) => {
    const text = req.body.text;
    const sender = req.body.sender;
    const tempMsg = new msgs({text, sender});
    const msg = await tempMsg.save();
    const msgId = msg._id;
    const groupId = req.params.id;
  
    const updatedGroup = await public.findByIdAndUpdate(
      groupId,
      { $push: { msgs: msgId } },
      { new: true }
    );
    console.log(updatedGroup)
    res.json(updatedGroup);
  
  
  });
  



module.exports = router;

