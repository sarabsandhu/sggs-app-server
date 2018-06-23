'use strict';

var Promise = require('bluebird');
var gurbaniRepo = require('../repo/gurbani-repo');

module.exports = {

    searchByFirstInitialLetterForEnglishResults : (query) => {
        return gurbaniRepo.searchByFirstInitialLetterForEnglishResults(query);      
    },

    searchByFirstInitialLetterForGurmukhiResults : (query) => {
        return gurbaniRepo.searchByFirstInitialLetterForGurmukhiResults(query);
    }
    
 }