import { EInfectionVariant, Person } from './types.js';
import { infectPersonAndRelationsRecursive } from './utils.js';

type InfectionFunction = (people: Person[], index: number, variant: EInfectionVariant) => Person[];
const infectTopToBottom: InfectionFunction = (people: Person[], startIndex: number, variant: EInfectionVariant) => {
  const newPeople = Array.from(people);

  const currentPerson = newPeople[startIndex];
  newPeople[startIndex] = infectPersonAndRelationsRecursive(currentPerson, variant);

  if(startIndex === people.length - 1) {
    return newPeople;
  }

  return infectTopToBottom(newPeople, startIndex + 1, variant);
}

const infectBottomToTop: InfectionFunction = (people: Person[], startIndex: number, variant: EInfectionVariant) => {
  const newPeople = Array.from(people);

  const currentPerson = newPeople[startIndex];
  newPeople[startIndex] = infectPersonAndRelationsRecursive(currentPerson, variant);

  if(startIndex === 0) {
    return newPeople;
  }

  return infectBottomToTop(newPeople, startIndex - 1, variant);
}

const infectEveryone = (people: Person[], startIndex: number, variant: EInfectionVariant): Person[] => {
  const firstIndex = 0;
  const lastIndex = people.length - 1;

  if(startIndex === firstIndex) {
    return infectTopToBottom(people, startIndex, variant);
  }

  if(startIndex === lastIndex) {
    return infectBottomToTop(people, startIndex, variant);
  }

  const firstInfection = infectBottomToTop(people, startIndex, variant);
  const nextInfection = infectTopToBottom(firstInfection, startIndex + 1, variant);

  return nextInfection;
}

const infectPeopleForVariant = (people: Person[], variant: EInfectionVariant, index: number): Person[] | null => {
  switch (variant) {
    case EInfectionVariant.ZOMBIE_A:
      return infectTopToBottom(people, index, variant);
    case EInfectionVariant.ZOMBIE_B:
      return infectBottomToTop(people, index, variant);
    case EInfectionVariant.ZOMBIE_19:
      return infectEveryone(people, index, variant);
    default:
      return null;
  }
};
export const infectAllFrom = (people: Person[], startIndex: number, variant: EInfectionVariant): Person[] => {
  console.log("Infect all from index ", startIndex);
  const newInfectedPopulation = infectPeopleForVariant(people, variant, startIndex);

  if(newInfectedPopulation === null) {
    throw new Error(`Variant ${variant} unknown or not implemented`);
  }

  return newInfectedPopulation;
};
