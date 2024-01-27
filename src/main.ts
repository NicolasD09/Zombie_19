import { createPopulation, getPopulationFlattened } from './people.js';
import { getRandomPerson, getPersonInformationString, printPopulation } from './utils.js';
import { infectAllFrom } from './infection.js';
import { getVariant } from './variant.js';
import { EInfectionVariant } from './types.js';

const population = createPopulation();
const populationFlattened = getPopulationFlattened(population);
const startingPoint = getRandomPerson(populationFlattened)

console.log(`Starting infection with ${getPersonInformationString(startingPoint)}`);

printPopulation(population);

const variant = getVariant(EInfectionVariant.ZOMBIE_U);
console.log(('---------------------------------------------------------------'));
printPopulation(infectAllFrom(population, startingPoint, variant));

