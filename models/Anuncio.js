'use strict';

const mongoose = require('mongoose');

// definimos un esquema
const anuncioSchema = mongoose.Schema({
    name: {type: String, index: true},
    sale: {type:Boolean, index: true},
    price: {type:Number, index: true},
    photo: {type:String, index: true},
    tags: [String]
}
/*{
    collection: 'anuncios'
}*/);

anuncioSchema.statics.list = function(filters, limit, start, fields, sort) {
    const query = Anuncio.find(filters);
    //query.gte(gte).lte(lte);
    query.limit(limit);
    query.skip(start)
    query.select(fields)
    query.sort(sort)
    return query.exec();
}

const Anuncio = mongoose.model('Anuncio', anuncioSchema);

module.exports = Anuncio;