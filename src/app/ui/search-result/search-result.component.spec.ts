import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchResultComponent } from './search-result.component';
import { CocktailCardComponent } from '../cocktail-card/cocktail-card.component';
import { Movie } from 'src/app/models';
import { By } from '@angular/platform-browser';

describe('SearchResultComponent', () => {
  let component: SearchResultComponent;
  let fixture: ComponentFixture<SearchResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchResultComponent, CocktailCardComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display cocktail cards when loading is false', () => {
    component.cocktails = [
      { idDrink: '1', strDrink: 'Margarita', strGlass: 'Cocktail glass' },
      { idDrink: '2', strDrink: 'Daiquiri', strGlass: 'Cocktail glass' }
    ] as Movie[];
    fixture.componentRef.setInput('loading', false);
    fixture.detectChanges();
    const cocktailCards = fixture.debugElement.queryAll(By.css('app-cocktail-card'));
    expect(cocktailCards.length).toBe(2);
    expect(cocktailCards[0].componentInstance.cocktail).toEqual(component.cocktails![0]);
    expect(cocktailCards[1].componentInstance.cocktail).toEqual(component.cocktails![1]);
  });

  it('should display skeleton cards when loading is true', () => {
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();
    const skeletonCards = fixture.debugElement.queryAll(By.css('app-cocktail-card main.skeleton'));
    expect(skeletonCards.length).toBe(fixture.componentInstance.arrayOfSkeletons.length);
  });

  it('should emit cardClick event with selected cocktail when cocktail card is clicked', () => {
    spyOn(component.cardClick, 'emit');
    fixture.componentRef.setInput('cocktails', [
      { idDrink: '1', strDrink: 'Margarita', strGlass: 'Cocktail glass' }
    ] as Movie[]);
    fixture.componentRef.setInput('loading', false);
    fixture.detectChanges();
    const cocktailCard = fixture.debugElement.query(By.css('app-cocktail-card'));
    cocktailCard.triggerEventHandler('cardClick', null);
    expect(component.cardClick.emit).toHaveBeenCalledWith(component.cocktails![0]);
  });
});
