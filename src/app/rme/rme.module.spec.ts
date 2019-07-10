import { RmeModule } from './rme.module';

describe('RmeModule', () => {
  let rmeModule: RmeModule;

  beforeEach(() => {
    rmeModule = new RmeModule();
  });

  it('should create an instance', () => {
    expect(rmeModule).toBeTruthy();
  });
});
