import {
  Body,
  ConsoleLogger,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
// import { PatchField, PatchTaskDto } from './dto/patch-task.dto';
import { DeleteTaskResponse, Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(
    /* @body lets you capture the body, and passing a string lets you desconstruct it */
    /* it takes less mental real state to name things the same across, dto, controller, and service */
    @Body() createTaskDto: CreateTaskDto,
  ): Task {
    return this.tasksService.createTask(createTaskDto);
  }

  /* I completed the patch my way and in the end I when with the teacher solution so my code can be 1-1 with his. */
  // @Patch('/:id/status')
  // partiallyUpdateTask(
  //   @Param('id') id: string,
  //   @Body() updateTaskDto: PatchTaskDto,
  // ): Task {
  //   return this.tasksService.partiallyUpdateTask(id, updateTaskDto);
  // }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): Task {
    return this.tasksService.updateTaskStatus(id, status);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): DeleteTaskResponse {
    console.log('deleteTask', id);
    return this.tasksService.deleteTask(id);
  }
}
