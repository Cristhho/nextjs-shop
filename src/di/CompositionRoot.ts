import { bindAddressUseCases } from './addressUseCases/bindings';
import { bindCartUseCases } from './cartUseCases/bindings';
import { bindCategiryUseCases } from './categoryUseCases/bindings';
import { DiContainer } from './container';
import { bindCountryUseCases } from './countryUseCases/bindings';
import { bindMemory } from './memory/bindings';
import { bindOrderUseCases } from './orderUseCases/bindings';
import { bindPrisma } from './prisma/bindings';
import { bindProductUseCases } from './productUseCases/bindings';
import { bindRepository } from './repository/bindings';
import { bindUserUseCases } from './userUseCases/bindings';
import { bindZustand } from './zustand/bindings';

export const diInstance = DiContainer.getInstance();

export function init() {
  initApp();
  bindRepository();
  bindProductUseCases();
  bindCategiryUseCases();
  bindCartUseCases();
  bindAddressUseCases();
  bindCountryUseCases();
  bindOrderUseCases();
  bindUserUseCases();
}

function initApp() {
  bindPrisma();
  bindMemory();
  bindZustand();
}
