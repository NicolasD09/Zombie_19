import { EInfectionVariant, Variant } from './types.js';
import { infectBottomToTop, infectEveryone, infectTopToBottom } from './infection.js';

export const variants: Variant[] = [
  {
    name: EInfectionVariant.ZOMBIE_19,
    infect: infectEveryone
  },
  {
    name: EInfectionVariant.ZOMBIE_A,
    infect: infectTopToBottom
  },
  {
    name: EInfectionVariant.ZOMBIE_B,
    infect: infectBottomToTop
  },
  {
    name: EInfectionVariant.ZOMBIE_C,
    infect: (p) => ({...p, infectionStatus: EInfectionVariant.ZOMBIE_C})
  },
  {
    name: EInfectionVariant.ZOMBIE_32,
    infect: () => []
  },
  {
    name: EInfectionVariant.ZOMBIE_U,
    infect: () => []
  },
]

export const getVariant = (name:EInfectionVariant) => {
  return variants.find(v => v.name === name);
}
