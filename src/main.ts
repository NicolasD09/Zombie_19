import { createPopulation, getPopulationFlattened } from './people.js';
import { getRandomPerson, printPopulation } from './utils.js';
import { infectAllFrom } from './infection.js';
import { getVariant } from './variant.js';
import { EInfectionVariant } from './types.js';

const population = createPopulation();
const populationFlattened = getPopulationFlattened(population);
const startingPoint = getRandomPerson(populationFlattened)
console.log(startingPoint.name);

printPopulation(population);
console.log("--------------------------------------------------");
printPopulation(infectAllFrom(population, startingPoint, getVariant(EInfectionVariant.ZOMBIE_A)))
