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
    { id: 1, username: 'user1', avatar: 'avatar1.png', email: 'email1', password: 'password1' },
    { id: 2, username: 'user2', avatar: 'avatar2.png', email: 'email2', password: 'password2' },
    // 更多用户
  ],
  circles: [
    { id: 1, name: '羽毛球圈', creator: 1, members: [1, 2], posts: [1, 2], imagePath: 'circle1.jpg'},
    { id: 2, name: '南京大学学习圈', creator: 2, members: [2], posts: [3], imagePath: 'circle2.jpg'},
    // 更多兴趣圈
  ],
  posts: [
    {
      id: 1,
      circleId: 1,
      time: '2024-07-25T12:00:00Z',
      authorName: '小枫',
      authorAvatar: 'https://example.com/avatar.jpg',
      date: '2024/06/25',
      content: '今天喝大红袍。中火，炭火香带着点花香，香气非常高...',
      images: [
        'https://example.com/image1.jpg',
        'https://example.com/image2.jpg',
        'https://example.com/image3.jpg',
        'https://example.com/image4.jpg',
      ],
      likes: 11,
      comments: [1, 2],
    },
    {
      id: 2,
      circleId: 1,
      time: '2024-07-25T12:00:00Z',
      authorName: '小李',
      authorAvatar: 'https://example.com/avatar.jpg',
      date: '2024/06/25',
      content: '今天不喝大红袍了，今天吃烧鸡',
      images: [
        'https://example.com/image1.jpg',
        'https://example.com/image2.jpg',
        'https://example.com/image3.jpg',
        'https://example.com/image4.jpg',
      ],
      likes: 11,
      comments: [3, 4],
    },
    {
      id: 3,
      circleId: 2,
      time: '2024-07-31T12:00:00Z',
      authorName: 'vagrant',
      authorAvatar: 'https://example.com/avatar.jpg',
      date: '2024/08/25',
      content: '今天吃了小坤坤',
      images: [
        'https://example.com/image1.jpg',
        'https://example.com/image2.jpg',
        'https://example.com/image3.jpg',
        'https://example.com/image4.jpg',
      ],
      likes: 11,
      comments: [],
    },
    // 更多帖子
  ],
  comments: [
    { id: 1, postId: 1, creator: 1, text: '这是第一个评论' },
    { id: 2, postId: 1, creator: 2, text: '这是第二个评论' },
    { id: 3, postId: 2, creator: 1, text: '这是第三个评论' },
    { id: 4, postId: 2, creator: 2, text: '这是第四个评论' },
    // 更多评论
  ],
};
