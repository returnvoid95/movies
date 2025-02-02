import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MoviesService } from './data';
import { DialogService } from 'primeng/dynamicdialog';
import { of } from 'rxjs';
import { Movie } from './models';
import { CocktailDetailsModalComponent } from './ui/cocktail-details-modal/cocktail-details-modal.component';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockCocktailsService: jasmine.SpyObj<MoviesService>;
  let mockDialogService: jasmine.SpyObj<DialogService>;

  beforeEach(async () => {
    mockCocktailsService = jasmine.createSpyObj(['getCocktailsByTitle', 'getRandomCocktail']);
    mockDialogService = jasmine.createSpyObj(['open']);

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: MoviesService, useValue: mockCocktailsService },
        provideAnimations()
      ]
    }).overrideComponent(AppComponent, {
      set: {
        providers: [
          { provide: DialogService, useValue: mockDialogService }
        ]
      }
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should search for cocktails', async () => {
    const mockCocktails: Movie[] = [{ idDrink: '1', strDrink: 'Margarita' } as Movie];
    mockCocktailsService.getMoviesByTitle.and.returnValue(of(mockCocktails));

    await component.onSearch('Margarita');

    component.foundCocktails$.subscribe(cocktails => expect(cocktails).toEqual(mockCocktails));
    component.searchInProgress$.subscribe(inProgress => expect(inProgress).toBeFalse());
  });

  it('should get a random cocktail', async () => {
    const mockCocktail: Movie = { idDrink: '1', strDrink: 'Margarita' } as Movie;
    mockCocktailsService.getMoviesPage.and.returnValue(of(mockCocktail));

    await component.getRandomCocktail();

    component.getRandomCocktailInProgress$.subscribe(inProgress => expect(inProgress).toBeFalse());
    expect(mockDialogService.open).toHaveBeenCalledWith(CocktailDetailsModalComponent, {
      data: mockCocktail,
      styleClass: 'cocktail-details-dialog'
    });
  });

  it('should show cocktail modal', () => {
    const mockCocktail: Movie = { idDrink: '1', strDrink: 'Margarita' } as Movie;

    component.showCocktailModal(mockCocktail);
    fixture.detectChanges();

    expect(mockDialogService.open).toHaveBeenCalledWith(CocktailDetailsModalComponent, {
      data: mockCocktail,
      styleClass: 'cocktail-details-dialog'
    });
  });
});
