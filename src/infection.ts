import { EInfectionVariant, Person } from './types.js';
import { infectPerson } from './utils.js';

type InfectionFunction = (people: Person[]) => (index: number) => Person[];
const infectTopToBottom: InfectionFunction = (people: Person[]) => {
  const newPeople = Array.from(people);

  return (index: number) => {
    const currentPerson = newPeople[index];
    const newPerson = infectPerson(currentPerson, EInfectionVariant.ZOMBIE_A);
    newPerson.relations = currentPerson.relations.map(p => infectPerson(p, EInfectionVariant.ZOMBIE_A))

    newPeople[index] = newPerson;
    return newPeople;
  };
}

const getInfection = (people: Person[], variant: EInfectionVariant) => {
  switch (variant) {
    case EInfectionVariant.ZOMBIE_A:
      return infectTopToBottom(people);
    default:
      return null;
  }
};
export const infectAllFrom = (people: Person[], index: number, variant: EInfectionVariant) => {
  const infect = getInfection(people, variant);
  return infect(index)
};
