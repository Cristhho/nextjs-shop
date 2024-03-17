import "reflect-metadata";
import { Container, interfaces } from 'inversify';

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

  bindSingleton<T, V extends T>(token: symbol, bindTo: interfaces.Newable<V>, options?: BindingOptions) {
    if (this.container.isBound(token)) return;

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
    if (this.container.isBound(token)) return;

    this.container.bind<interfaces.Factory<T>>(token)
      .toFactory<T, [string]>(cb);
  }

  bindSelf<T>(serviceIdentifier: interfaces.Newable<T>) {
    if (this.container.isBound(serviceIdentifier)) return;
    
    this.container.bind<T>(serviceIdentifier).toSelf();
  }

  get<T>(token: interfaces.ServiceIdentifier<T>) {
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
