import { Observable } from "rxjs";
import { Movie } from "src/app/models";

export abstract class MoviesService {

  abstract getMoviesByTitle(title: string | null): Observable<Movie[]>;

  abstract getMoviesPage(page: number): Observable<Movie[] | null>;

}
