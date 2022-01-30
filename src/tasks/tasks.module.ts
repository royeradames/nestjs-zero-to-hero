import { Module } from '@nestjs/common';
// import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { TasksController } from './tasks.controller';
import { TasksRepository } from './tasks.repository';
import { TasksService } from './tasks.service';

@Module({
  /* makes the TaskRepository available for property injection 
  in submodules we use forFeature() and in root module we use forRoot()
  */
  imports: [
    /* don't need to configure because the app module already did that
    
    * when you import the ConfigModule you get access to the configService. 
      - You can injected into other classes
      - Gives access to the environment variables of the current .env file
    */
    // ConfigModule,
    //  import auth module exports
    AuthModule,
    TypeOrmModule.forFeature([TasksRepository]),
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
