
'use strict';

var Promise = require('bluebird');
var db = require('../db');
var screen = require('../screen');
var repoUtil = require('./repo-util');

module.exports = {

    searchByFirstInitialLetterForEnglishResults: (query) => {
    
        var rawColumnsForUnion = db.raw("PageNo,English,Gurmukhi,GurmukhiUni,ShabadID,LineNo,ID,2 as priority")

        return db.select(db.raw('PageNo,English,Gurmukhi,GurmukhiUni,ShabadID,LineNo,ID,1 as priority')).from('Gurbani')
                .whereRaw('SourceId="G"')
                .andWhereRaw('FirstLetterEng like ? ',[query.keyword+'%'])
                .union((db)=>{
                    db.select(rawColumnsForUnion).from('Gurbani')
                    .whereRaw('SourceId="G"')
                    .andWhereRaw('FirstLetterEng like ? ',['%'+query.keyword+'%'])
                    .andWhereRaw('FirstLetterEng not like ? ',[query.keyword+'%'])
                })        
                .orderBy('priority','asc')
                .offset(query.skip)
                .limit(query.rowCount)
                .then()
    },

    searchByFirstInitialLetterForGurmukhiResults: (query) => {
        
        var searchKeywordInAscii =repoUtil.getAsciiArray(query.keyword);

        screen.write('searchKeywordInAscii:'+searchKeywordInAscii);

        var rawColumnsForUnion = db.raw("PageNo,English,Gurmukhi,GurmukhiUni,ShabadID,LineNo,ID,2 as priority")

        return db.select(db.raw('PageNo,English,Gurmukhi,GurmukhiUni,ShabadID,LineNo,ID,1 as priority')).from('Gurbani')
                .whereRaw('SourceId="G"')
                .andWhereRaw('FirstLetterStr like ? ',[searchKeywordInAscii+'%'])
                .union((db)=>{
                    db.select(rawColumnsForUnion).from('Gurbani')
                    .whereRaw('SourceId="G"')
                    .andWhereRaw('FirstLetterStr like ? ',['%'+searchKeywordInAscii+'%'])
                    .andWhereRaw('FirstLetterStr not like ? ',[searchKeywordInAscii+'%'])
                })        
                .orderBy('priority','asc')
                .offset(query.skip)
                .limit(query.rowCount)
                .then()
    }
}