import { EInfectionVariant, Person } from './types.js';
import { infectPersonAndRelationsRecursive } from './utils.js';

type InfectionFunction = (people: Person[], index: number) => Person[];
const infectTopToBottom: InfectionFunction = (people: Person[], startIndex: number) => {
  const newPeople = Array.from(people);

  const currentPerson = newPeople[startIndex];
  newPeople[startIndex] = infectPersonAndRelationsRecursive(currentPerson, EInfectionVariant.ZOMBIE_A);

  if(startIndex === people.length - 1) {
    return newPeople;
  }

  return infectTopToBottom(newPeople, startIndex + 1);
}

const getInfection = (people: Person[], variant: EInfectionVariant, index: number) => {
  switch (variant) {
    case EInfectionVariant.ZOMBIE_A:
      return infectTopToBottom(people, index);
    default:
      return null;
  }
};
export const infectAllFrom = (people: Person[], startIndex: number, variant: EInfectionVariant): Person[] => {
  return getInfection(people, variant, startIndex);
};
