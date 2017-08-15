# Lightweight Application Framework

A scaffold for creating Node.js applications.

## Components

This service uses the [CRaP](https://github.com/tinder/crap) framework to provide dependency injection and assist with separation of concerns. It uses the Bluebird promise library along with `async`/`await` for asynchronous operations.

While any component may interact with any other component, the generic control flow resembles that of an Express/Koa server:

> Request > API > Controller > Provider > Resource > Technology (Database, Server, etc.)

After the requested operation is performed at the bottom of the stack, each component resolves Promises as the control flows upwards to return the response:

> Response < API < Controller < Provider < Resource < Technology

### APIs

APIs can be implemented with various technologies, although they are most often defined as Express/Koa server routes. They provide outside access to the application's functionality.

### Controllers

Controllers perform operations on the data exposed by Providers and Resources. For instance, a controller may expose an interface to create, update or delete a database entry using that database's Resource, or expose a search function that makes use of the data presented by a Provider.

### Providers

Providers leverage one or more Resources (and/or other Providers) to retrieve data and present it as a unified whole. For instance, a user's email may be stored in one database while the user's profile picture is stored in another. A Provider would handle collecting this data from its various sources and presenting it as a complete user object.

Providers provide a unified facade in front of one or more resources.

### Resources

Resources represent a connection to a piece of technology - a data store, a socket, a remote API. They are slightly akin to device drivers in this sense. They are used by Providers to gather information, and Controllers to manipulate it.