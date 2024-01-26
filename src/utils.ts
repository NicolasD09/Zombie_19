import { EInfectionVariant, Person } from './types.js';

export const printPopulation = (population: Person[]): void => {
  function printPerson(person: Person, indent: string = "|"): void {
    const status = person.infectionStatus ? person.infectionStatus : "Healthy";
    console.log(`${indent}${person.name} (${person.age} y/o, ${status})`);
    if (person.relations.length > 0) {
      indent += "-";
      for (const friend of person.relations) {
        printPerson(friend, indent);
      }
    }
  }
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
