'use strict';

var searchService = require('../service/searchService');

module.exports = {

    search : (req,res) => {

        console.info("Received Request {0}",req.query)
        
        if(req.query.type === 'firstInitialLetter') {

            if(req.query.language === 'english') {

                searchService.searchByFirstInitialLetterForEnglishResults(req.query).then((result)=>{
                    //console.info("Received response ",result)
                    res.json(result);
                })
                .catch((err)=>{
                    console.error(err);
                });    
    
            }
            else if(req.query.language === 'gurmukhi'){
    
                searchService.searchByFirstInitialLetterForGurmukhiResults(req.query).then((result)=>{
                    res.json(result);
                })
                .catch((err)=>{
                    console.error(err);
                });
    
            }
        }else if(req.query.type === 'word'){
    
            searchService.searchByWordMatch(req.query)
            .then((result)=>{
                res.json(result);
            })
            .catch((err)=>{
                console.error(err);
            }); 
                
        }
    }
 }