/* by giving the .entity.ts typeORM knows how to auto load it */

import { User } from 'src/auth/User.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from './task-status.enum';

/*  @Entity() set the class to be an (table) entity 
    typeORM has a similar syntax to class-validator
*/
@Entity()
export class Task {
  /* passing the uuid changes the column from being the standard increasing interger to unic uuids */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /*  @Column(): define a class var into a database table column*/
  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  /* like User OneToMany relationship 
    - eager
      - automatically fetch the column yes or no
  */
  @ManyToOne((_type) => User, (user) => user.tasks, { eager: false })
  user: User;
}
