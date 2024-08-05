import { Controller, Get, Inject } from '@midwayjs/core';
import { TaskService } from '../service/task.service';

@Controller('/task')
export class TaskController {
  //里面必须是异步方法
  @Inject()
  taskservice: TaskService;

  @Get('/overview')
  async getTaskList() {
    //return await this.taskservice.getTaskList();
    this.taskservice.getTaskList().then(data => {
      return data;
    });
  }
}
