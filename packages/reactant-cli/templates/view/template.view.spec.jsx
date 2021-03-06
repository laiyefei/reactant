import { testBed } from 'reactant';
import { TemplateView } from './template.view';

describe('TemplateView', () => {
  let module;

  beforeEach(() => {
    module = testBed({
      main: TemplateView,
      modules: [],
    }).instance;
  });

  test('should be created', () => {
    expect(module instanceof TemplateView).toBeTruthy();
  });
});
