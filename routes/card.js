const express = require("express");
const auth = require("../middlewares/auth");
const Card = require("../models/Card");
const joi = require("joi");
const _ = require("lodash");
const router = express.Router();

const cardSchema = joi.object({
    bizname:  joi.string().min(2).max(255).required(),
    bizdescription: joi.string().min(2).max(1024).required(),
    bizadress:joi.string().min(2).max(400).required(),
    bizimage: joi.string().min(11).max(1024),
    bizphone: joi.string().min(9).max(10).required().regex(/^0[2-9]\d{7,8}$/),
  });
  

// create new card
router.post('/', auth, async (req, res) => {
    try {
      
      // joi validation
      const { error } = cardSchema.validate(req.body);
    if (error) return res.status(400).send(error.message);

     //add new card 
     let card = new Card(req.body);
       let bizFlag = true;

      while(bizFlag){
        newbiznumber = _.random(1,1000000)
        let checkCard = await Card.findOne({biznumber : newbiznumber});

        if (!checkCard) bizFlag = false
      
      card.biznumber = newbiznumber
      card.userId = req.payload._id
      }
    await card.save()
    res.status(200).send("added to card ")
  } catch (error) {
    res.status(400).send("erorr in card "+ error)
  }
  
  });

 // FIND all cards by userid
 router.get("/:mycard",auth, async (req, res) => {
  try {
  
    let card = await Card.find({ userId: req.payload._id });
    res.status(200).send(card);
  } catch (error) {
    res.status(400).send("erorr in card "+ error);
  }
});


// find card by _id
router.get("/:id", auth, async (req, res) => {
  try {
    let card = await Card.findById(req.params.id);
    if (!card) return res.status(404).send("No such card found");
    res.status(200).send(card);
  } catch (error) {
    res.status(400).send("erorr in card "+ error);
  }
});

// update card by id 
router.put("/:id", auth, async (req, res) => {
  try {
   
    // joi validation
    const { error } = cardSchema.validate(req.body);
    if (error) return res.status(400).send(error.message);

    // update card
    let card = await Card.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!card) return res.status(404).send("No such card found");
    res.status(200).send(card);
  } catch (error) {
    res.status(400).send("erorr in card "+ error);
  }
});



// delete card by id
router.delete("/:id", auth, async (req, res) => {
  try {
  
   
    let card = await Card.findByIdAndRemove(req.params.id);

    if (!card) return res.status(404).send("No such card found ");

    res.status(200).send("card deleted successfully!");
  } catch (error) {
    res.status(400).send("erorr in card "+ error);
  }
});



  // FIND all cards 
  router.get("/", auth, async (req, res) => {
    try {
    
      let card = await Card.find()
      ;
      res.status(200).send("card");
    } catch (error) {
      res.status(400).send("erorr in card "+ error);
    }
  });


module.exports = router;

    
