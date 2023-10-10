import { Controller, Get, Header, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { setTimeout } from 'timers/promises';
import { resolve } from 'path';
import { readFile } from 'fs/promises';
import { MarkdownService } from './markdown.service';
import {
  CharacterParams,
  CharactersQuery,
  PlanetParams,
  PlanetsQuery,
} from './dto';
import { readdirSync } from 'fs';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private markdownService: MarkdownService,
  ) {}

  @Get('')
  @Header('content-type', 'text/html')
  async getReadme() {
    console.log('getReadme', resolve('./', 'assets', 'doc', 'README.md'));
    console.log({ __dirname, cwd: process.cwd() });
    console.log({ readdir: readdirSync('.') });
    const md = await readFile(
      resolve('./', 'assets', 'doc', 'README.md'),
      'utf-8',
    );
    return this.markdownService.render(md);
  }

  @Get('/ping')
  ping() {
    return { pong: `${new Date().toLocaleString()}` };
  }

  @Get('/characters')
  async getCharacters(@Query() query: CharactersQuery) {
    await setTimeout(query.delay);
    return this.appService.getCharacters();
  }

  @Get('/character/:id')
  async getCharacter(@Param() params: CharacterParams) {
    return this.appService.getCharacter(params.id);
  }

  @Get('planets')
  async getPlanets(@Query() query: PlanetsQuery) {
    await setTimeout(query.delay);
    return this.appService.getPlanets();
  }

  @Get('planet/:id')
  async getPlanet(@Param() params: PlanetParams) {
    return this.appService.getPlanet(params.id);
  }
}
