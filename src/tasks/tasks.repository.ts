import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './dto/task.entity';
import { TaskStatus } from './task-status.enum';

/* tell typeorm that this will be a repository of task 
- normally the default are used
  - they are comming from the Repository class
- this is alway a place here I can add custom methods
*/
@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { status, search } = filterDto;

    /* create a query using the query builder */
    // task is what refer to the Task entity
    const query = this.createQueryBuilder('task');

    /* if status is defined then add a where clause to the query */
    if (status) {
      // :<variable-name> is a placeholder for the second object key value pair
      query.andWhere('task.status = :status', { status });
    }
    /* if search is defined then add a where clause to the query */
    if (search) {
      query.andWhere(
        /* 
        LIKE: find a similar match (doesn't have to be exact)
          - https://www.w3schools.com/sql/sql_like.asp
        Lower is a sql method
        - https://www.w3schools.com/sql/func_sqlserver_lower.asp
         */
        'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
        // :search is like a param variable, and the search object is the key value pair. Both have to match
        { search: `%${search}%` },
      );
    }
    /* execute the query
    
    - getMany means that you are expecting an array of results
     */

    const tasks = await query.getMany();
    return tasks;
  }

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
