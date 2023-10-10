import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class PlanetsQuery {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  delay?: number = 0;
}

export class CharactersQuery {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  delay?: number = 0;
}

export class PlanetParams {
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  id: number;
}

export class CharacterParams {
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  id: number;
}
