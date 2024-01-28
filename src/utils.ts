import { Person } from './types.js';
import { faker } from '@faker-js/faker';
import { isAlive, isHealthy, isImmune } from './people.js';
import chalk from 'chalk';

export const getPersonInformationString = (person: Person, indent: string = ''): string => {
  const status = person.infectionStatus ? person.infectionStatus : 'Healthy';
  return `${indent}${person.name} (${person.age}, ${status}), ${isAlive(person) ? 'alive' : 'dead'}, immune to ${person.immuneTo.length} variants`;
}

const formatPerson = (person: Person, indent: string): string => {
  if(!person.isAlive) {
    return chalk.bgRed(getPersonInformationString(person, indent));
  }
  if(!isHealthy(person)) {
    return chalk.bgYellow(getPersonInformationString(person, indent));
  }
  if(isHealthy(person) && isImmune(person)) {
    return chalk.bgGreen(getPersonInformationString(person, indent));
  }
  return getPersonInformationString(person, indent);
}

export const printPerson = (person: Person, indent: string = '|'): void => {
  console.log(formatPerson(person, indent));
  if (person.relations.length > 0) {
    indent += '-';
    for (let i = 0; i < person.relations.length; i++) {
      printPerson(person.relations[i], indent);
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
