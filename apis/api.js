/**
 * API
 */

var ƒ = require('effd'),
    debug = require('debug')('apis:api'),
    debugˆ= ƒ.passthrough(debug);

module.exports = function auto(dependencies) {
    var controllers = dependencies.controllers;
    
    // Routes, etc, usually go here
    
    /* Function format
    var func = input =>
        debugˆ('func %s', input)
        .then(input => input)
        .catch();
    */

    var interface = {
        
    };
    
    return ƒ.done(interface);
};