import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCommingSoonComponent } from './page-comming-soon.component';

describe('PageCommingSoonComponent', () => {
  let component: PageCommingSoonComponent;
  let fixture: ComponentFixture<PageCommingSoonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageCommingSoonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageCommingSoonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
