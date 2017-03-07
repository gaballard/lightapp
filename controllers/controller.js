/**
 * Controller
 */

var ƒ = require('effd'),
    debug = require('debug')('controllers:controller'),
    debugˆ= ƒ.passthrough(debug);

module.exports = function auto(dependencies) {
    var providers = dependencies.providers;
    
    /* Function format
    var func = input =>
        debugˆ('func %s', input)
        .then(input => input)
        .catch();
    */
    
    var interface = {
        
    };

    return Promise.resolve(interface);
};