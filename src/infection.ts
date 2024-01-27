import { EInfectionVariant, InfectionFunction, Person, Variant } from './types.js';
import { infectPersonAndRelationsRecursive } from './utils.js';

// Zombie_A
export const infectTopToBottom: InfectionFunction = (people: Person[], startingPoint: Person, variant: EInfectionVariant) => {
  const newPeople = Array.from(people);

  infectPersonAndRelationsRecursive(startingPoint, variant);

  if(startingPoint === people.length - 1) {
    return newPeople;
  }

  return infectTopToBottom(newPeople, startingPoint + 1, variant);
}

// Zombie_B
export const infectBottomToTop: InfectionFunction = (people: Person[], startingPoint: Person, variant: EInfectionVariant) => {
  const newPeople = Array.from(people);

  const currentPerson = newPeople[startingPoint];
  newPeople[startingPoint] = infectPersonAndRelationsRecursive(currentPerson, variant);

  if(startingPoint === 0) {
    return newPeople;
  }

  return infectBottomToTop(newPeople, startingPoint - 1, variant);
}

// Zombie_19
export const infectEveryone = (people: Person[], startingPoint: Person, variant: EInfectionVariant): Person[] => {
  const firstIndex = 0;
  const lastIndex = people.length - 1;

  if(startingPoint === firstIndex) {
    return infectTopToBottom(people, startingPoint, variant);
  }

  if(startingPoint === lastIndex) {
    return infectBottomToTop(people, startingPoint, variant);
  }

  const firstInfection = infectBottomToTop(people, startingPoint, variant);
  const nextInfection = infectTopToBottom(firstInfection, startingPoint + 1, variant);

  return nextInfection;
}
export const infectAllFrom = (people: Person[], startingPoint: Person, variant: Variant): Person[] => {
  console.log("Infect all from index ", startingPoint);
  const newInfectedPopulation = variant.infect(people, startingPoint, variant.name);

  if(newInfectedPopulation === null) {
    throw new Error(`Variant ${variant} unknown or not implemented`);
  }

  return newInfectedPopulation;
};
