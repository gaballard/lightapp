/**
 * Lightweight App Platform
 */

import crap from 'crap';
import debug from 'debug';
import { app, apis } from './config/config';

const logger = debug('lightapp');

logger('Starting %s', app.title);

module.exports = 
	crap
	.load
	.apis(apis)
	.catch(err => debug('Error loading APIs:\n %O', err.stack));