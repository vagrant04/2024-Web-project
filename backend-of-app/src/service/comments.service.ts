import { Provide } from '@midwayjs/core';
import { data } from '../controller/home.controller';

@Provide()
export class CommentsService {
  async getCommentsByPostId(postId: number) {
    return data.comments.filter(comment => comment.postId === postId);
  }

  async createComment(postId: number, creator: number, content: string) {
    const newComment = {
      id: data.comments.length + 1,
      postId: postId,
      creator: creator,
      text: content,
    };
    data.posts.find(post => post.id === postId).comments.push(newComment.id);
    data.comments.push(newComment);
    return newComment;
  }
}
