import { Repository } from 'typeorm';
import { Task, TaskStatus } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { User } from '../users/user.entity';
export declare class TasksService {
    private taskRepository;
    constructor(taskRepository: Repository<Task>);
    createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task>;
    getAllTasks(user: User): Promise<Task[]>;
    getTaskById(id: number, user: User): Promise<Task>;
    updateTask(id: number, updateTaskDto: UpdateTaskDto, user: User): Promise<Task>;
    deleteTask(id: number, user: User): Promise<void>;
    updateTaskStatus(id: number, status: TaskStatus, user: User): Promise<Task>;
}
