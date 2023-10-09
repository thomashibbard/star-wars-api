import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { setTimeout } from 'timers/promises';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/ping')
  ping() {
    return { pong: `${new Date().toLocaleString()}` };
  }

  @Get('/characters')
  async getCharacters(@Query('delay') delay?: number) {
    if (delay) {
      await setTimeout(delay);
    }
    return this.appService.getCharacters();
  }

  @Get('/character/:id')
  async getCharacter(@Param('id') id: number) {
    return this.appService.getCharacter(id);
  }

  @Get('planets')
  async getPlanets(@Query('delay') delay?: number) {
    console.log('delay', delay, typeof delay);
    if (delay) {
      await setTimeout(delay);
    }
    return this.appService.getPlanets();
  }

  @Get('planet/:id')
  async getPlanet(@Param('id') id: number) {
    return this.appService.getPlanet(id);
  }
}
