import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { By } from '@angular/platform-browser';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchComponent, ReactiveFormsModule, InputTextModule, ButtonModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit search event with input value when search button is clicked', () => {
    spyOn(component.search, 'emit');
    const inputElement = fixture.debugElement.query(By.css('input'));
    const searchButton = fixture.debugElement.query(By.css('p-button[icon="pi pi-search"]'));
    inputElement.nativeElement.value = 'Margarita';
    inputElement.nativeElement.dispatchEvent(new Event('input'));
    searchButton.triggerEventHandler('onClick', null);
    expect(component.search.emit).toHaveBeenCalledWith('Margarita');
  });

  it('should emit search event with input value when enter key is pressed', () => {
    spyOn(component.search, 'emit');
    const inputElement = fixture.debugElement.query(By.css('input'));
    inputElement.nativeElement.value = 'Margarita';
    inputElement.nativeElement.dispatchEvent(new Event('input'));
    inputElement.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    expect(component.search.emit).toHaveBeenCalledWith('Margarita');
  });

  it('should display question mark icon when getRandomCocktailInProgress is false', () => {
    fixture.componentRef.setInput('getRandomCocktailInProgress', false);
    fixture.detectChanges();
    const getRandomCocktailButton = fixture.debugElement.query(By.css('.p-button .pi.pi-question-circle'));
    expect(getRandomCocktailButton).toBeTruthy();
  });
});
