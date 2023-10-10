# Star Wars API 

## Endpoints 

### Planets

`/planets?[delay=<milliseconds>]`

Returns a list of all planets in the below format. Optionally provide a `delay` as a query param to simulate latency.

Response

```ts
Array<{
  climate: string;
  created: string;
  diameter_km: string;
  edited: string;
  films: string[];
  gravity: string;
  id: number;
  imageUrl: string;
  name: string;
  orbital_period: string;
  population: string;
  residents: string[];
  rotation_period: string;
  surface_water: string;
  terrain: string;
  url: string;
}>        
```

### Planet by ID

`/planets/:id`

Returns detail for a planet of the specified `id` in the same format as the planets list endpoint above.

### Characters

`/characters?[delay=<milliseconds>]`

Returns a list of all characters in the below format. Optionally provide a `delay` as a query param to simulate latency.

Response:

```typescript
Array<{
  birth_year: string;
  created: string;
  edited: string;
  eye_color: string;
  films: string[];
  gender: string;
  hair_color: string;
  height_cm: string;
  homeworld: string;
  id: number;
  imageUrl: string;
  mass: string;
  name: string;
  skin_color: string;
  species: string[];
  starships: string[];
  url: string;
  vehicles: string[];
}> 
```

### Character by ID

`/characters/:id`

Returns detail for a character of the specified `id` in the same format as the characters list endpoint above.