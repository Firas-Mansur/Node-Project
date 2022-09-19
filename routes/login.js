const express = require("express");
const joi = require("joi");
const User = require("../models/User");
const _ = require("lodash")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const router = express.Router();


const loginschema = joi.object({

    email: joi.string().required().min(6).email(),
    password: joi.string().required().min(8),
    
})


// login
router.post("/", async (req, res) => {
    try {
       // joi validation
    const {error} = loginschema.validate(req.body);
    if (error) return res.status(400).send(error.message)

    //    check for exist user
        let user = await User.findOne({email: req.body.email});
        if (!user) return res.status(400).send("Wrong email or password");

    // compare the password

        const compareResult = await bcrypt.compare(req.body.password, user.password)

        if(!compareResult) return res.status(400).send("Wrong email or password");
    

            const genToken = jwt.sign(
        {_id: user._id, biz: user.biz},
         process.env.secretKey
         );

    await user.save();
    res.status(200).send({ token: genToken });

    } catch (error) {
        res.status(400).send("Error in login" + error)
    }
})




module.exports = router;
