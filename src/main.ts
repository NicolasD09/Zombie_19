import { createPopulation } from './people.js';
import { infectAllFrom } from './infection.js';
import { EInfectionVariant } from './types.js';
import { printPopulation } from './utils.js';

const population = createPopulation();

printPopulation(population);
console.log("--------------------------------------------------");
printPopulation(infectAllFrom(population, Math.ceil(population.length / 2), EInfectionVariant.ZOMBIE_19))
