/**
 * Lightweight App Platform
 */

var crap = require('crap'),
    debug = require('debug')('lightapp'),
    config = require('./config/config');

debug(`Starting ${config.app.name}...`);

module.exports = 
    crap
    .load
    .apis(config.apis)
    .catch(err => debug('Error loading APIs %O', err.stack));