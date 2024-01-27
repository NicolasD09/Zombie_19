import { Person } from './types.js';
import { faker } from '@faker-js/faker';

const getRandomPerson = (): Person => ({
  name: faker.person.firstName(),
  age: faker.number.int({min: 18, max: 54}),
  infectionStatus: undefined,
  relations: [],
  immuneTo: [],
  isAlive: true,
  parentNode: undefined
})

const generateRelations = (p: Person): Person[] => {
  return Array.from({length: faker.number.int({min: 3, max: 3})})
    .map(() => ({...getRandomPerson(), parentNode: p }))
}
const createPerson = (): Person => {
  const person= getRandomPerson()
  person.relations = generateRelations(person);

  // générer un 2e niveau par défaut
  person.relations.forEach(p => {
    p.relations = generateRelations(p);

    // générer un 3e niveau de manière aléatoire
    // const randomBoolean = Math.random() < 0.20;
    //
    // if(randomBoolean) {
    //   p.relations.forEach(p => p.relations = generateRelations(p))
    // }

  })

  return person;
}

export const createPopulation = (): Person[] => {
  return Array.from({length:  faker.number.int({min: 3, max: 3})})
    .map(() => createPerson())
}

export const getPopulationFlattened = (population: Person[]): Person[] => {
  const people: Set<Person> = new Set();

  function add(person: Person) {
    people.add(person)
    if(person.relations && person.relations.length !== 0) {
      person.relations.forEach(add)
    }
  }

  population.forEach(person => {
    add(person);
  })

  return [...people];
}
