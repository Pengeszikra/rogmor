import generateName from "./generateName";
import profession from "./profession";

export const heroFactory = (heroId, lvl = 1) => ({heroId, name: generateName(), ...profession(lvl)});
