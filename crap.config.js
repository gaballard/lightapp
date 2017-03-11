var cfg = module.exports = {
    root: __dirname,

    apis: {
        core: dependencies({
            controllers: 'controller',
            resources: 'server'
        })
    },

    middleware: {
        
    },
    
    controllers: {
        controller: dependencies({
            providers: 'provider'
        }),
    },

    // Facade in front of 1 or more resources
    providers: {
        provider: dependencies({
            resources: 'resource'
        })
    },

    // Raw data access
    resources: {
        resource: {
            source: './resources/resource.js'
        },
        server: {
            source: './resources/express.js'
        }
    }
};

function dependencies(obj) {
    Object.keys(obj).forEach(layer => {
        var list = obj[layer];
        obj[layer] = {};

        list.split(',').forEach(l => {
            Object.defineProperty(obj[layer], l, {
                enumerable: true, 
                get: () => cfg[layer][l]
            })
        });
    });
    return obj;
}