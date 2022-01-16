/* temp until we start working with database
classes are prefer because they are keep after compiling 
*/
export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

/* typescript emun
only allows one value
- it's condiser an object that can only accept only values from the enum
 */
export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export interface DeleteTaskResponse {
  id: string;
  message: string;
  status: DeleteStatus;
}

export enum DeleteStatus {
  FAIL = 'FAIL',
  SUCCESS = 'SUCCESS',
}
