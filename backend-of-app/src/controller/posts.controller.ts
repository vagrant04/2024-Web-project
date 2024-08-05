import { Controller, Post, Body, Inject, Get, Param } from '@midwayjs/core';
import { PostsService } from '../service/posts.service';

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
    @Body() body: { circleId: number; content: string; images: string[] }
    //@Files() files: any
  ) {
    const { circleId, content, images } = body;

    const newPost = await this.postsService.createPost({ circleId, content, images });
    return newPost;
  }
}
