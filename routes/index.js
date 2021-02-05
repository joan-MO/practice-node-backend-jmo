var express = require('express');
var router = express.Router();
const asyncHandler = require('express-async-handler')
const Anuncio = require('../models/Anuncio');
const filtersFind = require('../utils/utils')

/* GET home page. */
router.get('/', asyncHandler(async (req, res, next) => {

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

    const result = await Anuncio.list(filters, limit, skip, fields, sort);
    res.locals.anuncios = result

    res.render('index');    
 
}));

module.exports = router;
