import { Configuration, App } from '@midwayjs/core';
import * as crossDomain from '@midwayjs/cross-domain';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import * as upload from '@midwayjs/upload';
import { join } from 'path';
// import { DefaultErrorFilter } from './filter/default.filter';
// import { NotFoundFilter } from './filter/notfound.filter';
import { ReportMiddleware } from './middleware/report.middleware';
import * as staticFile from '@midwayjs/static-file';
//import * as staticServe from 'koa-static';
import * as fs from 'fs/promises';

@Configuration({
  imports: [
    koa,
    validate,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
    crossDomain,
    upload,
    staticFile,
  ],
  importConfigs: [join(__dirname, './config')],
})
export class MainConfiguration {
  @App('koa')
  app: koa.Application;

  async onReady() {
    // add middleware
    this.app.useMiddleware([ReportMiddleware]);
    // Serve static files from the uploads directory
    //this.app.use(staticServe(join(__dirname, '../uploads')));

    await this.copyFiles(
      join(__dirname, '../pictures'),
      join(__dirname, '../uploads')
    );
  }

  async copyFiles(sourceDir: string, targetDir: string) {
    try {
      const files = await fs.readdir(sourceDir);
      for (const file of files) {
        const sourceFile = join(sourceDir, file);
        const targetFile = join(targetDir, file);
        await fs.copyFile(sourceFile, targetFile);
      }
    } catch (error) {
      console.error('Error copying files:', error);
    }
  }
}
