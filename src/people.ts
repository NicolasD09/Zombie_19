import { Person } from './types.js';
import { faker } from '@faker-js/faker';

const getRandomPerson = (): Person => ({
  name: faker.person.firstName(),
  age: faker.number.int({min: 18, max: 54}),
  infectionStatus: undefined,
  relations: [],
  immuneTo: [],
  isAlive: true
})

const generateRelations = (): Person[] => {
  return Array.from({length: faker.number.int({min: 3, max: 3})})
    .map(() => getRandomPerson())
}
const createPerson = (): Person => {
  const person= getRandomPerson()
  person.relations = generateRelations();

  // générer un 2e niveau par défaut
  person.relations.forEach(p => {
    p.relations = generateRelations();

    // générer un 3e niveau de manière aléatoire
    const randomBoolean = Math.random() < 0.20;

    if(randomBoolean) {
      p.relations.forEach(p => p.relations = generateRelations())
    }

  })

  return person;
}

export const createPopulation = (): Person[] => {
  return Array.from({length:  faker.number.int({min: 3, max: 5})})
    .map(() => createPerson())
}
