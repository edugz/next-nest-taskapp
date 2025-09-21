import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import type { Task } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll(): Task[] {
    return this.tasksService.findAll();
  }

  @Post()
  create(@Body('title') title: string): Task {
    return this.tasksService.create(title);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body('done') done: boolean): Task {
    return this.tasksService.update(Number(id), done);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.tasksService.remove(Number(id));
  }
}
