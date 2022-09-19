const express = require("express");
const auth = require("../middlewares/auth")
const User = require("../models/User")
const _ = require("lodash");
const router = express.Router()

// get profile
router.get("/", auth, async (req, res) =>{

    try {

    let user = await User.findById(req.payload._id)
    if(!user) return res.status(404).send("wrong details")

    res.status(200).send(_.pick(user, ["name","email"]))

    } catch (error) {

      res.status(400).send("ERROR in profile")    
    }


})



module.exports = router;
