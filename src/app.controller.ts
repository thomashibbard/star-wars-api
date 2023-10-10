import {
  Controller,
  Get,
  Header,
  HttpException,
  HttpStatus,
  Param,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { setTimeout } from 'timers/promises';
import { resolve } from 'path';
import { readFile } from 'fs/promises';
import { MarkdownService } from './markdown.service';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private markdownService: MarkdownService,
  ) {}

  @Get('/ping')
  ping() {
    return {
      pong: `${new Date().toLocaleString()}`,
    };
  }

  @Get('/README')
  @Header('content-type', 'text/html')
  async getReadme() {
    const md = await readFile(resolve(__dirname, 'doc', 'README.md'), 'utf-8');
    return this.markdownService.render(md);
  }

  @Get('/characters')
  async getCharacters(@Query('delay') delay?: number) {
    if (isNaN(delay)) {
      return new HttpException(
        'Delay must be a number',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (delay) {
      await setTimeout(delay);
    }
    return this.appService.getCharacters();
  }

  @Get('/character/:id')
  async getCharacter(@Param('id') id: number) {
    if (isNaN(id)) {
      return new HttpException('id must be a number', HttpStatus.BAD_REQUEST);
    }
    return this.appService.getCharacter(id);
  }

  @Get('planets')
  async getPlanets(@Query('delay') delay?: number) {
    if (isNaN(delay)) {
      return new HttpException(
        'Delay must be a number',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (delay) {
      await setTimeout(delay);
    }
    return this.appService.getPlanets();
  }

  @Get('planet/:id')
  async getPlanet(@Param('id') id: number) {
    if (isNaN(id)) {
      return new HttpException('id must be a number', HttpStatus.BAD_REQUEST);
    }
    return this.appService.getPlanet(id);
  }
}
