import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { User } from '../users/user.entity';
import { ConflictException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;

  const mockUser: User = {
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
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUsersRepository,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    it('should throw ConflictException if email exists', async () => {
      mockUsersRepository.findOne.mockResolvedValue(mockUser);
      await expect(
        service.register('test@test.com', 'testuser', 'password123'),
      ).rejects.toThrow(ConflictException);
    });
  });
});
