import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './dto/task.entity';
import { TaskStatus } from './task-status.enum';

/* tell typeorm that this will be a repository of task 
- normally the default are used
  - they are comming from the Repository class
- this is alway a place here I can add custom methods
*/
@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    /* you need validation so that the spread operator doesn't introduce malicious code */
    const { title, description } = createTaskDto;

    /* generate a row base on the Task entity 
    - creates a new isntance of task entity
    - the password is not needed to be pass because it auto increments
      - What is a UUID?
        - A universally unique identifier (UUID) is a 128-bit number used to identify information in computer systems.
        - https://www.youtube.com/watch?v=w0VFcVYIfhg
      - Auto increment number vs UUID
          - https://www.youtube.com/watch?v=s5Im6LWfLrY
    This creates a row that now needs to be saved to the database

    */
    const task = this.create({
      title,
      description,
      /* this is the power of enum. It's like using or with specific string AND you can call them like variables 😃 */
      status: TaskStatus.OPEN,
    });
    /* you can now change task instance like any object
      task.status = TaskStatus.DONE; 
      for example
     */

    // save the task to the database. The new task is save and not overwritten because of the unique id.
    await this.save(task);

    return task;
  }
}

/* to make this repository available anywhere you need to set that up in the .module.ts file. See the task.module.ts*/
