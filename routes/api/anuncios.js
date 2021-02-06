var express = require('express');
var router = express.Router();
const asyncHandler = require('express-async-handler')
const Anuncio = require('../../models/Anuncio');
const filtersFind = require('../../utils/utils')

//GET /apiv1/anuncios

router.get('/', asyncHandler(async (req, res, next) => {

    const name = req.query.name;
    const sale = req.query.sale;
    const price = req.query.price;
    const tags = req.query.tags;
    const limit = parseInt(req.query.limit) || null;
    const start = parseInt(req.query.start) || null;
    const fields = req.query.fields || null;
    const sort = req.query.sort || null;
    const filters = {};
      
    filtersFind(filters,tags,name,sale,price)
 
    const resultado = await Anuncio.list(filters, limit, start, fields, sort);
    res.json(resultado);
        
}));

// GET /apiv1/anuncios/tags

router.get('/tags', asyncHandler(async (req, res, next) => {
    
    const list_tags = {tags:[]};

    const all_tags = await Anuncio.distinct("tags");

    all_tags.forEach(tag => {
        list_tags.tags.push(tag);
    });
    
    res.json(list_tags)

}));

// POST /apiv1/anuncios {body}

router.post('/', asyncHandler(async (req, res, next) => {

    const anuncioData = req.body;
        
    const anuncio = new Anuncio(anuncioData)

    const anuncioCreate = await anuncio.save();

    res.status(201).json({ result: anuncio});

}));

module.exports = router;
