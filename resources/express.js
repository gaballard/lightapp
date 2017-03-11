/**
 * Express Resource
 */

var ƒ = require('effd'),
    debug = require('debug')('resources:express'),
    debugˆ = ƒ.passthrough(debug),
    express = require('express'),
    config = require('../config/config'),
    server;

module.exports = function auto(dependencies) {
    
    // Singleton instance
    if (server) {
        debug('Using existing Express server...');
        return ƒ(server);
    }
    
    return server = ƒ(Ø => {
        debug('Creating Express server...');
        
        var app = express();
        
        // App settings
        app.locals.title = config.app.title;
        app.locals.description = config.app.description;
        
        // Set HTTP Headers
        
        // Middleware goes here
        
        // Start server
        app.listen(config.port, () => {
            debug(`Express server running on port ${config.port}`);
            Ø.done(app);
        });
    });
};