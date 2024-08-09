import { Fields, Controller, Post, Files, Inject, Get, Param } from '@midwayjs/core';
import { CirclesService } from '../service/circles.service';
import { PostsService } from '../service/posts.service';
import { Context } from 'egg';
import * as fs from 'fs';
import { join } from 'path';

@Controller('/circles')
export class CirclesController {
  @Inject()
  circlesService: CirclesService;
  @Inject()
  postsService: PostsService;
  @Inject()
  ctx: Context;

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
  async createCircle(@Fields() fields, @Files() files) {
    const { name, creatorId } = fields;
    const file = files[0];

    //console.log('body: ', body);
    console.log('fields: ', fields);
    console.log('creatorId: ', creatorId);
    console.log('files: ', files);
    console.log('name: ', name);
    console.log('file: ', file);

    if (!file || !file.filename) {
      throw new Error('Image file is required');
    }

    //保存文件到指定目录
    const filePath = join(__dirname, '../../uploads', file.filename);
    await fs.promises.rename(file.data, filePath);

    const intcreatorId = parseInt(creatorId);

    const newCircle = await this.circlesService.createCircle({ name, creatorId: intcreatorId, imagePath: file.filename});
    return newCircle;
  }
}
