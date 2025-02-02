import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from 'src/app/models';
import { MovieCardComponent } from '../movie-card/movie-card.component';

@Component({
  selector: 'app-search-result',
  standalone: true,
  imports: [
    CommonModule,
    MovieCardComponent
  ],
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultComponent {

  readonly arrayOfSkeletons = new Array(10).fill(null);

  @Input() movies: Movie[] | null | undefined;
  @Input() loading: boolean | null | undefined;
  @Input() selectedMovieIndex: number | null | undefined;

  @Output() readonly cardClick = new EventEmitter<Movie>();
  @Output() readonly nextPage = new EventEmitter<void>();

  onCardClick(movie: Movie) {
    this.cardClick.emit(movie);
  }

  trackByFn(index: number, item: Movie) {
    return item.id;
  }

}
