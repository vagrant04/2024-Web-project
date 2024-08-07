import { Controller, Post, Inject, Get, Param, Fields, Files } from "@midwayjs/core";
import { PostsService } from '../service/posts.service';
import { join } from 'path';
import * as fs from 'fs';

@Controller('/posts')
export class PostsController {
  @Inject()
  postsService: PostsService;

  @Get('/GetPosts')
  async GetPosts() {
    const posts = await this.postsService.getPosts();
    return posts;
  }

  @Get('/GetPosts_By_ID/:postId')
  async GetPostsById(@Param('postId') postId: number) {
    const post = await this.postsService.getPostById(postId);
    console.log('post: ', post);
    return post;
  }

  @Post('/CreatePosts')
  async createPosts(
    @Fields() fields,
    @Files() files
    //@Files() files: any
  ) {
    const { circleId, content } = fields;
    const file = files[0];

    console.log('file: ', file);
    if (!file || !file.filename) {
      throw new Error('Post Image file is required');
    }

    const intCircleId = parseInt(circleId, 10);
    const filePath = join(__dirname, '../../uploads', file.filename);
    await fs.promises.rename(file.data, filePath);

    const newPost = await this.postsService.createPost({ circleId: intCircleId, content, images: file.filename});
    return newPost;
  }
}
