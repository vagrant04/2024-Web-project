import { Controller, Get } from '@midwayjs/core';

@Controller('/')
export class HomeController {
  @Get('/')
  async home(): Promise<string> {
    return 'Hello Midwayjs!';
  }
}

export const data = {
  users: [
    { id: 1, username: 'vagrant', avatar: 'avatar1.jpg', email: 'email1', password: 'password1' },
    { id: 2, username: 'Flechazo', avatar: 'avatar2.jpg', email: 'email2', password: 'password2' },
    { id: 3, username: 'LsIand', avatar: 'avatar3.jpg', email: 'email3', password: 'password3' },
    // 更多用户
  ],
  circles: [
    { id: 1, name: '羽毛球圈', creator: 1, creatorName: 'vagrant', members: [1, 2], posts: [1], imagePath: 'circle1.jpg'},
    { id: 2, name: '南京大学学习圈', creator: 2, creatorName: 'Flechazo', members: [2], posts: [2], imagePath: 'circle2.jpg'},
    // 更多兴趣圈
  ],
  posts: [
    {
      id: 1,
      circleId: 1,
      time: '2024-07-25T12:00:00Z',
      authorName: 'Flechazo',
      authorAvatar: 'avatar2.jpg',
      date: '2024/06/25',
      content: '太帅了我的石头',
      images: 'post1.jpg',
      likes: 6,
      comments: [1, 2],
      shares: 2,
    },
    {
      id: 2,
      circleId: 2,
      time: '2024-07-31T12:00:00Z',
      authorName: 'LsIand',
      authorAvatar: 'avatar3.jpg',
      date: '2024/08/25',
      content: '在杜厦图书馆学习简直是享受',
      images: 'post2.jpg',
      likes: 11,
      comments: [3, 4],
      shares: 1,
    },
    // 更多帖子
  ],
  comments: [
    { id: 1, postId: 1, creator: 2, creatorName: 'Flechazo', text: '可惜了奥运止步八强' },
    { id: 2, postId: 1, creator: 3, creatorName: 'LsIand', text: '对啊不然指定让龙尝尝苦头。。。' },
    { id: 3, postId: 2, creator: 2, creatorName: 'Flechazo', text: '憋卷了哥' },
    { id: 4, postId: 2, creator: 3, creatorName: 'LsIand', text: '卷死你们(doge)' },
    // 更多评论
  ],
};
