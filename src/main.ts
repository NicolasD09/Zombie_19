import { createPopulation } from './people.js';
import { printPopulation } from './utils.js';
import { infectAllFrom } from './infection.js';
import { EInfectionVariant } from './types.js';

const population = createPopulation();

infectAllFrom(population, 0, EInfectionVariant.ZOMBIE_A);

printPopulation(infectAllFrom(population, 0, EInfectionVariant.ZOMBIE_A))
