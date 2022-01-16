/* using class validation decorators is consider using the validationPipe 
- https://docs.nestjs.com/techniques/validation 
- to implement the validation pipe UseValidationPipe need to be call eather in route or globally 
*/
import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
