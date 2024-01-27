import { EInfectionVariant, Person } from './types.js';
import { faker } from '@faker-js/faker';

export const printPerson = (person: Person, indent: string = "|"): void => {
  const status = person.infectionStatus ? person.infectionStatus : "Healthy";
  const parent = person.parentNode ? person.parentNode.name : "None"
  console.log(`${indent}${person.name} (${person.age} y/o, ${status}), parent : ${parent}`);
  if (person.relations.length > 0) {
    indent += "-";
    for (const friend of person.relations) {
      printPerson(friend, indent);
    }
  }
}
export const printPopulation = (population: Person[]): void => {
  population.forEach(value => {
    printPerson(value, "|")
  })
}

export const isAlive = (p: Person) => {
  return p.isAlive;
};

export const isHealthy = (p: Person) => {
  return p.infectionStatus === undefined;
}

export const infectPerson = (person: Person, variant: EInfectionVariant): Person => {
  return {...person, infectionStatus: variant}
}

export const infectPersonAndRelationsRecursive = (p: Person, variant: EInfectionVariant): void => {
  p = infectPerson(p, variant);
  p.relations.forEach(p => infectPersonAndRelationsRecursive(p, variant))
}

export const getRandomPerson = (people: Person[]): Person => {
  const index = faker.number.int({min: 0, max: people.length})
  console.log("index", index);
  return people.at(index);
}
