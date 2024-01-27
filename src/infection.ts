import { EInfectionVariant, InfectionFunction, Person, Variant } from './types.js';
import { infectPersonAndRelationsRecursive } from './utils.js';

// Zombie_A
export const infectTopToBottom: InfectionFunction = (people: Person[], person: Person, variant: EInfectionVariant) => {
  infectPersonAndRelationsRecursive(person, variant);

  return people;
}

// Zombie_B
export const infectBottomToTop: InfectionFunction = (people: Person[], person: Person, variant: EInfectionVariant) => {
  infectPersonAndRelationsRecursive(person, variant)

  if(!person.parentNode) {
    return people;
  }

  return infectBottomToTop(people, person.parentNode, variant);
}

// Zombie_19
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const infectEveryone = (people: Person[], _: Person, variant: EInfectionVariant): Person[] => {
  function infectTree(index: number): Person[] {
    const tree = people[index];
    if(index === people.length) {
      return people;
    }
    infectTopToBottom(people, tree, variant);
    return infectTree(index+1)
  }

  return infectTree(0);
}
export const infectAllFrom = (people: Person[], startingPoint: Person, variant: Variant): Person[] => {
  const newInfectedPopulation = variant.infect(people, startingPoint, variant.name);

  if(newInfectedPopulation === null) {
    throw new Error(`Variant ${variant} unknown or not implemented`);
  }

  return newInfectedPopulation;
};
