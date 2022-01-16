import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../task.model';

export class GetTasksFilterDto {
  @IsEnum(TaskStatus, {
    message: `Task status must be one of the following: ${Object.values(
      TaskStatus,
    )}`,
  })
  @IsOptional()
  status?: TaskStatus;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  search?: string;
}
