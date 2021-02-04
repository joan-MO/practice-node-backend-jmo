var express = require('express');
var router = express.Router();
const axios = require('axios');
const { param } = require('./users');
const Anuncio = require('../models/Anuncio');
const filtersFind = require('../utils/utils')


/* GET home page. */
router.get('/', async function(req, res, next) {

  try {

    const name = req.query.name;
    const sale = req.query.sale;
    const price = req.query.price;
    const tags = req.query.tags;
    const limit = parseInt(req.query.limit) || null;
    const skip = parseInt(req.query.skip) || null;
    const fields = req.query.fields || null;
    const sort = req.query.sort || null;
    
    
    const filters = {};

    filtersFind(filters,tags,name,sale,price)

    console.log(filters);
  
    //params.limit = limit
    //params.skip = skip
    //params.fields = fields
    //params.sort = sort
    /*
  
    const url = 'http://localhost:3000/apiv1/anuncios';
  
    const response = await axios.get(url,{params});
  
    console.log(response.data);
  */

    const result = await Anuncio.list(filters, limit, skip, fields, sort);
    res.locals.anuncios = result
    res.locals.img = 'default.jpg'
    console.log(result); 
    res.render('index');
    
  } catch (error) {
    next(error)
  }

});

module.exports = router;
