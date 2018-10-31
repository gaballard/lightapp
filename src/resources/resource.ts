/**
 * Resource
 */

import * as Promise from 'bluebird';

export const auto = (): Promise<any> => {

  const resource: any = {};

  return Promise.resolve(resource);
};
