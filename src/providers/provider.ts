/**
 * Provider
 */

import * as Promise from 'bluebird';

export const auto = (): Promise<any> => {

  const provider: any = {};

  return Promise.resolve(provider);
};
