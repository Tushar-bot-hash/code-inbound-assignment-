import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { User } from '../users/user.entity';
import { TaskStatus } from './task.entity';
export declare class TasksController {
    private tasksService;
    constructor(tasksService: TasksService);
    createTask(createTaskDto: CreateTaskDto, user: User): Promise<import("./task.entity").Task>;
    getAllTasks(user: User): Promise<import("./task.entity").Task[]>;
    getTaskById(id: number, user: User): Promise<import("./task.entity").Task>;
    updateTask(id: number, updateTaskDto: UpdateTaskDto, user: User): Promise<import("./task.entity").Task>;
    deleteTask(id: number, user: User): Promise<void>;
    updateTaskStatus(id: number, status: TaskStatus, user: User): Promise<import("./task.entity").Task>;
}
