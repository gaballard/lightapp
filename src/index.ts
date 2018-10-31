/**
 * Lightweight Application Platform
 */
import * as debug from 'debug';
import { lightLoader } from './lib/light-loader';

import { apis, app } from './config';

// tslint:disable-next-line
require('typescript-require');

const logger = debug('lightapp');

logger('Starting %s', app.title);

export default lightLoader
  .load
  .apis(apis)
  .catch((err: Error) => logger('Error loading APIs:\n %O', err.stack));
