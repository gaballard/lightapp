/**
 * Core API
 */

var ƒ = require('effd'),
    debug = require('debug')('apis:core'),
    debugˆ= ƒ.passthrough(debug);

module.exports = function auto(dependencies) {
    var controllers = dependencies.controllers,
        api = dependencies.resources.server;
    
    // Routes, etc, go here
    api.get('/', (req, res) =>
        debugˆ('GET /')
        .then(() => res.status(200).send({
            status: 'ok'
        }))
        .catch(err => console.error(err.stack)));
    

    var interface = {
        
    };
    
    return ƒ.done(interface);
};