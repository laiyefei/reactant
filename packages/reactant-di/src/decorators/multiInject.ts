import { multiInject as multiInjectWithInversify, decorate } from 'inversify';
import { ServiceIdentifier } from '../interfaces';

export function multiInject(serviceIdentifier: ServiceIdentifier<any>) {
  return (target: object, targetKey?: string, index?: number) => {
    decorate(
      multiInjectWithInversify(serviceIdentifier) as ClassDecorator,
      target,
      index
    );
  };
}
