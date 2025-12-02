"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const task_entity_1 = require("./task.entity");
let TasksService = class TasksService {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }
    async createTask(createTaskDto, user) {
        const task = this.taskRepository.create({
            ...createTaskDto,
            user,
            userId: user.id,
        });
        return await this.taskRepository.save(task);
    }
    async getAllTasks(user) {
        return await this.taskRepository.find({
            where: { userId: user.id },
            order: { createdAt: 'DESC' },
        });
    }
    async getTaskById(id, user) {
        const task = await this.taskRepository.findOne({
            where: { id, userId: user.id },
        });
        if (!task) {
            throw new common_1.NotFoundException(`Task with ID ${id} not found`);
        }
        return task;
    }
    async updateTask(id, updateTaskDto, user) {
        const task = await this.getTaskById(id, user);
        Object.assign(task, updateTaskDto);
        return await this.taskRepository.save(task);
    }
    async deleteTask(id, user) {
        const task = await this.getTaskById(id, user);
        await this.taskRepository.remove(task);
    }
    async updateTaskStatus(id, status, user) {
        const task = await this.getTaskById(id, user);
        task.status = status;
        return await this.taskRepository.save(task);
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(task_entity_1.Task)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TasksService);
//# sourceMappingURL=tasks.service.js.map