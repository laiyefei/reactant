/* eslint-disable func-names */
import { produce, produceWithPatches, Patch } from 'immer';
import { ReactantAction, Service } from '../interfaces';
import {
  storeKey,
  stateKey,
  actionIdentifier,
  enablePatchesKey,
} from '../constants';

let stagedState: Record<string, unknown> | undefined;

const getStagedState = () => stagedState;

/**
 * ## Description
 *
 * `@action` is used to decorate a class method as a action method.
 *
 * ## Example
 *
 * ```ts
 * @injectable()
 * class Counter {
 *   @state
 *   count = 0;
 *
 *   @action
 *   increase() {
 *     this.count += 1;
 *   }
 * }
 *
 * const app = testBed({
 *   modules: [],
 *   main: Counter,
 * });
 *
 * app.instance.increase();
 * expect(app.instance.count).toBe(1);
 * ```
 */
const action = (
  target: object,
  key: string,
  descriptor: TypedPropertyDescriptor<(...args: any[]) => void>
) => {
  const fn = descriptor.value;
  if (typeof fn !== 'function') {
    throw new Error(
      `${String(key)} can only be decorated by '@action' as a class method.`
    );
  }
  const value = function (this: Service, ...args: unknown[]) {
    let time: number;
    if (__DEV__) {
      time = Date.now();
    }
    if (typeof stagedState === 'undefined') {
      try {
        const lastState = this[storeKey]?.getState();
        let state: Record<string, unknown>;
        let patches: Patch[] | undefined;
        let inversePatches: Patch[] | undefined;
        if (this[enablePatchesKey]) {
          [state, patches, inversePatches] = produceWithPatches<
            Record<string, unknown>
          >(lastState, (draftState) => {
            stagedState = draftState;
            fn.apply(this, args);
          });
        } else {
          state = produce<Record<string, unknown>>(lastState, (draftState) => {
            stagedState = draftState;
            fn.apply(this, args);
          });
        }
        stagedState = undefined;
        if (__DEV__) {
          if (this[stateKey] === state) {
            console.warn(`There are no state updates to method ${fn.name}`);
          }
          // performance checking
          const executionTime = Date.now() - time!;
          if (executionTime > 100)
            console.warn(
              `The execution time of method '${key.toString()}' is ${executionTime} ms, it's recommended to use 'dispatch' API.`
            );
          // performance detail: https://immerjs.github.io/immer/docs/performance
        }
        this[storeKey]!.dispatch<ReactantAction>({
          type: this.name!,
          method: key,
          state,
          lastState,
          _reactant: actionIdentifier,
          ...(this[enablePatchesKey]
            ? {
                _patches: patches,
                _inversePatches: inversePatches,
              }
            : {}),
        });
      } finally {
        stagedState = undefined;
      }
    } else {
      // enable staged state mode.
      fn.apply(this, args);
    }
  };
  return {
    ...descriptor,
    value,
  };
};

export { getStagedState, action };
