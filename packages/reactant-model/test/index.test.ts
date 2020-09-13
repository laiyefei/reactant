/* eslint-disable no-param-reassign */
import {
  injectable,
  inject,
  createContainer,
  createStore,
} from 'reactant-module';
import { model } from '..';

test('base model with `useValue`', () => {
  const todoList: string[] = [];

  const todoModel = model({
    state: {
      todoList,
    },
    actions: {
      add: (todo: string) => (state) => {
        state.todoList.push(todo);
      },
    },
  });

  @injectable()
  class Foo {
    constructor(@inject('todo') public todo: typeof todoModel) {}

    add(todo: string) {
      this.todo.add(todo);
    }

    get todoList() {
      return this.todo.todoList;
    }
  }

  const ServiceIdentifiers = new Map();
  const modules = [Foo, { provide: 'todo', useValue: todoModel }];
  const container = createContainer({
    ServiceIdentifiers,
    modules,
    options: {
      defaultScope: 'Singleton',
    },
  });
  const foo = container.get(Foo);
  const store = createStore(
    modules,
    container,
    ServiceIdentifiers,
    new Set(),
    (...args: any[]) => {
      //
    },
    {
      middleware: [],
      beforeCombineRootReducers: [],
      afterCombineRootReducers: [],
      enhancer: [],
      preloadedStateHandler: [],
      afterCreateStore: [],
      provider: [],
    }
  );
  expect(Object.values(store.getState())).toEqual([{ todoList: [] }]);
  foo.add('test');
  expect(Object.values(store.getState())).toEqual([{ todoList: ['test'] }]);
});

test('base model with `useFactory`', () => {
  @injectable()
  class Bar {
    field = 'bar';
  }

  const todoList: string[] = [];

  const todoModel = (bar: Bar) => {
    todoList.push(bar.field);
    return model({
      name: 'todos',
      state: {
        todoList,
      },
      actions: {
        add: (todo: string) => (state) => {
          state.todoList.push(todo);
        },
      },
    });
  };

  @injectable()
  class Foo {
    constructor(@inject('todos') public todo: ReturnType<typeof todoModel>) {}

    add(todo: string) {
      this.todo.add(todo);
    }

    get todoList() {
      return this.todo.todoList;
    }
  }

  const ServiceIdentifiers = new Map();
  const modules = [
    Foo,
    { provide: 'todos', useFactory: todoModel, deps: [Bar] },
  ];
  const container = createContainer({
    ServiceIdentifiers,
    modules,
    options: {
      defaultScope: 'Singleton',
    },
  });
  const foo = container.get(Foo);
  const store = createStore(
    modules,
    container,
    ServiceIdentifiers,
    new Set(),
    (...args: any[]) => {},
    {
      middleware: [],
      beforeCombineRootReducers: [],
      afterCombineRootReducers: [],
      enhancer: [],
      preloadedStateHandler: [],
      afterCreateStore: [],
      provider: [],
    }
  );
  expect(store.getState()).toEqual({
    todos: { todoList: ['bar'] },
  });
  foo.add('test');
  expect(store.getState()).toEqual({
    todos: { todoList: ['bar', 'test'] },
  });
});
