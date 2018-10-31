import * as debug from 'debug';
import * as fs from 'fs';
import { merge } from 'lodash';
import * as path from 'path';
import * as url from 'url';

import { parallel } from './parallel-loader';

require('typescript-require');

const logger = debug('light-loader');

let cache: any = {};

let types: string[] = ['apis', 'apps', 'middleware', 'controllers', 'providers', 'resources'];

const isUnique = (value: any, index: number, self: any[]) => self.indexOf(value) === index;

const getArrayFrom = (list: any): string[] => {
  if (Array.isArray(list)) {
    return list;
  }

  return list.split(',');
};

const getLoader = (protocol: any, config: any, loaderConfig: any, loaderFunc: any) => {
  const args = [config, loaderConfig, loaderFunc];
  for (let i = 1; i < args.length; i += 1) {
    const obj = args[i];
    const loader = obj.loaders && obj.loaders[protocol];
    if (loader) {
      return loader;
    }
  }
};

const load = function (this: any, type: string) {
  let list: any, lightLoaderConfig: any, callback = arguments[arguments.length - 1];

  if (typeof callback !== 'function') {
    callback = undefined;
  }

  let signature: string = Array.prototype.map.call(arguments, (arg: any) => Array.isArray(arg) ? 'array' : typeof arg).join();

  switch (signature) {
    case 'string,string,object':
    case 'string,string,object,function':
    case 'string,array,object':
    case 'string,array,object,function':
      list = getArrayFrom(arguments[1]);
      lightLoaderConfig = arguments[2];
      break;
    case 'string,array':
    case 'string,array,function':
    case 'string,string':
    case 'string,string,function':
      list = getArrayFrom(arguments[1]);
      break;
    case 'string,object':
    case 'string,object,function':
      lightLoaderConfig = arguments[1];
      break;
    case 'string':
    case 'string,function':
      break;
    default:
      throw new Error(`Unknown signature: ${signature}`);
  }

  if (!lightLoaderConfig) {
    lightLoaderConfig = this.config || { root: lightLoader.root };
  }

  if (!list) {
    list = lightLoaderConfig[type] ? Object.keys(lightLoaderConfig[type]) : [];
  }

  let tasks: any = {};
  let root: string = lightLoaderConfig.root || lightLoader.root;

  if (logger.enabled) {
    logger(`loading ${type}: ${list.join()}`);
  }

  list.forEach((name: string) => {
    const cfg = (lightLoaderConfig[type] && lightLoaderConfig[type][name]) || {};

    const source = url.parse(cfg.source || lightLoader.resolve(cfg.root || root, type, name));
    const protocol = (source.protocol || 'file:').replace(/:$/, '');

    if (!cfg.root) {
      cfg.root = root;
    }

    const loader = getLoader(protocol, cfg, lightLoader.config, lightLoader);

    if (!loader) {
      throw Error(`Unknown protocol: ${protocol}`);
    }

    tasks[name] = loader(cfg, type, name, source);
  });

  return parallel(tasks, (err: Error, result: any) => {
    if (logger.enabled) {
      if (err) {
        logger(`Failed to load ${type}: ${list.join()}`);
      } else {
        logger(`... done loading ${type}: ${list.join()}`);
      }
    }
    if (callback) {
      callback(err, result);
    }
  });
};

const bindHelpers = (ctx: any) => {
  let l = load.bind(ctx);
  types.forEach((type: string) => {
    l[type] = load.bind(ctx, type);
  });
  return l;
};

export const lightLoader: any = {
  root: process.cwd() + '/src',

  get config () {
    return lightLoader.open(lightLoader.root + '/config/crap.config.js');
  },

  open: (filename: string): any => {
    let loadedFile = cache[filename];
    if (!loadedFile) {
      filename = path.resolve(lightLoader.root, filename);
      const exists = fs.existsSync(filename);
      if (logger.enabled) {
        logger(`Opening ${filename}...`);
      }
      loadedFile = cache[filename] = (exists && require(filename)) || {};
    }
    return loadedFile;
  },

  resolve: (root: string, type: string, name: string): string => root + '/' + type + '/' + name,

  support: function (moreTypes: any): void {
    moreTypes = getArrayFrom(moreTypes);
    types = types.concat(moreTypes).filter(isUnique);
    this.load = bindHelpers(lightLoader);
  },

  deps: (mapping: any): Function => (fns: any) => {
    fns = fns || {};

    const included = {};
    const notExcluded = {};
    let useInclude = false;

    for (let k in mapping) {
      if (!mapping.hasOwnProperty(k)) {
        continue;
      }

      let cfg: any = null;

      if (fns[k]) {
        useInclude = true;
        cfg = included;
      } else if (fns[k] == undefined) {
        cfg = notExcluded;
      }

      if (!cfg) {
        continue;
      }

      types.forEach((type: string) => {
        if (!mapping[k][type]) {
          return;
        }
        if (!cfg[type]) {
          cfg[type] = {};
        }
        merge(cfg[type], mapping[k][type]);
      });
    }

    return (useInclude ? included : notExcluded);
  },

  loaders: {
    file: (lightLoaderConfig: any, type: string, name: string, source: any) => {
      let pathname = source.pathname;
      if (/^\.?\.?\//.test(pathname)) {
        pathname = path.resolve(lightLoaderConfig.root, source.pathname);
      }

      const query = source.query;
      const hash = source.hash && source.hash.substr(1);

      return (cb: Function) => {
        if (logger.enabled) {
          logger(`Using builder: ${pathname}`);
        }

        // const exists = fs.existsSync(pathname + '.ts');
        // if (exists) {
        //   let fileContents = '';
        //   fs.readFile(pathname + '.ts', (err: Error, data: any) => {
        //     if (err) {
        //       throw err;
        //     }
        //     if (data) {
        //       fileContents += data;
        //     }
        //     logger('File Contents: %O', fileContents);
        //     const file = require(fileContents);
        //     logger('File: %O', file);
        //     // let fileBuffer: any = '';
        //     // try {
        //     //   if (data) {
        //     //     fileBuffer += data;
        //     //   }
        //     //   logger('File Buffer: %O', fileBuffer);
        //     //   const fileContents = JSON.parse(fileBuffer);
        //     //   logger('File Contents: %O', fileContents);
        //     // } catch (error) {
        //     //   return;
        //     // }
        //   });
        // }

        let builder = require(pathname + '.ts');
        logger('Builder: %O', builder);
        // let builder: any = (a: any): any => a;
        const args = hash ? hash.split(',') : [];
        args.push(cb);

        if (query) {
          builder = builder[query];
          if (typeof builder !== 'function') {
            throw new Error(`Cannot execute property: name=${query}, type=${typeof builder}, file=${pathname}`);
          }
        }

        const ctx: any = {
          config: lightLoaderConfig,
          type: type,
          name: name
        };

        ctx.load = bindHelpers(ctx);

        if (builder.name !== 'auto' && !builder.__auto) {
          return builder.apply(ctx, args);
        }

        // auto load; infer dependencies from config
        const tasks: any = {};

        if (logger.enabled) {
          logger('Inferring dependencies from config:');
        }

        types.forEach((typeName: string) => {
          const cfg = lightLoaderConfig[typeName];
          const keys = cfg && Object.keys(cfg);
          if (keys && keys.length) {
            tasks[typeName] = load.bind(ctx, typeName, keys, lightLoaderConfig);
            if (logger.enabled) {
              logger(`\t${typeName}: ${keys}`);
            }
          }
        });

        parallel(tasks, (err: Error, results: any) => {
          if (err) {
            return cb(err);
          }
          args.unshift(results);
          const returnValue = builder.apply(ctx, args);
          if (returnValue && typeof returnValue.then === 'function') {
            returnValue.then(cb.bind(null, null), cb);
          }
        });
      };
    }
  }
};

lightLoader.load = bindHelpers(lightLoader);
