import { TaskStatus } from '../task.model';

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
