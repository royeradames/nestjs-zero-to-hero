import {
  NestInterceptor,
  ExecutionContext,
  Injectable,
  CallHandler,
} from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { map } from 'rxjs/operators';

/*
  *Applies the exclude toPlainOnly to the class-transformer 
  why? 
  - to hide the user data has seen on the TaskDto
  See images with-transformer and wihtout-transformer
  */
@Injectable()
export class TransformInterceptor implements NestInterceptor {
  /* how?
  applying the task entity exclude to plainOnly the user data from the response
  */
  intercept(context: ExecutionContext, next: CallHandler<any>) {
    /* it appears that you need to use the method on the data for it to take into effect 
    - the map says to take the data and apply instanceToPlain to it
    */
    return next.handle().pipe(map((data) => instanceToPlain(data)));
  }
}
