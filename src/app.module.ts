import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MarkdownService } from './markdown.service';
console.log('module', join(__dirname, '..', 'src', 'doc'));
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'src', 'doc'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService, MarkdownService],
})
export class AppModule {}
