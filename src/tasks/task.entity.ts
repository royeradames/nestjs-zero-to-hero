/* by giving the .entity.ts typeORM knows how to auto load it */

import { Exclude } from 'class-transformer';
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
  /* removes this method from returning
    * To achieve this, we need to:
    - add the @Exclude decorator in the entity
    - write a interceptor that tells nestjs how to achieve this
    - apply the interceptor where we want to apply this.
    * better than maunally replacing the user.tasks in the service
    * toPlainOnly means
      - to exclude the user data when ever returning this in plain text
      - this is to hide the user data from the response
      * jason is consider plain text by class-transofrmer
    * nestjs doesn't know how to handle class-transformer decorators by default. Need to use interceptors
    - interceptors lets you do something when a request comes in
    - can be done in application, controller, handler level.
   */
  @Exclude({ toPlainOnly: true })
  user: User;
}
