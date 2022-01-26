import { Test } from '@nestjs/testing';
import { TasksRepository } from './tasks.repository';
import { TasksService } from './tasks.service';

const mockTasksRepository = () => ({});

describe('TasksService', () => {
  let tasksService: TasksService;
  let tasksRepository: TasksRepository;

  /* simulate a nest module */

  beforeEach(async () => {
    // initialize a NestJS module with tasksService and tasksRepository
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        /* we want to moc the database. Common thing in testing. */
        { provide: TasksRepository, useFactory: mockTasksRepository },
      ],
    }).compile();

    /* a method to get a provider from your module 
    this will result in a fresh instace of both tasksService and taskRepository
    */
    tasksService = module.get(TasksService);
    tasksRepository = module.get(TasksRepository);
  });

  /* nested describe can keep your testing organize */
  describe('getTasks', () => {
    /* having well descrited test can be another form of documentation */
    it('calls TasksRepository.getTasks and returns the result', () => {});
  });
});
