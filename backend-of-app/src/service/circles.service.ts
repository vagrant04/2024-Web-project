import { Provide } from '@midwayjs/core';
import { data } from '../controller/home.controller';

@Provide()
export class CirclesService {
  async getCircles() {
    return data.circles;
  }

  async createCircle(circle: { name: string; creatorId: number; imagePath: any }) {
    const newCircle = {
      id: data.circles.length + 1,
      name: circle.name,
      creator: circle.creatorId,
      creatorName: data.users.find(user => user.id === circle.creatorId)
        .username,
      members: [],
      imagePath: circle.imagePath, // Assuming the file is saved in the uploads directory
      posts: [],
    };
    data.circles.push(newCircle);
    console.log('new Circles: ', data.circles);
    return newCircle;
  }

  async getCircleById(circleId: number) {
    return data.circles.find(circle => circle.id === circleId);
  }

  async getCircleByCircleId(userId: number) {
    return data.posts.find(circle => circle.circleId === userId);
  }
}
