import { TestBed } from '@angular/core/testing';

import { GitlabProjectInterceptor } from './gitlab-project.interceptor';

describe('GitlabProjectInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      GitlabProjectInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: GitlabProjectInterceptor = TestBed.inject(GitlabProjectInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
