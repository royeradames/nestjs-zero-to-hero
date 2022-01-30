import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import {
  // DeleteTaskResponse,
  // DeleteStatus,
  // Task,
  TaskStatus,
} from './task-status.enum';
// import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
// import { PatchField, PatchTaskDto } from './dto/patch-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { User } from 'src/auth/User.entity';

/* great for handling business logic
- error messages
- databse queries
- desctructuring inputs
 */
@Injectable()
export class TasksService {
  constructor(
    /* typeorm requires @InjectRepository(<repository-name>) to be use for the injection to work 
    - list of methods https://typeorm.io/#/repository-api

    you can do some queries here but the repository is great for creating template for reusing the queries
    - makes the code drier
    - easier to test
    */
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}

  getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto, user);
  }

  /* whenever you work with database the work will be async
  - you can use async/await to make it sync
  - and the returining type needs to be a promise
    - Promise<DTO-name>
   */
  async getTaskById(id: string, user: User): Promise<Task> {
    //  try to get task
    /* finone can accept an object for the first input that acts like a where clause */
    let found;
    try {
      // * When passed null or undefined, the query will match with every entity in the repository and return the first record.
      found = await this.tasksRepository.findOneOrFail({ where: { id, user } });
    } catch (error) {
      /* if not found, throw an error (404 not found)
        - see error-console.log image for details
      list of nestjs execeptions
        - https://docs.nestjs.com/exception-filters#built-in-http-exceptions
        - if a js error bubbles up nest will default to responding with a 500 error
      */
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    // const found = await this.tasksRepository.findOneOrFail({ id, user });
    // // if not found, throw an error (404 not found)
    // if (!found) {
    //   /* list of nestjs execeptions
    //     - https://docs.nestjs.com/exception-filters#built-in-http-exceptions
    //     - if a js error bubbles up nest will default to responding with a 500 error
    //   */
    //   throw new NotFoundException(`Task with ID "${id}" not found`);
    // }

    // otherwise, return the found task
    return found;
  }

  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto, user);
  }

  async updateTaskStatus(
    id: string,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    // make sure the task exist
    const task = await this.getTaskById(id, user);

    const updatedStatus = await this.tasksRepository.save({ ...task, status });

    return updatedStatus;
  }

  async deleteTask(id: string, user: User): Promise<void> {
    /* delete is prefer over remove because delete makes less database calls
    - more calls = slow database
    - or require scalling $$$
     */
    const result = await this.tasksRepository.delete({ id, user });

    /* it's useful to console log the store result and see what useful properties it provideds like 
    - affected 
      - number of rows affected
    */
    const noRowsAffected = result.affected === 0;
    if (noRowsAffected) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }
}
