export const leveling = (level, mod = 0.5, pow = 4, add = 2 * level) => Math.round(
  mod * Math.pow(level, pow) + add
);