import { EInfectionVariant, EVaccine, Vaccine } from './types.js';
import { immunizeCompletely, applyB1Vaccine } from './vaccinate.js';
import { isHealthy } from './people.js';

export const getVaccine = (type: EVaccine): Vaccine => {
  return vaccines.find(v => v.type === type);
}

const canApplyA1Vaccine = (p): boolean => {
  return !isHealthy(p) &&
    (p.infectionStatus === EInfectionVariant.ZOMBIE_32 || p.infectionStatus === EInfectionVariant.ZOMBIE_A) &&
    p.age <= 30;
}

const canApplyB1Vaccine = (p): boolean => {
  return !isHealthy(p) &&
    (p.infectionStatus === EInfectionVariant.ZOMBIE_B || p.infectionStatus === EInfectionVariant.ZOMBIE_C);
}
export const vaccines: Vaccine[] = [
  {
    type: EVaccine.A1,
    canApply: canApplyA1Vaccine,
    apply: immunizeCompletely
  },
  {
    type: EVaccine.B1,
    canApply: canApplyB1Vaccine,
    apply: applyB1Vaccine
  },
  {
    type: EVaccine.U,
    canApply: (p) => !isHealthy(p),
    apply: immunizeCompletely
  }
]
