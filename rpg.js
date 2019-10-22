export const leveling = (level, mod = 0.5, pow = 4, madd = 2) => Math.round(
  mod * Math.pow(level, pow) + (madd * level)
);

export const rnd = dice => dice * Math.random() | 0;