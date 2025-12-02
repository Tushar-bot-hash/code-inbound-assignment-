"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const typeorm_1 = require("@nestjs/typeorm");
const users_service_1 = require("./users.service");
const user_entity_1 = require("./user.entity");
const common_1 = require("@nestjs/common");
describe('UsersService', () => {
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
    const mockUsersRepository = {
        findOne: jest.fn().mockResolvedValue(mockUser),
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                users_service_1.UsersService,
                {
                    provide: (0, typeorm_1.getRepositoryToken)(user_entity_1.User),
                    useValue: mockUsersRepository,
                },
            ],
        }).compile();
        service = module.get(users_service_1.UsersService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('findById', () => {
        it('should return a user if found', async () => {
            const result = await service.findById(1);
            expect(result).toEqual(mockUser);
        });
        it('should throw NotFoundException if user not found', async () => {
            mockUsersRepository.findOne.mockResolvedValueOnce(null);
            await expect(service.findById(999)).rejects.toThrow(common_1.NotFoundException);
        });
    });
});
//# sourceMappingURL=users.service.spec.js.map