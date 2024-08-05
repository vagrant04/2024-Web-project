import { Provide } from '@midwayjs/core';
import { data } from '../controller/home.controller';

@Provide()
export class CirclesService {
  async getCircles() {
    return data.circles;
  }

  async createCircle(name: string, image: string) {
    const newCircle = {
      id: data.circles.length + 1,
      name: name,
      creator: 1, // Assuming the creator ID is 1 for simplicity
      members: [],
      posts: [],
      image: image,
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
