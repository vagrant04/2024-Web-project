import { MidwayConfig } from '@midwayjs/core';
import { join } from 'path';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1721542948340_9472',
  koa: {
    port: 7001,
    bodyParser: {
      jsonLimit: '500mb', // 增加JSON请求体大小限制
      formLimit: '500mb', // 增加表单请求体大小限制
      textLimit: '500mb', // 增加文本请求体大小限制
    },
  },
  cors: {
    origin: '*',
  },
  upload: {
    mode: 'file',
    tmpdir: join(__dirname, '../../uploads'), // 上传文件临时存储路径
    cleanTimeout: 0, // 上传完成后多久进行清理
    base64: false, // 是否允许 base64 格式
    fileSize: '50mb',
  },
  //?????
  staticFile: {
    dirs: {
      // 将上传文件目录添加到静态文件目录中
      '/uploads': {
        prefix: '/uploads',
        dir: join(__dirname, '../../uploads'),
      },
      '/pictures': {
        prefix: '/pictures',
        dir: join(__dirname, '../../pictures'),
      },
    },
  },
} as MidwayConfig;
