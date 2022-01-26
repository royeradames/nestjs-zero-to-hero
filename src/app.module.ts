import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';

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
    TasksModule,

    /* connecting the database to nestjs
      - the connection is configured in the ormconfig.json file
      - the ormconfig.json file is a json file that tells nestjs how to connect to the database
      - this is similar to how postgresql was configured 
      in submodules we use forFeature() and in root module we use forRoot()
     */
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'task-management',
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
    }),

    AuthModule,
  ],
})
export class AppModule {}
