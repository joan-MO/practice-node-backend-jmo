function minMaxNumberFilters(filters,price){   
    if (price) {
        if (price === '10-50' ) {
        filters.price = {$gte:'10', $lte:'50'};
        } else if (price ===  '10-') {
            filters.price = {$gte:'10'};
        } else if (price == '-50') {
            filters.price = {$lte:'50'};
        } else {
            filters.price = price
        }
    }
}

module.exports = function filtersFind(filters,tags,name,sale,price) {
    if (tags) {
        filters.tags = tags;
    }

    if (name) {
        filters.name = new RegExp('^'
        +name, "i");
    }

    if (sale) {
        filters.sale = sale;
    }

    minMaxNumberFilters(filters,price);
}

