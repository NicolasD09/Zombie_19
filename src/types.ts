export type Person = {
  name: string;
  age: number;
  infectionStatus: EInfectionVariant | undefined;
  relations: Person[];
  immuneTo: EInfectionVariant[];
  isAlive: boolean;
  parentNode: Person;
  isSeed: boolean; // can infect others
}

export interface Variant {
  name: EInfectionVariant;
  infect: (people: Person[], startingPoint: Person, variant: EInfectionVariant, condition: Condition) => Person[];
  condition: (p: Person) => boolean;
}

export type InfectionFunction = Variant["infect"]

export enum EInfectionVariant {
  ZOMBIE_19 = "ZOMBIE_19", // Infecte tout le monde
  ZOMBIE_A = "ZOMBIE_A", // Qui infecte du haut vers le bas. (les personnes de tous les  groupes sociaux Descendant)
  ZOMBIE_B = "ZOMBIE_B", // Qui infecte du bas vers le haut.  (les personnes de tous les groupes sociaux Ascendant)
  ZOMBIE_32 = "ZOMBIE_32", // Qui infecte du bas vers le haut et du haut vers le bas toutes personnes qui à 32 ans et plus.  (de tout les  groupes social Ascendant et Descendant)
  ZOMBIE_C = "ZOMBIE_C", // Qui infecte une personne sur 2 dans un groupe social (mais pas les groupes sociaux  en contact Ascendant ou Descendant)
  ZOMBIE_U = "ZOMBIE_U" // Qui infecte seulement la personne racine la plus Ascendante (La personne la plus haute de tous les cercles sociaux)
}
export enum EVaccine {
  A1, // vs A & 32
  B1, // vs B & C
  U // vs all + immune
}

export interface Vaccine {
  type: EVaccine;
  canApply: (p: Person) => boolean;
  apply: VaccineApplyFunction
}

export type Condition = (person: Person) => boolean;

export type VaccineApplyFunction = (person: Person) => void;
