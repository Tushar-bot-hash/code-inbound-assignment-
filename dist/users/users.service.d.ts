import { Repository } from 'typeorm';
import { User } from './user.entity';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    findById(id: number): Promise<User>;
    findByEmail(email: string): Promise<User>;
    getProfile(userId: number): Promise<Partial<User>>;
}
