# [NestJs Zero to Hero](https://www.udemy.com/course/nestjs-zero-to-hero/learn/lecture/26680748#overview)

- [NestJs Zero to Hero](#nestjs-zero-to-hero)
  - [CLI Generation](#cli-generation)
  - [Modules](#modules)
  - [Controllers](#controllers)
    - [What is it?](#what-is-it)
    - [Implement a controller](#implement-a-controller)
    - [What are handles and how to implement them?](#what-are-handles-and-how-to-implement-them)
      - [Handler life cycle](#handler-life-cycle)
    - [Controller examples](#controller-examples)
  - [Providers](#providers)
    - [Services](#services)
    - [Example](#example)
    - [Injecting the providers](#injecting-the-providers)
  - [Typescript](#typescript)
    - [The private/public keyword in the constructor is a nice syntax suggar.](#the-privatepublic-keyword-in-the-constructor-is-a-nice-syntax-suggar)
      - [Without it](#without-it)
      - [With it](#with-it)

## CLI Generation

`nest g --help` to get a list of available template generations.

Note that `--no-spec` disables generating a test file.

![list of available cli generate commands](assets/list-of-available-cli-generate-commands.png)

## Modules

![Module example diagram](assets/modules-example-diagram.png)

![implementing example diagram](assets/implementation-of-modules-example-diagram.png)

## Controllers

### What is it?

![controllers are ...](assets/controllers-are.png)

### Implement a controller

![implement controller](assets/implement%20controller.png)

### What are handles and how to implement them?

![what are handlers.png](assets/what%20are%20handlers.png)

#### Handler life cycle

![handlers-life-cycle](assets/handlers-life-cycle.png)

### Controller examples

![controller-examples](assets/controller-examples.png)

## Providers

![providers-are](assets/providers-are.png)

### Services

Not all Services are providers

![services](assets/services-are.png)

### Example

![example of providers](assets/service-example.png)

Implementation of providers

![providers in module](assets/providers-in-module.png)

### Injecting the providers

![injecting-providers](assets/dependency-injection.png )

The @Injectable decorated makes the class singleton.


## Typescript

### The private/public keyword in the constructor is a nice syntax suggar.

#### Without it

![before](assets/private%20keyword%20in%20constructor/before.png)

#### With it

![after](assets/private%20keyword%20in%20constructor/after.png)