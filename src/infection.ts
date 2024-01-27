import { Condition, EInfectionVariant, InfectionFunction, Person, Variant } from './types.js';
import { isHealthy } from './people.js';

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
  const newInfectedPopulation: Person[] = variant.infect(people, startingPoint, variant.name, variant.condition);

  if (newInfectedPopulation === null) {
    throw new Error(`Variant ${variant} unknown or not implemented`);
  }

  return newInfectedPopulation;
};

export const infectPerson = (person: Person, variant: EInfectionVariant, condition: Condition): void => {
  if(condition(person) && isHealthy(person)) {
    person.infectionStatus = variant;
  }
};

export const infectPersonRelations = (person: Person, variant: EInfectionVariant, condition: Condition): void => {
  if(condition(person)) {
    person.relations.forEach(p => infectPerson(p, variant, condition))
  }
}

export const infectPersonAndRelationsRecursive = (p: Person, variant: EInfectionVariant, condition: Condition): void => {
  infectPerson(p, variant, condition);

  if(p.relations.length === 0) {
    return;
  }

  p.relations.forEach(p => infectPersonAndRelationsRecursive(p, variant, condition));
};
