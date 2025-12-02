"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const auth_service_1 = require("./auth.service");
const user_entity_1 = require("../users/user.entity");
const common_1 = require("@nestjs/common");
describe('AuthService', () => {
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
        findOne: jest.fn(),
        create: jest.fn().mockReturnValue(mockUser),
        save: jest.fn().mockResolvedValue(mockUser),
    };
    const mockJwtService = {
        sign: jest.fn().mockReturnValue('mock-jwt-token'),
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                auth_service_1.AuthService,
                {
                    provide: (0, typeorm_1.getRepositoryToken)(user_entity_1.User),
                    useValue: mockUsersRepository,
                },
                {
                    provide: jwt_1.JwtService,
                    useValue: mockJwtService,
                },
            ],
        }).compile();
        service = module.get(auth_service_1.AuthService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('register', () => {
        it('should throw ConflictException if email exists', async () => {
            mockUsersRepository.findOne.mockResolvedValue(mockUser);
            await expect(service.register('test@test.com', 'testuser', 'password123')).rejects.toThrow(common_1.ConflictException);
        });
    });
});
//# sourceMappingURL=auth.service.spec.js.map