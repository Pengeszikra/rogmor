export const leveling = (level, mod = 0.5, pow = 4, madd = 2) => Math.round(
  mod * Math.pow(level, pow) + (madd * level)
);

export const rnd = dice => dice * Math.random() | 0;

export const dice = roll => rnd(roll - 1) + 1;

// export const improved = ( attribute = 1, percent = 0.2 ) => (attribute + (Math.random() * percent * attribute)) | 0;
export const improved = ( attribute = 1 ) => attribute * 1.15 | 0;

export const shuffle = _ => Math.random() > 0.5 ? 1 : -1;

export const pickOne = arr => arr[rnd(arr.length)];

export const uid =  _ => Math.random().toString(32).slice(-8);

export const amount = n => Array(n).fill().map((_, index) => index);