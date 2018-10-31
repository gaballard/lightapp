import * as debug from 'debug';

const logger = debug('light-loader:parallel');

// A parallel helper that works with callback style OR thenables

export const parallel = (tasks: any, done: Function) => {

  const executor = (resolve: any = null, reject: any = null) => {
    let failed = false;
    let results: any = {};
    let numComplete = 0;
    const keys = Object.keys(tasks);

    logger(`Running tasks: ${keys}`);

    if (!keys.length) {
      if (resolve) {
        resolve(results);
      }
      if (done) {
        done(null, results);
      }

      return;
    }

    keys.forEach((name: string) => {
      const worker = tasks[name];

      const cb = (err: Error, result: any) => {
        if (thenable) {
          return; // Callback style not allowed if thenable used!
        }
        if (err) {
          fail(err);
        } else {
          success.call(name, result);
        }
      };

      const returnValue = worker(cb);
      const thenable = returnValue && typeof returnValue.then === 'function';
      if (thenable) {
        returnValue.then(success.bind(name), fail);
      }
    });

    const success = function (this: any, result: any) {
      const name: string = this; // Cause we did .bind(name) above

      logger('%s complete! %d/%d %s failed = %s', name, numComplete + 1, keys.length, keys, failed);

      if (failed) {
        return;
      }

      numComplete++;
      results[name] = result;

      if (numComplete === keys.length) {
        process.nextTick(() => {
          if (resolve) {
            resolve(results);
          }
          if (done) {
            done(null, results);
          }
        });
      }
    };

    const fail = (err: Error) => {
      logger(`One failure! ${keys}`);
      if (failed) {
        return;
      }
      failed = true;
      process.nextTick(() => {
        if (reject) {
          reject(err);
        }
        if (done) {
          done(err);
        }
      });
    };
  };

  if (typeof Promise !== 'undefined') {
    return new Promise(executor);
  }

  executor();
};
