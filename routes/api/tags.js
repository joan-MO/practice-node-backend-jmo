var express = require('express');
var router = express.Router();

const Anuncio = require('../../models/Anuncio');

router.get('/', async function(req, res, next) {
 
    try {
        const listtags = {tags:[]};

        const list = {tags:[]};

        const existtags = {tags:[]};

        const filterexisttags = {tags:[]};
    
        const tags = [ 'work', 'lifestyle', 'motor', 'mobile'];

        // Array of elements tags exist with query $in pareameter (find is element=tag1 or tag2 or tag3 etc )
        const resulttags = await Anuncio.find( { tags: { $in: tags } } )
       
        resulttags.forEach(element => {
           existtags.tags.push(element.tags[0]);
           existtags.tags.push(element.tags[1]);
        });

        const deleteDuplicateElementsTags = existtags.tags.filter((element, index) => existtags.tags.indexOf(element) === index)

        //console.log(deleteDuplicateElementsTags);

        //============================================================

        

        // Array of tags exist filter by array tags if equal or no
        /*
        tags.forEach(tag => {
            if (!(tag in results)) {
                results[tag] = true
                list.tags.push(tag)
              }
        });
        */

        const onlyexisttags = await Anuncio.find( { tags: { $exists: true, $in: tags } } )

        onlyexisttags.forEach(element => {
            filterexisttags.tags.push(element.tags[0]);
            filterexisttags.tags.push(element.tags[1]);
         });
 
        const deleteDuplicates = filterexisttags.tags.filter((element, index) => filterexisttags.tags.indexOf(element) === index)

        //console.log( deleteDuplicates);
        //console.log(list);

        // Array of all tags of all 'anuncios' and delete duplicate elements.

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
