import { TaskStatus } from '../task-status.enum';

export class PatchTaskDto {
  title?: string;
  description?: string;
  status?: TaskStatus;
}

export enum PatchField {
  title = 'title',
  description = 'description',
  status = 'status',
}
