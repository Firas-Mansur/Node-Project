const express = require("express");
const joi = require("joi");
const auth = require("../middlewares/auth")
const User = require("../models/User") 
const _ = require("lodash");
const Card = require("../models/Card");

const router = express.Router()


const businessSchema = joi.object({

    businessName: joi.string().required().min(2),
    businessDescription: joi.string().required().min(2),
    businessAddress: joi.string().required().min(2),
    businessPhone: joi.number().required().min(0),
    image: joi.string().required().min(2),
    
})



// delete
router.delete("/:id", auth, async (req, res) =>{
    try {

        let card = await Card.findByIdAndRemove(req.params.id);
        if(!card) return res.status(404).send("No such card for This business")
        res.status(200).send("business deleted successfuly")
    } catch (error) {
        res.status(400).send("Error in delete business")
        
    }
})


// update
router.put("/:id", auth, async (req, res) => {
  try {

    // joi validation
    const { error } = businessSchema.validate(req.body);
    if (error) return res.status(400).send(error.message);

    // update in db
    let card = await Card.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!card) return res.status(404).send("No such card for This business");
    res.status(200).send(card);
  } catch (error) {
    res.status(400).send(error);
  }
});

// get by id
router.get("/:id", auth, async (req, res) =>{

    try {

    let card = await Card.findById(req.params.id)
    if(!card) return res.status(404).send("no such card")
    res.status(200).send(card)

    } catch (error) {

      res.status(400).send("ERROR in card")    
    }
})


// get user business card
router.get("/:id/:myCard", auth, async (req, res) => {
  try {
    // search for user business
    let myCard = await Card.find({ userId: req.payload._id });
    if (!myCard) return res.status(404).send("No such card for This business");
    res.status(200).send(myCard);
  } catch (error) {
    res.status(400).send(error);
  }
});


//get all
router.get("/", auth, async (req, res) =>{

    try {

    let card = await Card.find()
    res.status(200).send(card)


    } catch (error) {

      res.status(400).send(error)    
    }


})



    // add new card
router.post("/", auth, async (req, res) => {


  try {
    // joi validation
    const {error} = businessSchema.validate(req.body);
    if (error) return res.status(400).send(error.message);
    // add the card to db
    let card = new Card(req.body)

    let bizFlag = true;
   

    while(bizFlag){
       newBizNumber = _.random(1,1000000)
       let checkCard = await Card.findOne({bizNumber: newBizNumber});
       if (!checkCard) bizFlag = false
      card.bizNumber = newBizNumber 
      card.userId = req.payload._id
    }
    await card.save()
    
    res.status(200).send("business added to card")
    } catch (error) {
    res.status(400).send(error)    

}
})

module.exports = router;
