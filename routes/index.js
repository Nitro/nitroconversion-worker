const express = require('express');
const router = express.Router();
const PDFJS = require('../util/pdf');
const convertToBinary = require('../util/convertToBinary');
const util = require('util');
const cors = require('cors');


/* GET home page. */
router.get('/', (req,res,next) => {res.send("This can't be right. You should be making an API request....right? 🤷‍♂️");});
router.post('/pdf-worker', cors() ,async (req,res,next) => {  
  try {
    const dataBlob = convertToBinary(req.body.result);
    const pdfInfo = await PDFJS.getDocument(dataBlob);
    const cleanPdfInfo = util.inspect(pdfInfo);
    res.send(JSON.stringify(cleanPdfInfo));
  } catch(e){
    console.log(e.message);
  }
});

router.post('/user-status', async (req,res,next) => {


});

router.post('/convert-file', async (req,res,next) => {


});

module.exports = router;
