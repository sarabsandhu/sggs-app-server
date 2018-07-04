'use strict';

var screen = require('../screen');

module.exports = {

    getAsciiArray: (str) => {
    
        var asciiKeys = [];
    
        for (var i = 0; i < str.length; i ++)
            asciiKeys.push(str[i].charCodeAt(0));

        return asciiKeys.join(','); 
    },
    
}