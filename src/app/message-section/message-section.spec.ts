import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageSection } from './message-section';

describe('MessageSection', () => {
  let component: MessageSection;
  let fixture: ComponentFixture<MessageSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
