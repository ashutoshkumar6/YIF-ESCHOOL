var express = require('express');
var router = express.Router();
const shortid = require('shortid');
const Razorpay = require('razorpay');
const dotenv = require('dotenv');
dotenv.config();

const razorpay = new Razorpay({
  key_id : process.env.KEY_ID,
  key_secret : process.env.KEY_SECRET
})

router.get("/order", async (req,res)=>{
  const options = {
    amount: (5*100).toString(),
    currency: "INR",
    receipt: shortid.generate(),
    payment_capture: 0
  }

  const order = await razorpay.orders.create(options);
  console.log(order);
  res.render('payment', { order });
})

router.post('/verification',  async (req, res) => {
  const SECRET = process.env.VERIFICATION_SECRET
  console.log(req.body);

  const crypto = require('crypto');
  const shasum = crypto.createHmac('sha256', secret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest('hex');

  console.log(digest, req.headers['x-razorpay-signature']);
  res.json({ status: 'ok' });
})


module.exports = router;