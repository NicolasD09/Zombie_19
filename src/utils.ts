import { EInfectionVariant, Person } from './types.js';
import { faker } from '@faker-js/faker';

export const getPersonInformationString = (person: Person, indent: string = ''): string => {
  const status = person.infectionStatus ? person.infectionStatus : 'Healthy';
  const parent = person.parentNode ? person.parentNode.name : 'None';
  return `${indent}${person.name} (${person.age} y/o, ${status}), parent : ${parent}`;
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

export const isAlive = (p: Person) => {
  return p.isAlive;
};

export const isHealthy = (p: Person) => {
  return p.infectionStatus === undefined;
};

export const infectPerson = (person: Person, variant: EInfectionVariant): void => {
  person.infectionStatus = variant;
};

export const infectPersonAndRelations = (person: Person, variant: EInfectionVariant): void => {
  infectPerson(person, variant);
  person.relations.forEach(p => infectPerson(p, variant));
}

export const infectPersonAndRelationsRecursive = (p: Person, variant: EInfectionVariant): void => {
  infectPerson(p, variant);

  if(p.relations.length === 0) {
    return;
  }

  p.relations.forEach(p => infectPersonAndRelationsRecursive(p, variant));
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
