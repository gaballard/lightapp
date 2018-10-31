const parseDependencies = (dependencyList) => {
  const dependencies = {};
  Object.keys(dependencyList).forEach((dependency) => {
    const list = dependencyList[dependency];
    dependencies[dependency] = {};

    list.split(',').forEach(l => {
      Object.defineProperty(dependencies[dependency], l, {
        enumerable: true,
        get: () => crapConfig[dependency][l]
      });
    });
  });
  return dependencies;
};

export const crapConfig = {
  root: __dirname,

  apis: {
    core: parseDependencies({
      controllers: 'controller',
      resources: 'server'
    })
  },

  middleware: {},

  controllers: {
    controller: parseDependencies({
      providers: 'provider'
    })
  },

  // Uses resources to present a cohesive data model to the controllers
  providers: {
    provider: parseDependencies({
      resources: 'resource'
    })
  },

  // Low-level tools that allow access/manipulation of data
  resources: {
    resource: {
      source: './resources/resource.js'
    },
    server: {
      source: './resources/express.js'
    }
  }
};
