import { RmeRoutingModule } from './rme-routing.module';

describe('RmeRoutingModule', () => {
  let rmeRoutingModule: RmeRoutingModule;

  beforeEach(() => {
    rmeRoutingModule = new RmeRoutingModule();
  });

  it('should create an instance', () => {
    expect(rmeRoutingModule).toBeTruthy();
  });
});
