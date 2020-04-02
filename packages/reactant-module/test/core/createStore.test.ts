import { Store, Action, Middleware } from 'redux';
import { injectable, createContainer, createStore, state, action } from '../..';

test('`createStore` with base pararms', () => {
  @injectable()
  class Counter {
    @state
    count = 0;
  }
  const ServiceIdentifiers = new Map();
  const modules = [Counter];
  const container = createContainer({
    ServiceIdentifiers,
    modules,
    options: {
      defaultScope: 'Singleton',
    },
  });
  container.get(Counter);
  const store = createStore(container, ServiceIdentifiers);
  expect(Object.values(store.getState())).toEqual([{ count: 0 }]);
});

test('`createStore` with base preloadedState pararms', () => {
  @injectable()
  class Counter {
    name = 'counter';

    @state
    count = 0;
  }
  const ServiceIdentifiers = new Map();
  const modules = [Counter];
  const container = createContainer({
    ServiceIdentifiers,
    modules,
    options: {
      defaultScope: 'Singleton',
    },
  });
  container.get(Counter);
  const store = createStore(container, ServiceIdentifiers, {
    counter: { count: 18 },
  });
  expect(Object.values(store.getState())).toEqual([{ count: 18 }]);
});

test('`createStore` with base middlewares pararms', () => {
  @injectable()
  class Counter {
    name = 'counter';

    @state
    count = 0;

    @action
    increase() {
      this.count += 1;
    }
  }
  const ServiceIdentifiers = new Map();
  const modules = [Counter];
  const container = createContainer({
    ServiceIdentifiers,
    modules,
    options: {
      defaultScope: 'Singleton',
    },
  });
  const couter = container.get(Counter);
  const actionFn = jest.fn();
  const logger: Middleware = store => next => _action => {
    actionFn(_action);
    const result = next(_action);
    actionFn(store.getState());
    return result;
  };
  const store = createStore(container, ServiceIdentifiers, undefined, [logger]);
  couter.increase();
  expect(actionFn.mock.calls.length).toBe(2);
  expect(actionFn.mock.calls[0]).toEqual([
    {
      _reactant: true,
      method: 'increase',
      state: { count: 1 },
      type: 'counter',
    },
  ]);
  expect(actionFn.mock.calls[1]).toEqual([{ counter: { count: 1 } }]);
});

test('`createStore` with base providers pararms', () => {
  // TODO: providers testing
});

test.only('`createStore` with base devOptions pararms', () => {
  @injectable()
  class Counter {
    name = 'counter';

    @state
    count = 0;

    @state
    sum = { count: 0 };

    @action
    increase() {
      this.sum.count += 1;
    }
  }
  const ServiceIdentifiers = new Map();
  const modules = [Counter];
  const container = createContainer({
    ServiceIdentifiers,
    modules,
    options: {
      defaultScope: 'Singleton',
    },
  });
  const couter = container.get(Counter);
  const store = createStore(
    container,
    ServiceIdentifiers,
    undefined,
    undefined,
    undefined,
    { autoFreeze: true }
  );
  expect(() => {
    store.getState().counter.sum.count = 1;
  }).toThrowError(/Cannot assign to read only property/);
  couter.increase();
  expect(() => {
    store.getState().counter.sum.count = 1;
  }).toThrowError(/Cannot assign to read only property/);

  // TODO: freeze root state.
  // expect(() => {
  //   store.getState().counter.count = 1;
  // }).toThrowError(/Cannot assign to read only property/);
});
