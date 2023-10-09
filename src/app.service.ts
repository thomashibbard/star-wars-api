import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import planets from './data/planets';
import characters from './data/planets';

@Injectable()
export class AppService {
  getPlanets() {
    return planets;
  }

  getPlanet(id: number) {
    const match = planets.find((p) => p.id === id);
    if (match) {
      return match;
    }
    return new HttpException(
      `Unable to locate record with id ${id}`,
      HttpStatus.NOT_FOUND,
    );
  }

  getCharacters() {
    return characters;
  }

  getCharacter(id: number) {
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
