var express = require('express');
var router = express.Router();

const Anuncio = require('../../models/Anuncio');

const filtersFind = require('../../utils/utils')

//GET /apiv1/anuncios

router.get('/', async function(req, res, next) {
    try {
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
        
        console.log(filters);
        
        const resultado = await Anuncio.list(filters, limit, start, fields, sort);
        res.json(resultado);
    } catch (err) {
        return next(err);
    }

});

router.get('/:img', (req, res, next) => {
    const img = req.params.img;
    res.send('Hola');
})

// POST /apiv1/anuncios {body}

router.post('/', async (req, res, next) => {
    try {
        const anuncioData = req.body;
        
        const anuncio = new Anuncio(anuncioData)

        const anuncioCreate = await anuncio.save();

        res.status(201).json({ result: anuncio});

    } catch (error) {
        return next(error)
    }
})



module.exports = router;
