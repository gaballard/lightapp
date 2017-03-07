/**
 * Provider
 */

var ƒ = require('effd'),
    debug = require('debug')('providers:provider'),
    debugˆ= ƒ.passthrough(debug);

module.exports = function auto(dependencies) {
    var resources = dependencies.resources;
    
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