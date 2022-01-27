import { Task } from 'src/tasks/task.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /* only allow unic usernames 
  you need to handle the error if the username is not unique when typeorm is trying to save the user
  */
  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  /* joins the tables together
    - type is the entity type
    - second function is what key does it join
    - eager is eager loading
      - eager means that when ever we fetch the user, we will fetch all the tasks (on true)
      - (on false is the opposite)
      * removes the need to manully fetch the tasks
    the need to soft mirrow each other. 
      - Task needs a user many to one relationship

   */
  @OneToMany((_type) => Task, (task) => task.user, { eager: true })
  tasks: Task[];
}
