import generateName from "./src/rpg/generateName";
import profession from "./src/rpg/profession";

export const heroFactory = (heroId, lvl = 1) => ({heroId, name: generateName(), ...profession(lvl)});
