import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';

/* module needs to be install */
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from './config.schema';
/* modules organize the archicture of the nest app
- everything start in the app.module.ts file (root module)
- similar to angular, the root module is the entry point of the application
- can can have nested modules to organize the app
- big applications are encourage to organize the general endpoints with a modules
- //* its a good pratice to have a folder per module
- modules are singleton 
  - only one system is allow.
 */
@Module({
  imports: [
    /* handles the .env files */
    ConfigModule.forRoot({
      /* read the corrent env file for each of the staging options
      - dev
      - production
      * The STAGE environment variable is set by script
       */
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      /* 
      * to better guy me and other to solving an error ith the .env file 
      replaces a .env.exmaple file
      */
      validationSchema: configValidationSchema,
    }),
    TasksModule,

    /* connecting the database to nestjs
      - the connection is configured in the ormconfig.json file
      - the ormconfig.json file is a json file that tells nestjs how to connect to the database
      - this is similar to how postgresql was configured 
      in submodules we use forFeature() and in root module we use forRoot()
      * example of having the configuration hardcoded
     */
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 5432,
    //   username: 'postgres',
    //   password: 'postgres',
    //   database: 'task-management',
    //   /* entites translate to
    //     - the table in the database
    //     - schema in the database
    //     You can load explicity entities or load all entities (autoLoadAllEntities: true)
    //     - autoLoadAllEntities is cleaner and teacher preferred
    //   */
    //   autoLoadEntities: true,
    //   /* synchronize: true: always keep your database schema in sync
    //   or you can do manual migrations
    //     - is an advance case
    //     -dangerous after you have a database with data
    //       - solution: migrations with the cli
    //   */
    //   synchronize: true,
    // }),
    /* 
    * example of having the configuration in the .env file
    need to wait for the config module to initialize so we need to wait for the file data */
    TypeOrmModule.forRootAsync({
      /* 
      * 3 most have properties are
      - imports: []
      - useFactory: () => ({})
      - inject: []
      * import says what module useFactory depends on
        - It waits for the ConfigModule to be initialized
       */
      imports: [ConfigModule],

      /* inject what injections you want in the useFactory like in a service constructor */
      inject: [ConfigService],

      /* a function call by nestjs when ever we want to initialize this module
       * you can do dependency injection in the function
       */
      useFactory: async (configService: ConfigService) =>
        /* the return will be the configuration for this module */
        {
          /* know when production is being used
            - product requires ssl
            - ssl is a security layer
            - we are turning it off so we don't have to deal with ssl
              - not best practice
            - SSL can be a class in it self
           */
          const isProduction = configService.get('STAGE') === 'prod';
          return {
            ssl: isProduction,
            extra: {
              ssl: isProduction ? { rejectUnauthorized: false } : null,
            },
            type: 'postgres',
            host: configService.get('DB_HOST'),
            port: configService.get('DB_PORT'),
            username: configService.get('DB_USERNAME'),
            password: configService.get('DB_PASSWORD'),
            database: configService.get('DB_DATABASE'),
            /* entites translate to
        - the table in the database
        - schema in the database
        You can load explicity entities or load all entities (autoLoadAllEntities: true)
        - autoLoadAllEntities is cleaner and teacher preferred
      */
            autoLoadEntities: true,
            /* synchronize: true: always keep your database schema in sync
      or you can do manual migrations
        - is an advance case
        -dangerous after you have a database with data
          - solution: migrations with the cli
      */
            synchronize: true,
          };
        },
    }),

    AuthModule,
  ],
})
export class AppModule {}
