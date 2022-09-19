const express = require("express")
const joi = require("joi");
const User = require("../models/User");
const _ = require("lodash")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Card = require("../models/Card");
const router = express.Router()



const registerSchema = joi.object({
    name: joi.string().required().min(2),
    email: joi.string().required().min(6).email(),
    password: joi.string().required().min(8),
    biz: joi.boolean().required(),
    
});


// add new users
router.post("/", async (req, res) => {

    // joi validation
    try{ 
    const {error} = registerSchema.validate(req.body);
    if (error) return res.status(400).send(error.message)


    // search for existing user
    let user = await User.findOne({email: req.body.email});
    if (user) return res.status(400).send("User already exist");

    // add new user
    user = new User(req.body)

    // encrypt password with bcrypt
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password,salt)
    await user.save();

  

        // creat token
          const genToken = jwt.sign(
        {_id: user._id, name: user.name},
         process.env.secretKey
         );

    await user.save();
    res.status(201).send({ token: genToken });

   } catch(error){
        res.status(400).send("ERROR in register")
    }
    
})
  




module.exports = router;