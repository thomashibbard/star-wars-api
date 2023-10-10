import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { planets } from './data/planets';
import type { Planet } from './data/planets';
import { characters } from './data/characters';
import type { Character } from './data/characters';

@Injectable()
export class AppService {
  getPlanets(): Planet[] {
    return planets;
  }

  getPlanet(id: number): Planet | Error {
    const match = planets.find((p) => p.id === id);
    if (match) {
      return match;
    }
    return new HttpException(
      `Unable to locate record with id ${id}`,
      HttpStatus.NOT_FOUND,
    );
  }

  getCharacters(): Character[] {
    return characters;
  }

  getCharacter(id: number): Character | Error {
    const match = characters.find((c) => c.id === id);
    if (match) {
      return match;
    }
    return new HttpException(
      `Unable to locate record with id ${id}`,
      HttpStatus.NOT_FOUND,
    );
  }
}
