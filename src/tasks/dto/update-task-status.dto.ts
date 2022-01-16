import { IsEnum } from 'class-validator';
import { TaskStatus } from '../task.model';

export class UpdateTaskStatusDto {
  /* clike is in, it check that is one of the enum values */
  @IsEnum(TaskStatus, {
    message: `Task status must be one of the following: ${Object.values(
      TaskStatus,
    )}`,
  })
  /* gives it the ts type */
  status: TaskStatus;
}

/* 
UpdateTaskStatusDto is like an interface of 
{
    status: TaskStatus;
}
 */
