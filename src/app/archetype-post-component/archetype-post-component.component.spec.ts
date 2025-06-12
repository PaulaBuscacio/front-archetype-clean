import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchetypePostComponentComponent } from './archetype-post-component.component';

describe('ArchetypePostComponentComponent', () => {
  let component: ArchetypePostComponentComponent;
  let fixture: ComponentFixture<ArchetypePostComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchetypePostComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArchetypePostComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
