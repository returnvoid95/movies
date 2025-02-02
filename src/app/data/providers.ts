import { Provider } from "@angular/core";
import { MoviesService } from "./services/abstractions/movies.service";
import { MoviesServiceImpl } from "./services/implementations/movies.service.impl";

export const dataProviders: Provider[] = [
  { provide: MoviesService, useClass: MoviesServiceImpl }
]
