import { Provide } from '@midwayjs/core';

@Provide()
export class TaskService {
  async getTaskList() {
    return [
      {
        id: 1,
        name: 'task1',
        desc: 'task1 desc',
      },
      {
        id: 2,
        name: 'task2',
        desc: 'task2 desc',
      },
    ];
  }
}
