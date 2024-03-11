import { Container, interfaces } from 'inversify';

type Newable<T> = new (...args: any[]) => T;

type BindingOptions = {
  targetName: string;
}

export class DiContainer {
  private static instance: DiContainer;

  private container: Container;

  private constructor() {
    this.container = new Container();
  }

  static getInstance(): DiContainer {
    if (!DiContainer.instance) {
      DiContainer.instance = new DiContainer();
    }

    return DiContainer.instance;
  }

  bindSingleton<T, V extends T>(token: symbol, bindTo: Newable<V>, options?: BindingOptions) {
    if (!options) {
      this.container
        .bind<T>(token)
        .to(bindTo)
        .inSingletonScope();
    } else {
      this.container
        .bind<T>(token)
        .to(bindTo)
        .inSingletonScope()
        .whenTargetNamed(options.targetName);
    }
  }

  bindFactory<T>(token: symbol, cb: (context: interfaces.Context) => interfaces.Factory<T, [string]>) {
    this.container.bind<interfaces.Factory<T>>(token)
      .toFactory<T, [string]>(cb);
  }

  get<T>(token: symbol) {
    return this.container.get<T>(token);
  }

  getNamed<T>(token: symbol, name: string) {
    return this.container.getNamed<T>(token, name);
  }

  getFactory<T>(token: symbol) {
    const factory = this.container.get<interfaces.Factory<T>>(token)
    return factory
  }
}
