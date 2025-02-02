import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { Movie } from 'src/app/models';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule, CardModule, NgOptimizedImage],
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieCardComponent {
  private _selected: boolean | undefined;

  @ViewChild('main') mainElement!: ElementRef;

  @Input() movie: Movie | undefined;
  @Input() skeleton: boolean | undefined;
  @Input() set selected(value: boolean | undefined) {
    this._selected = value;
    if (value) {
      this.scrollToCenter();
    }
  }
  get selected() {
    return this._selected;
  }

  @Output() readonly cardClick = new EventEmitter<void>();

  round(num: number | string | null | undefined) {
    if (!num) {
      return null;
    }

    return Math.round(Number(num) * 100) / 100;
  }

  scrollToCenter(): void {
    this.mainElement.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }
}
