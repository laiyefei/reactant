import { Load } from '../interfaces';
import { loaderKey } from '../constants';

const load: Load = (service, options, beforeReplaceReducer) => {
  if (typeof beforeReplaceReducer !== 'function') {
    throw new Error(`The 'beforeReplaceReducer' should be a function.`);
  }
  service[loaderKey]!(options, beforeReplaceReducer);
};

export { load };
