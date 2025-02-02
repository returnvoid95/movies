import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Inject,
  OnInit,
} from '@angular/core';
import { SearchComponent } from './ui/search/search.component';
import { SearchResultComponent } from './ui/search-result/search-result.component';
import { MoviesService } from './data';
import { BehaviorSubject } from 'rxjs';
import { Movie } from './models';
import { AsyncPipe, DOCUMENT } from '@angular/common';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AsyncPipe, SearchComponent, SearchResultComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DialogService],
})
export class AppComponent implements OnInit {
  private readonly _moviesSubject = new BehaviorSubject<Movie[]>([]);
  private readonly _loadingSubject = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly moviesService: MoviesService,
    private readonly dialogService: DialogService,
    @Inject(DOCUMENT) private readonly document: Document
  ) {}

  readonly movies$ = this._moviesSubject.asObservable();
  readonly loading$ = this._loadingSubject.asObservable();

  page = 1;
  selectedMovieIndex: number | null = null;

  ngOnInit() {
    this.loadPage();

    this.document.addEventListener('scroll', this.onBodyScroll.bind(this));
  }

  loadPage(): void {
    if (this._loadingSubject.value) return; // Если данные уже загружаются, выходим

    this._loadingSubject.next(true);
    this.moviesService.getMoviesPage(this.page).subscribe({
      next: (newItems) => {
        this._moviesSubject.next([
          ...this._moviesSubject.value,
          ...(newItems ?? []),
        ]);
        this.page++;
        this._loadingSubject.next(false);
      },
      error: (err) => {
        console.error('Ошибка загрузки данных:', err);
        this._loadingSubject.next(false);
      },
    });
  }

  onBodyScroll() {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 350) {
      this.loadPage();
    }
  }

  onCardClick(movie: Movie) {
    console.warn(movie);
    const movieId = movie.id;
    if (movieId) {
      this.openMovie(movieId);
    }
  }

  openMovie(movieId: string) {
    window.open(`https://kinopoisk.cx/film/${movieId}`, '_blank');
  }

  @HostListener('document:keydown.enter')
  onEnter() {
    if (this.selectedMovieIndex !== null) {
      const movie = this._moviesSubject.value[this.selectedMovieIndex];
      const movieId = movie.id;
      if (movieId) {
        this.openMovie(movieId);
      }
    }
  }

  @HostListener('document:keydown.arrowup', ['$event'])
  onArrowUp(event: KeyboardEvent) {
    event.preventDefault();
    event.stopPropagation();

    if (this.selectedMovieIndex === null) {
      this.selectedMovieIndex = 0;
    } else {
      this.selectedMovieIndex = Math.max(
        0,
        this.selectedMovieIndex - this.getColumnsCount()
      );
    }
  }

  @HostListener('document:keydown.arrowdown', ['$event'])
  onArrowDown(event: KeyboardEvent) {
    event.preventDefault();
    event.stopPropagation();

    if (this.selectedMovieIndex === null) {
      this.selectedMovieIndex = 0;
    } else {
      this.selectedMovieIndex =
        this.selectedMovieIndex + this.getColumnsCount();
    }
  }

  @HostListener('document:keydown.arrowleft', ['$event'])
  onArrowLeft(event: KeyboardEvent) {
    event.preventDefault();
    event.stopPropagation();

    if (this.selectedMovieIndex === null) {
      this.selectedMovieIndex = 0;
    } else {
      this.selectedMovieIndex = Math.max(0, this.selectedMovieIndex - 1);
    }
  }

  @HostListener('document:keydown.arrowright', ['$event'])
  onArrowRight(event: KeyboardEvent) {
    event.preventDefault();
    event.stopPropagation();

    if (this.selectedMovieIndex === null) {
      this.selectedMovieIndex = 0;
    } else {
      this.selectedMovieIndex = this.selectedMovieIndex + 1;
    }
  }

  private getColumnsCount() {
    const width = this.getWindowWidth();
    if (width > 1600) {
      return 5;
    } else if (width > 1360) {
      return 4;
    } else if (width > 960) {
      return 3;
    } else if (width > 480) {
      return 2;
    } else {
      return 1;
    }
  }

  private getWindowWidth() {
    return window.innerWidth;
  }
}
