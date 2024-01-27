import { Condition, EInfectionVariant, InfectionFunction, Person, Variant } from './types.js';
import { infectPersonAndRelationsRecursive, infectPersonRelations } from './utils.js';

// Zombie_A
export const infectTopToBottom: InfectionFunction = (people: Person[], person: Person, variant: EInfectionVariant, condition?: Condition) => {
  infectPersonAndRelationsRecursive(person, variant, condition);

  return people;
};

// Zombie_B
export const infectBottomToTop: InfectionFunction = (people: Person[], person: Person, variant: EInfectionVariant, condition?: Condition) => {
  infectPersonAndRelationsRecursive(person, variant, condition);

  if (!person.parentNode) {
    return people;
  }

  return infectBottomToTop(people, person.parentNode, variant, condition);
};

// Zombie_19
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const infectEveryone = (people: Person[], _: Person, variant: EInfectionVariant): Person[] => {
  function infectTree(index: number): Person[] {
    const tree = people[index];
    if (index === people.length) {
      return people;
    }
    infectTopToBottom(people, tree, variant, () => true);
    return infectTree(index + 1);
  }

  return infectTree(0);
};

// Zombie_32
export const infectOver32 = (people: Person[], person: Person, variant: EInfectionVariant, condition: Condition): Person[] => {
  const infectToTop = infectBottomToTop(people, person, variant, condition);
  return infectTopToBottom(infectToTop, person, variant, condition);
};

// Zombie_C
export const infectGroupOnly = (people: Person[], person: Person, variant: EInfectionVariant, condition: Condition): Person[] => {
  infectPersonRelations(person.parentNode, variant, condition);
  return people;
};

// Zombie_U
export const infectRootOnly = (people: Person[], person: Person, variant: EInfectionVariant, condition: Condition): Person[] => {
  infectBottomToTop(people, person, variant, condition);
  return people;
};
export const infectAllFrom = (people: Person[], startingPoint: Person, variant: Variant): Person[] => {
  const newInfectedPopulation = variant.infect(people, startingPoint, variant.name, variant.condition);

  if (newInfectedPopulation === null) {
    throw new Error(`Variant ${variant} unknown or not implemented`);
  }

  return newInfectedPopulation;
};
