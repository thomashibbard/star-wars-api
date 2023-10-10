# Star Wars API 

## Endpoints 

`/planets?[delay=<milliseconds>]`

Returns a list of all planets in the below format. Optionally provide a `delay` as a query param to simulate latency.

Response

```ts
Array<{
    climate: string;
    diameter: string;
    gravity: string;
    name: string;
    orbital_period: string;
    population: string;
    residents: string[];
    rotation_period: string;
    surface_water: string;
    terrain: string;
    url: string;
    id: string;
}>        
```


`/planets/:id`

Returns detail for a planet of the specified `id` in the same format as the planets list endpoint above.

`/characters?[delay=<milliseconds>]`

Returns a list of all characters in the below format. Optionally provide a `delay` as a query param to simulate latency.

Response:

```typescript
Array<{
    birth_year: string;
    eye_color:  string;
    films:      string[];
    gender:     string;
    hair_color: string;
    height:     string;
    homeworld:  string;
    mass:       string;
    name:       string;
    skin_color: string;
    created:    Date;
    edited:     Date;
    species:    string[];
    starships:  string[];
    url:        string;
    vehicles:   string[];
}> 
    
```

`/characters/:id`

Returns detail for a character of the specified `id` in the same format as the characters list endpoint above.