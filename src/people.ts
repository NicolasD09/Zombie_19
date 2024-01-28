import { Person } from './types.js';
import { faker } from '@faker-js/faker';

const getRandomPerson = (): Person => ({
  name: faker.person.firstName(),
  age: faker.number.int({ min: 18, max: 54 }),
  infectionStatus: undefined,
  relations: [],
  immuneTo: [],
  isAlive: true,
  parentNode: undefined,
});

const generateRelations = (p: Person): Person[] => {
  return Array.from({ length: faker.number.int({ min: 2, max: 6 }) })
    .map(() => ({ ...getRandomPerson(), parentNode: p }));
};
const createPerson = (): Person => {
  const person = getRandomPerson();
  person.relations = generateRelations(person);

  // générer un 2e niveau par défaut
  person.relations.forEach(p => {
    p.relations = generateRelations(p);

    // générer un 3e niveau de manière aléatoire
    const create3rdLevel = Math.random() < 1;

    if (create3rdLevel) {
      p.relations.forEach(p => {
        p.relations = generateRelations(p);

        // générer un 4e niveau de manière aléatoire
        const create4thLevel = Math.random() < 0.25;

        if (create4thLevel) {
          p.relations.forEach(p => p.relations = generateRelations(p));
        }

      });
    }


  });

  return person;
};

export const createPopulation = (): Person[] => {
  const nbPersons = faker.number.int({ min: 3, max: 6 });
  const people: Person[] = [];

  for (let i = 0; i < nbPersons; i++) {
    people.push(createPerson());
  }

  return people;
};

export const getPopulationFlattened = (population: Person[]): Person[] => {
  const people: Person[] = [];

  function add(person: Person): void {
    people.push(person);
    if (person.relations && person.relations.length !== 0) {
      person.relations.forEach(add);
    }
  }

  population.forEach(person => {
    add(person);
  });

  return people;
};

export const isAlive = (p: Person): boolean => {
  return p.isAlive;
};

export const isHealthy = (p: Person): boolean => {
  return p.infectionStatus === undefined;
};

export const isImmune = (p: Person): boolean => {
  return p.immuneTo.length !== 0;
}
