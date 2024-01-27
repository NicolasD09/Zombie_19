import { EInfectionVariant, Person, Vaccine, VaccineApplyFunction } from './types.js';


export const immunizeCompletely: VaccineApplyFunction = (person: Person) => {
  person.infectionStatus = undefined; // Healthy again
  person.immuneTo = [
    EInfectionVariant.ZOMBIE_A,
    EInfectionVariant.ZOMBIE_B,
    EInfectionVariant.ZOMBIE_C,
    EInfectionVariant.ZOMBIE_32,
    EInfectionVariant.ZOMBIE_19,
    EInfectionVariant.ZOMBIE_U,
  ]
}

export const applyB1Vaccine: VaccineApplyFunction = (person: Person) => {
  if(Math.random() > 0.5) {
    person.isAlive = false // u ded
  } else {
    person.infectionStatus = undefined; // Healthy again
  }
}

export const vaccinateEveryone = (people: Person[], person: Person, vaccine: Vaccine): Person[] => {
  vaccinateRecursive(person, vaccine);

  return people;
};

export const vaccinateRecursive = (p: Person, vaccine: Vaccine): void => {
  vaccinatePerson(p, vaccine);

  if(p.relations.length === 0) {
    return;
  }

  p.relations.forEach(p => vaccinateRecursive(p, vaccine));
};

export const vaccinatePerson = (person: Person, vaccine: Vaccine): void => {
  if(vaccine.canApply(person)) {
    vaccine.apply(person);
  }
};

const applyVaccine = (people: Person[], vaccine: Vaccine): Person[] => {
  function vaccinateTree(index: number): Person[] {
    const tree = people[index];
    if (index === people.length) {
      return people;
    }
    vaccinateEveryone(people, tree, vaccine);
    return vaccinateTree(index + 1);
  }

  return vaccinateTree(0);
}
export const vaccinateWith = (people: Person[], vaccine: Vaccine): Person[] => {
  const vaccinatedPopulation: Person[] = applyVaccine(people, vaccine);

  if (vaccinatedPopulation === null) {
    throw new Error(`Vaccine ${vaccine.type} unknown or not implemented`);
  }

  return vaccinatedPopulation;
}