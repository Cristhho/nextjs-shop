import { Container } from 'inversify';

type Newable<T> = new (...args: any[]) => T;

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

  bindSingleton<T, V extends T>(token: symbol, bindTo: Newable<V>) {
    this.container.bind<T>(token).to(bindTo).inSingletonScope();
  }

  get<T>(token: symbol) {
    return this.container.get<T>(token);
  }
}
