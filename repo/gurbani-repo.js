
'use strict';

var Promise = require('bluebird');
var db = require('../db');
var screen = require('../screen');
var repoUtil = require('./repo-util');

module.exports = {

    searchByFirstInitialLetterForEnglishResults: (query) => {

        console.info("Received Request gurbani-repo request")
    
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
    },

/*     searchByWordMatchInEnglish: (query) => {

        var whereRawStringArray = []
        var parameterArray = []

        query.englishKeywords.forEach(element => {
            whereRawStringArray.push(' English like ? ')
            parameterArray.push('%'+element+'%')
         });

         var whereRawString = ''

         if(query.searchOption.toLowerCase() == 'any'){
            whereRawString = whereRawStringArray.join(' and ')
         }else {
            whereRawString = whereRawStringArray.join(' or ')
         }

        return db.select(db.raw('PageNo,English,Gurmukhi,GurmukhiUni,ShabadID,LineNo,ID')).from('Gurbani')
                 .whereRaw('SourceId="G"').                 
                andWhereRaw(whereRawString,parameterArray)
                .orderBy('PageNo','asc')
                .orderBy('LineNo','asc')
                .orderBy('ID','asc')
                .offset(query.skip)
                .limit(query.rowCount)
                .then()                
    }, */

    searchByWordMatch: (query) => {

        var whereRawStringArray = []
        var parameterArray = []

        if(query.gurmukhi && query.gurmukhi.constructor === Array){

            query.gurmukhi.forEach(element => {
            
                if(query.exact){
                    whereRawStringArray.push(" ( gurmukhi like ? or gurmukhi like ? or gurmukhi like ? ) ")
                    parameterArray.push(element.trim()+' %'); //word is start of line
                    parameterArray.push('% '+ element.trim()+' %'); //word is middle of line
                    parameterArray.push('% ' + element.trim()); //word is at end of line
                }else{
                    whereRawStringArray.push(' gurmukhi like ? ')
                    parameterArray.push('%'+element.trim()+'%')
                }
                
             });

        }else if (query.gurmukhi && query.gurmukhi.length > 0 ) {

                if(query.exact){
                    whereRawStringArray.push(" ( gurmukhi like ? or gurmukhi like ? or gurmukhi like ? )")
                    parameterArray.push(query.gurmukhi.trim()+' %');
                    parameterArray.push('% '+query.gurmukhi.trim()+' %');
                    parameterArray.push('% '+query.gurmukhi.trim());
                }else{
                    whereRawStringArray.push(' gurmukhi like ? ')
                    parameterArray.push('%'+query.gurmukhi.trim()+'%')
                }

        }

        if(query.english && query.english.constructor === Array){

            query.english.forEach(element => {
            
                if(query.exact){
                    
                    whereRawStringArray.push(" ( english like ? or english like ? or english like ? or english like ? or english like ? or english like ? ) ")
                    
                    parameterArray.push(element.trim()+' %');   //word is at the start of shabad
                    parameterArray.push('% '+ element.trim()+' %'); //middle
                    parameterArray.push('% ' + element.trim()); //end
                    parameterArray.push('% ' + element.trim()+',%'); //comma
                    parameterArray.push('% ' + element.trim()+'.%'); //period
                    parameterArray.push('% ' + element.trim()+':%'); //colon at the end

                }else{

                    whereRawStringArray.push(' english like ? ')
                    parameterArray.push('%'+element.trim()+'%')

                }            
            }); 
        
        }else if(query.english && query.english.length > 0 ){

            if(query.exact){

                whereRawStringArray.push(" ( english like ? or english like ? or english like ? or english like ? or english like ? or english like ? ) ")

                parameterArray.push(query.english.trim()+' %');
                parameterArray.push('% '+ query.english.trim()+' %');
                parameterArray.push('% ' + query.english.trim());
                parameterArray.push('% ' + query.english.trim()+",%");
                parameterArray.push('% ' + query.english.trim()+".%");
                parameterArray.push('% ' + query.english.trim()+":%");

            }else{

                whereRawStringArray.push(' english like ? ')
                parameterArray.push('%'+query.english.trim()+'%')

            }

        }

        var whereRawString = ''

        whereRawString = whereRawStringArray.join(' and ')

        return db.select(db.raw('PageNo,English,Gurmukhi,GurmukhiUni,ShabadID,LineNo,ID')).from('Gurbani')
                 .whereRaw('SourceId="G"').                 
                andWhereRaw(whereRawString,parameterArray)
                .orderBy('PageNo','asc')
                .orderBy('LineNo','asc')
                .orderBy('ID','asc')
                .offset(query.skip)
                .limit(query.rowCount)
                .then()                
    }
    
}