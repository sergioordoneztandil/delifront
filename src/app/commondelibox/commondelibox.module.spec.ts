import { CommondeliboxModule } from './commondelibox.module';

describe('CommondeliboxModule', () => {
  let commondeliboxModule: CommondeliboxModule;

  beforeEach(() => {
    commondeliboxModule = new CommondeliboxModule();
  });

  it('should create an instance', () => {
    expect(commondeliboxModule).toBeTruthy();
  });
});
