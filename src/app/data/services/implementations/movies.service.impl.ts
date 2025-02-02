import { Inject, Injectable, } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MoviesService } from "../abstractions/movies.service";
import { map, Observable, of } from 'rxjs';
import { API_AUTH_TOKEN, BASE_API_URL_TOKEN, Movie, MoviesResponse } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class MoviesServiceImpl implements MoviesService {

  constructor(
    @Inject(BASE_API_URL_TOKEN) private readonly baseUrl: string,
    @Inject(API_AUTH_TOKEN) private readonly apiKey: string,
    private readonly httpClient: HttpClient
  ) {}

  getMoviesByTitle(title: string | null): Observable<Movie[]> {
    if(!title || !title.length) {
      return of([]);
    }

    return of([]);
/*
    return this.httpClient.get<MoviesResponse>(`${this.baseUrl}s${title}`).pipe(
      map((response) => response.drinks?.map((dto) => convertCocktailDtoToEntity(dto)) ?? []),
      tap((cocktails) => this._cocktailsCache[title] = cocktails)
    ); */
  }

  getMoviesPage(page: number): Observable<Movie[] | null> {
    return this.httpClient.get<MoviesResponse>(`${this.baseUrl}?${this.getQuery(page)}`, {
      headers: {
        'X-API-KEY': this.apiKey
      }
    }).pipe(
      map((response) => {
        return response.docs;
      })
    )
  }

  private getQuery(page: number) {
    const excludeGenres = [
      'короткометражка',
      'концерт',
      'мультфильм',
      'документальный',
      'ток-шоу',
      'детский',
      'реальное ТВ'
    ];
    const filters = 'year=2020-2025&rating.kp=6.5-10&type=movie&votes.kp=10000-99999999' + excludeGenres.map((genre) => `&genres.name=!${genre}`).join('');
    const sort = 'sortField=rating.kp&sortType=-1';
    return `page=${page}&limit=20&${filters}&${sort}`;
  }

}
