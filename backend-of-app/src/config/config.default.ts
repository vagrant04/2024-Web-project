import { MidwayConfig } from '@midwayjs/core';

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
    fileSize: '50mb',
  },
} as MidwayConfig;
