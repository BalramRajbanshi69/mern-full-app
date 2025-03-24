const express = require('express');
const Contact = require('../model/Contact-model');
const router = express.Router();


router.post('/contactsubmit', async(req,res)=>{
  try {
    const {fullname,email,phone,subject,message} = req.body
    const contact = new Contact({
      fullname,
      email,
      phone,
      subject,
      message,
    });
    await contact.save()
    res.status(201).json({message: 'Contact submitted successfully'})
  } catch (error) {
    res.status(400).json({message: 'Error submitting contact', error: error.message})
  }
})

module.exports = router;