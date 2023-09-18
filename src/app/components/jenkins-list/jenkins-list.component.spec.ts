import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JenkinsListComponent } from './jenkins-list.component';

describe('JenkinsListComponent', () => {
  let component: JenkinsListComponent;
  let fixture: ComponentFixture<JenkinsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JenkinsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JenkinsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
