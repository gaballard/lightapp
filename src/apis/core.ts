/**
 * Core API
 */
import * as Promise from 'bluebird';
import * as debug from 'debug';
import { Request, Response } from 'express';

const logger = debug('apis:core');

function auto (dependencies: any): Promise<any> {
  const { server } = dependencies.resources;

  // Routes, etc, go here
  server.get('/', (req: Request, res: Response) => {
    logger('GET /');
    res.status(200).json({
      status: 'OK',
    });
  });

  return Promise.resolve(server);
}

export { auto };

module.exports = auto;
