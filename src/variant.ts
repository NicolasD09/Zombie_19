import { EInfectionVariant, Variant } from './types.js';
import {
  infectBottomToTop,
  infectEveryone,
  infectGroupOnly,
  infectOver32,
  infectRootOnly,
  infectTopToBottom,
} from './infection.js';

export const variants: Variant[] = [
  {
    name: EInfectionVariant.ZOMBIE_19,
    infect: infectEveryone,
    condition: () => true
  },
  {
    name: EInfectionVariant.ZOMBIE_A,
    infect: infectTopToBottom,
    condition: () => true
  },
  {
    name: EInfectionVariant.ZOMBIE_B,
    infect: infectBottomToTop,
    condition: () => true
  },
  {
    name: EInfectionVariant.ZOMBIE_C,
    infect: infectGroupOnly,
    condition: () => Math.random() > 0.5
  },
  {
    name: EInfectionVariant.ZOMBIE_32,
    infect: infectOver32,
    condition: (p) => p.age >= 32
  },
  {
    name: EInfectionVariant.ZOMBIE_U,
    infect: infectRootOnly,
    condition: (p) => p.parentNode === undefined
  },
]

export const getVariant = (name:EInfectionVariant) => {
  return variants.find(v => v.name === name);
}
