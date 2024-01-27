import { createPopulation } from './people.js';
import { infectAllFrom } from './infection.js';
import { EInfectionVariant } from './types.js';
import { printPopulation } from './utils.js';

const population = createPopulation();

printPopulation(population);
console.log("--------------------------------------------------");
printPopulation(infectAllFrom(population, 1, EInfectionVariant.ZOMBIE_A))
