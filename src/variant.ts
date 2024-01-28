import { EInfectionVariant, Variant } from './types.js';
import {
  infectBottomToTop,
  infectEveryone,
  infectGroupOnly,
  infectOver32,
  infectRootOnly,
  infectTopToBottom,
} from './infection.js';
import { isHealthy } from './people.js';
import { isImmuneTo } from './vaccine.js';

export const variants: Variant[] = [
  {
    name: EInfectionVariant.ZOMBIE_19,
    infect: infectEveryone,
    condition: (p): boolean => isHealthy(p) && !isImmuneTo(p, EInfectionVariant.ZOMBIE_19),
  },
  {
    name: EInfectionVariant.ZOMBIE_A,
    infect: infectTopToBottom,
    condition: (p): boolean => isHealthy(p) && !isImmuneTo(p, EInfectionVariant.ZOMBIE_A),
  },
  {
    name: EInfectionVariant.ZOMBIE_B,
    infect: infectBottomToTop,
    condition: (p): boolean => isHealthy(p) && !isImmuneTo(p, EInfectionVariant.ZOMBIE_B),
  },
  {
    name: EInfectionVariant.ZOMBIE_C,
    infect: infectGroupOnly,
    condition: (p) => isHealthy(p) && (Math.random() > 0.5)  && !isImmuneTo(p, EInfectionVariant.ZOMBIE_C),
  },
  {
    name: EInfectionVariant.ZOMBIE_32,
    infect: infectOver32,
    condition: (p) => isHealthy(p) && (p.age >= 32)  && !isImmuneTo(p, EInfectionVariant.ZOMBIE_32),
  },
  {
    name: EInfectionVariant.ZOMBIE_U,
    infect: infectRootOnly,
    condition: (p) => isHealthy(p) && p.parentNode === undefined && !isImmuneTo(p, EInfectionVariant.ZOMBIE_U),
  },
];

export const getVariant = (name: EInfectionVariant): Variant => {
  return variants.find(v => v.name === name);
};
