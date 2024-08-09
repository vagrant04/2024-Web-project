import { Provide } from '@midwayjs/core';
import { data } from '../controller/home.controller';

@Provide()
export class PostsService {
  async getPosts() {
    return data.posts;
  }
  async getPostsByCircleId(circleId: number) {
    return data.posts.filter(post => post.circleId === circleId);
  }
  async getPostById(postId: number) {
    return data.posts.find(post => post.id === postId);
  }

  async createPost(post: { authorId: number; circleId: number; content: string; images: string }) {
    const newPost = {
      id: data.posts.length + 1,
      circleId: post.circleId,
      content: post.content,
      images: post.images,
      time: new Date().toISOString(),
      authorName: data.users[post.authorId - 1].username, // You can replace this with actual author data
      authorAvatar: data.users[post.authorId - 1].avatar, // Default avatar
      date: new Date().toLocaleDateString(),
      likes: 0,
      comments: [],
      shares: 0,
    };
    data.posts.push(newPost);
    data.circles[post.circleId - 1].posts.push(newPost.id);
    console.log('new Posts: ', data.posts);
    console.log('new Circles: ', data.circles);
    return newPost;
  }
}
