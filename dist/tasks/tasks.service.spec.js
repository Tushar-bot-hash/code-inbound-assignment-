"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const typeorm_1 = require("@nestjs/typeorm");
const tasks_service_1 = require("./tasks.service");
const task_entity_1 = require("./task.entity");
describe('TasksService', () => {
    let service;
    const mockUser = {
        id: 1,
        email: 'test@test.com',
        username: 'testuser',
        password: 'hashed',
        createdAt: new Date(),
        updatedAt: new Date(),
        tasks: [],
    };
    const mockTask = {
        id: 1,
        title: 'Test Task',
        description: 'Test Description',
        status: task_entity_1.TaskStatus.OPEN,
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
        const module = await testing_1.Test.createTestingModule({
            providers: [
                tasks_service_1.TasksService,
                {
                    provide: (0, typeorm_1.getRepositoryToken)(task_entity_1.Task),
                    useValue: mockTasksRepository,
                },
            ],
        }).compile();
        service = module.get(tasks_service_1.TasksService);
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
//# sourceMappingURL=tasks.service.spec.js.map