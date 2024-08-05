import { Controller, Post, Body, Inject, Get, Param } from '@midwayjs/core';
import { CirclesService } from '../service/circles.service';
import { PostsService } from '../service/posts.service';

@Controller('/circles')
export class CirclesController {
  @Inject()
  circlesService: CirclesService;
  @Inject()
  postsService: PostsService;

  @Get('/GetCircle_By_ID/:circleId')
  async GetCirclesById(@Param('circleId') circleId: number) {
    const circle = await this.circlesService.getCircleById(circleId);
    console.log('circle: ', circle);

    const posts = await this.postsService.getPostsByCircleId(circleId);
    console.log('posts: ', posts);

    return {
      circle: circle,
      posts: posts,
    };
  }

  @Get('/GetCircles')
  async GetCircles() {
    const circles = await this.circlesService.getCircles();
    return circles;
  }

  @Post('/CreateCircles')
  async createCircles(@Body() body: { name: string; image: string }) {
    const { name, image } = body;
    const newCircle = await this.circlesService.createCircle(name, image);
    return newCircle;
  }
}
