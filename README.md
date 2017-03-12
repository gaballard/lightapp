# Lightweight Application Framework

A scaffold for creating Node.js applications.

## Components

This service uses the [CRaP](https://github.com/tinder/crap) framework to provide dependency injection and assist with separation of concerns. It also uses the [effd](https://github.com/williamkapke/effd) promise wrapping library (the variables ƒ and Ø are part of this library).

#### Controllers

Controllers manipulate the data gathered by Providers or accessed by Resources. Your business logic will go here.

#### Providers

Providers provide a unified facade in front of one or more resources.

#### Resources

Resources provide raw data access to a single piece of technology.