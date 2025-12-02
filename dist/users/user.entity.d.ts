import { Task } from '../tasks/task.entity';
export declare class User {
    id: number;
    email: string;
    username: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    tasks: Task[];
}
