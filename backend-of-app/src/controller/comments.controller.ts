import { Controller, Inject, Get, Post, Body, Param } from '@midwayjs/core';
import { CommentsService } from '../service/comments.service';

@Controller('/comments')
export class CommentsController {
  @Inject()
  commentsService: CommentsService;

  @Get('/GetComments_By_Post_ID/:postId')
  async GetCommentsByPostId(@Param('postId') postId: number) {
    const comments = await this.commentsService.getCommentsByPostId(postId);
    return comments;
  }

  @Post('/CreateComment')
  async createComment(
    @Body() body: { postId: number; creator: number; text: string }
  ) {
    const { postId, creator, text } = body;
    const newComment = await this.commentsService.createComment(postId, creator, text);
    return newComment;
  }
}
