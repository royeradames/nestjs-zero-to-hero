import { EntityRepository, Repository } from 'typeorm';
import { Task } from './dto/task.entity';

/* tell typeorm that this will be a repostory of taskx */
@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {}

/* to make this repository available anywhere you need to set that up in the .module.ts file. See the task.module.ts*/
