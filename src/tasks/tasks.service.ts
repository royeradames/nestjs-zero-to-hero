import { Injectable } from '@nestjs/common';
import {
  DeleteTaskResponse,
  DeleteStatus,
  Task,
  TaskStatus,
} from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { PatchField, PatchTaskDto } from './dto/patch-task.dto';
@Injectable()
export class TasksService {
  tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const task: Task = {
      /* 
        - What is a UUID?
            - A universally unique identifier (UUID) is a 128-bit number used to identify information in computer systems.
            - https://www.youtube.com/watch?v=w0VFcVYIfhg
        - Auto increment vs UUID
            - https://www.youtube.com/watch?v=s5Im6LWfLrY
        */
      id: uuid(),
      /* you need validation so that the spread operator doesn't introduce malicious code */
      ...createTaskDto,
      /* this is the power of enum. It's like using or with specific string AND you can call them like variables 😃 */
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  // partiallyUpdateTask(
  //   id: string,
  //   field: PatchField,
  //   updateTaskDto: PatchTaskDto,
  // ): Task {
  //   this.getTaskById(id);

  //   this.tasks = this.tasks.map((task) => {
  //     console.log('task', task);
  //     const foundTask = task.id === id;
  //     return foundTask
  //       ? {
  //           ...task,
  //           ...updateTaskDto,
  //         }
  //       : task;
  //   });

  //   return this.getTaskById(id);
  // }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }

  deleteTask(id: string): DeleteTaskResponse {
    const task = this.getTaskById(id);
    this.tasks = this.tasks.filter((task) => task.id !== id);
    return {
      id: task.id,
      message: 'Task deleted',
      status: DeleteStatus.SUCCESS,
    };
  }
}
