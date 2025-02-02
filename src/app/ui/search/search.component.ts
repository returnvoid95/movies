import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent {

  readonly searchInputControl = new FormControl<string | null>(null);

  @Input() getRandomCocktailInProgress: boolean | null | undefined;

  @Output() readonly search = new EventEmitter<string | null>();
  @Output() readonly getRandomCocktail = new EventEmitter<void>();

  onSearch() {
    this.search.emit(this.searchInputControl.value);
  }

  onGetRandomCocktailClick() {
    this.getRandomCocktail.emit();
  }

  get icon() {
    if(this.getRandomCocktailInProgress) {
      return "pi pi-spin pi-spinner";
    } else {
      return "pi pi-question-circle";
    }
  }

}
