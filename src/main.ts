import { createPopulation, getPopulationFlattened } from './people.js';
import { getPersonInformationString, getRandomPerson, printPopulation } from './utils.js';
import { infectAllFrom } from './infection.js';
import { getVariant } from './variant.js';
import { EInfectionVariant, EVaccine } from './types.js';
import { vaccinateWith } from './vaccinate.js';
import { getVaccine } from './vaccine.js';

const population = createPopulation();
const populationFlattened = getPopulationFlattened(population);
const startingPoint = getRandomPerson(populationFlattened);

console.log(`Starting infection with ${getPersonInformationString(startingPoint)}`);

printPopulation(population);

const variant = getVariant(EInfectionVariant.ZOMBIE_U);
console.log(('---------------------------------------------------------------'));
console.log(('---------------------------------------------------------------'));
console.log(('---------------------------------------------------------------'));

const infectedPopulation = infectAllFrom(population, startingPoint, variant);

printPopulation(infectedPopulation);

console.log(('---------------------------------------------------------------'));
console.log(('---------------------------------------------------------------'));
console.log(('---------------------------------------------------------------'));

const vaccinatedPopulation = vaccinateWith(
  infectedPopulation,
  getVaccine(EVaccine.U),
);

printPopulation(vaccinatedPopulation);

const newInfection = infectAllFrom(population, startingPoint, variant);

printPopulation(newInfection);
