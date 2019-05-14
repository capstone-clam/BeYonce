const router = require('express').Router()
const MessagingResponse = require('twilio').twiml.MessagingResponse
const {Message} = require('../db/models')
module.exports = router

//routes mounted on api/closet

router.get('/', async (req, res, next) => {
  try {
      res.send("Hello World!")
    // const allInventory = await Inventory.findAll()
    // res.json(allInventory)
  } catch (err) {
    next(err)
  }
})

router.post('/sms', (req, res) => {

    // Start our TwiML response.
    const response = new MessagingResponse();
  
    // Add a text message.
    const msg = response.message('Check out this sweet owl!');
  
    // Add a picture message.
    msg.media('https://demo.twilio.com/owl.png');
  
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(response.toString());
  });

