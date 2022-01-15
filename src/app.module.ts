import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';

/* modules organize the archicture of the nest app
- everything start in the app.module.ts file (root module)
- similar to angular, the root module is the entry point of the application
- can can have nested modules to organize the app
- big applications are encourage to organize the general endpoints with a modules
- //* its a good pratice to have a folder per module
- modules are singleton 
  - only one system is allow.
 */
@Module({
  imports: [TasksModule],
})
export class AppModule {}
