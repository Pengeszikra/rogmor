export const leveling = (level, mod = 0.5, pow = 4, madd = 2) => Math.round(
  mod * Math.pow(level, pow) + (madd * level)
);

export const rnd = dice => dice * Math.random() | 0;

export const improved = ( attribute = 1, percent = 0.2 ) => (attribute + (Math.random() * percent * attribute)) | 0;

export const shuffle = () => Math.random() > 0.5 ? 1 : -1;