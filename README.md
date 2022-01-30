# [NestJs Zero to Hero](https://www.udemy.com/course/nestjs-zero-to-hero/learn/lecture/26680748#overview)

- [NestJs Zero to Hero](#nestjs-zero-to-hero)
  - [CLI Generation](#cli-generation)
  - [Modules](#modules)
  - [Controllers](#controllers)
    - [What is it?](#what-is-it)
      - [Request Method are](#request-method-are)
      - [Best Practice](#best-practice)
    - [Implement a controller](#implement-a-controller)
    - [What are handles and how to implement them?](#what-are-handles-and-how-to-implement-them)
      - [Handler life cycle](#handler-life-cycle)
    - [Controller examples](#controller-examples)
  - [Providers](#providers)
    - [Services](#services)
    - [Example](#example)
    - [Injecting the providers](#injecting-the-providers)
  - [DTOs (Data Transfer Objects)](#dtos-data-transfer-objects)
    - [Workflow without DTOs](#workflow-without-dtos)
    - [Qualities](#qualities)
      - [Interface vs Class](#interface-vs-class)
      - [Examples](#examples)
  - [Pipes](#pipes)
    - [What are pipes?](#what-are-pipes)
    - [Custom Pipes](#custom-pipes)
    - [Consuming pipes](#consuming-pipes)
      - [Handler-level pipes](#handler-level-pipes)
      - [Parameter-level pipes](#parameter-level-pipes)
      - [Global pipes](#global-pipes)
      - [Parameter-level VS Handler-level pipes. Which one?](#parameter-level-vs-handler-level-pipes-which-one)
    - [Pipe flow](#pipe-flow)
    - [Validation Pipe](#validation-pipe)
  - [Error Handling](#error-handling)
  - [Typescript](#typescript)
    - [The private/public keyword in the constructor is a nice syntactic sugar](#the-privatepublic-keyword-in-the-constructor-is-a-nice-syntactic-sugar)
      - [Without it](#without-it)
      - [With it](#with-it)
  - [UUID](#uuid)
  - [Docker and PostgresSQL](#docker-and-postgressql)
    - [Stop / Start container](#stop--start-container)
    - [Remove a docker container](#remove-a-docker-container)
  - [PG Admin](#pg-admin)
    - [Why?](#why)
    - [Setup](#setup)
  - [Type ORM](#type-orm)
    - [Implementing TypeORM](#implementing-typeorm)
      - [Active Record vs Data Mapper](#active-record-vs-data-mapper)
      - [creating new table](#creating-new-table)
      - [Creating repository](#creating-repository)
        - [Setting up the repository for property injection](#setting-up-the-repository-for-property-injection)
  - [Auth](#auth)
    - [JWT](#jwt)
  - [Logging](#logging)
    - [Two options that it can take](#two-options-that-it-can-take)
    - [Verbose](#verbose)
    - [Error](#error)
  - [Config Module](#config-module)
  - [Schema validation](#schema-validation)

## CLI Generation

`nest g --help` to get a list of available template generations.

Note that `--no-spec` disables generating a test file.

![list of available cli generate commands](assets/list-of-available-cli-generate-commands.png)

## Modules

![Module example diagram](assets/modules-example-diagram.png)

![implementing example diagram](assets/implementation-of-modules-example-diagram.png)

## Controllers

Its only job is to receive the request and send the response.

### What is it?

![controllers are ...](assets/controllers-are.png)

#### [Request Method are](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)

Set of request methods that indicate the desired action.

- GET
  - The GET method requests a representation of the specified resource. Requests using GET should only retrieve data.
- HEAD
  - The HEAD method asks for a response identical to a GET request, but without the response body.
- POST
  - The POST method submits an entity to the specified resource, often causing a change in state or side effects on the server.
- PUT
  - The PUT method **replaces all** current representations of the target resource with the request payload.
- DELETE
  - The DELETE method deletes the specified resource.
- CONNECT
  - The CONNECT method establishes a tunnel to the server identified by the target resource.
- OPTIONS
  - The OPTIONS method describes the communication options for the target resource.
- TRACE
  - The TRACE method performs a message loop-back test along the path to the target resource.
- PATCH
  - The PATCH method applies **partial modifications** to a resource.
  - ![PATCH best practice](assets/best-practice/patch.png)
  - specify the patched in the URL is **not currently follow by Echelon**.

#### Best Practice

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

## DTOs (Data Transfer Objects)

A data fransfer object (DTO) is define the data type and validates it.

### Workflow without DTOs

![workflow without dtos](assets/data-transfer-objects-(DTO)/dto-exist-because-data-description-get-out-of-hand-in-scale.png)

### Qualities

It defines the shape of data **for a specific case.**

![More about DTOs](assets/data-transfer-objects-(DTO)/pros.png)

#### Interface vs Class

You can refer to classes in run time while interfaces you cannot.

![interface vs class for DTOs](assets/data-transfer-objects-(DTO)/classes-vs-interfaces.png)

#### Examples

![Example DTOs](assets/data-transfer-objects-(DTO)/examples.png)

Data transfer objects are **not mandatory** but applying them as soon as possible will **makes it easier to maintain and refactor** your code.

## Pipes

### What are pipes?

![what are pipes?](assets/pipes/what-are-pipes.png)

### Custom Pipes

![custom pipes](assets/pipes/custom-pipes.png)

### Consuming pipes

#### Handler-level pipes

![handle level pipes](assets/pipes/handle-level-pipes.png)

#### Parameter-level pipes

![parameter level pipes](assets/pipes/parameter-level-pipes.png)

#### Global pipes

![global pipes](assets/pipes/global-pipes.png)

#### Parameter-level VS Handler-level pipes. Which one?

![parameter-level-vs-handler-level-pipes](assets/pipes/parameter-level-vs-handler-level-pipes.png)

### Pipe flow

![pipe flow](assets/pipes/pipe-flow.png)

### Validation Pipe

Lets the DTOs files handle the validation.

To use the validation pipe you need packages:

- class-validator
- class-transformer

Recommended to consume the validation pipes globally.

![applying-validation-pipe-globally](assets/pipes/validationPipe/applying-valition-pipe-globally.png)

![using-validation-pipe](assets/pipes/validationPipe/using-valition-pipe.png)

## Error Handling

Implementation of error handling

![error-handling](assets/error-handling.png)

[List of build in errors](https://docs.nestjs.com/exception-filters#built-in-http-exceptions):

- BadRequestException
- UnauthorizedException
- NotFoundException
- ForbiddenException
- NotAcceptableException
- RequestTimeoutException
- ConflictException
- GoneException
- HttpVersionNotSupportedException
- PayloadTooLargeException
- UnsupportedMediaTypeException
- UnprocessableEntityException
- InternalServerErrorException
- NotImplementedException
- ImATeapotException
- MethodNotAllowedException
- BadGatewayException
- ServiceUnavailableException
- GatewayTimeoutException
- PreconditionFailedException

## Typescript

### The private/public keyword in the constructor is a nice syntactic sugar

#### Without it

![before](assets/private%20keyword%20in%20constructor/before.png)

#### With it

![after](assets/private%20keyword%20in%20constructor/after.png)

## UUID

- What is a UUID?
  - A universally unique identifier (UUID) is a 128-bit number used to identify information in computer systems.
  - <https://www.youtube.com/watch?v=w0VFcVYIfhg>
- Auto increment vs UUID
  - <https://www.youtube.com/watch?v=s5Im6LWfLrY>

## Docker and PostgresSQL

command to create a postgressql docker database:
`docker run --name postgres-nest -p 5432:5432 -e POSTGRES_PASSWORD=postgres -d postgres`

- docker run
- --name postgres-nest : names the container
- -p : specifies the port to expose the container on
- -e : define the enviromental passowrd name POSTGRES_PASSWORD
- -d postgres: names the docker image in dockerhub like a github project

### Stop / Start container

- `docker container stop postgres-nest`
- `docker container start postgres-nest`

### Remove a docker container

`docker container rm postgres-nest`

## PG Admin

### Why?

Manage databse without writing code.

### Setup

![create-server](assets/setup-postgres/create-server.png)

![define-name](assets/setup-postgres/define-name.png)

![define-connection](assets/setup-postgres/define-connection.png)

![create database](assets/setup-postgres/create-database.png)

![name database](assets/setup-postgres/name-database.png)

## Type ORM

[TypeORM Documentation](https://typeorm.io)

`npm i typeorm @nestjs/typeorm pg`

- typeorm: like Knexjs but for typescript
- @nestjs/typeorm: help integrate typeorm with nestjs
- pg is the official driver for postgresql and is needed for typeorm to sit on top of it.

![what is orm](assets/typeorm/what-is-orm.png)

![pros](assets/typeorm/pros.png)
![cons](assets/typeorm/cons.png)
![example](assets/typeorm/example.png)

### Implementing TypeORM

c
![implementing-typeorm](assets/typeorm/implementing-typeorm.png)

#### Active Record vs Data Mapper

Like Angular template (active records) and reactive forms (data mapper).
[Active Record vs Data Mapper](https://typeorm.io/#/active-record-data-mapper)
Echelon uses **Data Mapper**.

- For big applications.
- uses Repository pattern.
  - A way to make custom sql queries like knexjs.
    - Can be place in the service or in another file with a class.

#### creating new table

![defining new table](assets/typeorm/defining-new-table.png)

Note: Half of the class about database has been setup and understanding.

#### Creating repository

![creating repository](assets/typeorm/creating-repository.png)

##### Setting up the repository for property injection

![setting up the repository for property injection](assets/typeorm/setting-up-the-repository-for-property-injection.png)

Repositories come with a wide methods that you can use

- see the documentation for more information.
- <https://typeorm.io/#/repository-api>

![view table data in pgadmin](assets/typeorm/view-table-data-in-pgadmin.png)

## Auth

### JWT

![what are json web tockens?](assets/jwt/what-are-json-web-tockens.png)
![structure](assets/jwt/structure.png)
![structure](assets/jwt/structure.png)
![example](assets/jwt/example.png)
![authorizing](assets/jwt/authorizing.png)
![rejecting](assets/jwt/rejecting.png)
![rejecting](assets/jwt/rejecting-2.png)
![more about](assets/jwt/more-about.png)

Don't save sensitive information in the token because in [jwt.io](https://jwt.io) you can easily decript the token.

## Logging

![types of log](assets/logging/types-of-log.png)

![log levels](assets/logging/log-levels.png)

### Two options that it can take

```ts
private logger = new Logger("TasksRepository", true)
```

  1. context string:
   A string name

  2. boolean

- true: track speed in miliseconds
- false: don't track speed

### Verbose

```ts
this.logger.verbose(
  `User "${user.username}" retrieving all tasks. Filters: ${JSON.stringify(
    filterDto,
  )}`,
  true,
  );
```

### Error

```ts
 let tasks;
    try {
      tasks = await query.getMany();
    } catch (error) {
      this.logger.error(
        `Failed to get tasks for user "${
          user.username
        }", Filters: ${JSON.stringify(filterDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
    return tasks;
```

![log error example](assets/logging/log-error-example.png)

## Config Module

`yarn add @nestjs/config`

env variables define in the scripts overwrite the env variables in the .env file.

## Schema validation

![schema](assets/config-schema-validation/schema.png)

![applying schema](assets/config-schema-validation/applying-schema.png)

![fail validation](assets/config-schema-validation/fail-validation.png)