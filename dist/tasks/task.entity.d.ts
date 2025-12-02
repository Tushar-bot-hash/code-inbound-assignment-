import { User } from '../users/user.entity';
export declare enum TaskStatus {
    OPEN = "OPEN",
    IN_PROGRESS = "IN_PROGRESS",
    DONE = "DONE"
}
export declare class Task {
    id: number;
    title: string;
    description: string;
    status: TaskStatus;
    createdAt: Date;
    updatedAt: Date;
    user: User;
    userId: number;
}
