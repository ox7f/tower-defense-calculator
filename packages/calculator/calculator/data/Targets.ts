import { NewTarget } from '../model';

export const Dummy_Stage_1 = {
  name: "Dummy 1",
  health: 2100000,
  criticalResistance: 0,
  duration: 30
} as NewTarget;

export const Dummy_Stage_2 = {
  name: "Dummy 2",
  health: 5300000,
  criticalResistance: 0,
  duration: 60
} as NewTarget;

export const Dummy_Stage_3 = {
  name: "Dummy 3",
  health: 86400000,
  criticalResistance: 0,
  duration: 90
} as NewTarget;

export const Dummy_Stage_4 = {
  name: "Dummy 4",
  health: 86400000,
  criticalResistance: 1,
  duration: 120
} as NewTarget;

export const Dummy_Stage_5 = {
  name: "Dummy 5",
  health: 116000000,
  criticalResistance: 0,
  duration: 150
} as NewTarget;

export const Dummy_Stage_6 = {
  name: "Dummy 6",
  health: 116000000,
  criticalResistance: 1.4,
  duration: 180
} as NewTarget;

export const Targets = [
  Dummy_Stage_1,
  Dummy_Stage_2,
  Dummy_Stage_3,
  Dummy_Stage_4,
  Dummy_Stage_5,
  Dummy_Stage_6
] as NewTarget[];
