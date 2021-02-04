var express = require('express');
var router = express.Router();

const Anuncio = require('../../models/Anuncio');

router.get('/', async function(req, res, next) {

    const listtags = {tags:[]};
  
    try {
        const results = await Anuncio.find().select('tags -_id');

        results.forEach(result => {
          listtags.tags.push(result.tags[0])
          listtags.tags.push(result.tags[1])
        });
        
        const deleteDuplicateElements = listtags.tags.filter((element, index) => listtags.tags.indexOf(element) === index)
        
        listtags.tags = deleteDuplicateElements;

        res.json(listtags)
        
    } catch (error) {
        next(error)
    }
   
})

module.exports = router;
