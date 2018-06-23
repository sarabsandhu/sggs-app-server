
var express = require('express');

module.exports = () =>  {

    var searchRouter = express.Router();
    var searchController = require('../Controllers/searchController');

    searchRouter.route('/search').get(searchController.search);  
    
    return searchRouter;

}

