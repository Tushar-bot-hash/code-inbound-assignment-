import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.entity';
import { User } from '../users/user.entity';
import { NotFoundException } from '@nestjs/common';

describe('TasksService', () => {
  let service: TasksService;

  const mockUser: User = {
    id: 1,
    email: 'test@test.com',
    username: 'testuser',
    password: 'hashed',
    createdAt: new Date(),
    updatedAt: new Date(),
    tasks: [],
  };

  const mockTask: Task = {
    id: 1,
    title: 'Test Task',
    description: 'Test Description',
    status: TaskStatus.OPEN,
    createdAt: new Date(),
    updatedAt: new Date(),
    user: mockUser,
    userId: 1,
  };

  const mockTasksRepository = {
    create: jest.fn().mockReturnValue(mockTask),
    save: jest.fn().mockResolvedValue(mockTask),
    find: jest.fn().mockResolvedValue([mockTask]),
    findOne: jest.fn().mockResolvedValue(mockTask),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useValue: mockTasksRepository,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createTask', () => {
    it('should create a task', async () => {
      const createTaskDto = {
        title: 'Test Task',
        description: 'Test Description',
      };

      const result = await service.createTask(createTaskDto, mockUser);
      expect(result).toEqual(mockTask);
    });
  });

  describe('getAllTasks', () => {
    it('should return all tasks for user', async () => {
      const result = await service.getAllTasks(mockUser);
      expect(result).toEqual([mockTask]);
    });
  });
});
