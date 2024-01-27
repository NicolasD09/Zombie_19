import { Person } from './types.js';
import { faker } from '@faker-js/faker';
import { isAlive } from './people.js';

export const getPersonInformationString = (person: Person, indent: string = ''): string => {
  const status = person.infectionStatus ? person.infectionStatus : 'Healthy';
  const parent = person.parentNode ? person.parentNode.name : 'None';
  return `${indent}${person.name} (${person.age} y/o, ${status}), parent : ${parent}, ${isAlive(person) ? 'alive' : 'dead'}, immune to ${person.immuneTo.length} variants`;
}
export const printPerson = (person: Person, indent: string = '|'): void => {
  console.log(getPersonInformationString(person, indent));
  if (person.relations.length > 0) {
    indent += '-';
    for (const friend of person.relations) {
      printPerson(friend, indent);
    }
  }
};
export const printPopulation = (population: Person[]): void => {
  population.forEach(value => {
    printPerson(value, '|');
  });
};

export const getRandomPerson = (people: Person[]): Person => {
  const index = faker.number.int({ min: 0, max: people.length });
  const person = people.at(index);

  // Ne pas récupérer les personnes du dernier niveau
  if(person.relations.length === 0) {
    return getRandomPerson(people)
  }

  return person;
};
