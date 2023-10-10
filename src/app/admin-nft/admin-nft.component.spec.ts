import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNftComponent } from './admin-nft.component';

describe('AdminNftComponent', () => {
  let component: AdminNftComponent;
  let fixture: ComponentFixture<AdminNftComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminNftComponent]
    });
    fixture = TestBed.createComponent(AdminNftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
