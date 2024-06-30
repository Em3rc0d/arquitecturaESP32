import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAsistanceComponent } from './register-asistance.component';

describe('RegisterAsistanceComponent', () => {
  let component: RegisterAsistanceComponent;
  let fixture: ComponentFixture<RegisterAsistanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterAsistanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterAsistanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
