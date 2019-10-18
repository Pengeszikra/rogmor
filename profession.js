export default () => {
  const professions = [
    { profession:'Fighter',     physique: 5, reaction: 5, soul: 5 },
    { profession:'Clerick',     physique: 5, reaction: 5, soul: 5 },
    { profession:'Paladin',     physique: 5, reaction: 5, soul: 5 },
    { profession:'Knight',      physique: 5, reaction: 5, soul: 5 },
    { profession:'Assasin',     physique: 5, reaction: 5, soul: 5 },
    { profession:'Rogue',       physique: 5, reaction: 5, soul: 5 },
    { profession:'Mage',        physique: 5, reaction: 5, soul: 5 },
    { profession:'Captain',     physique: 5, reaction: 5, soul: 5 },
    { profession:'Noble',       physique: 5, reaction: 5, soul: 5 },
    { profession:'Head hunter', physique: 5, reaction: 5, soul: 5 },
    { profession:'Witch',       physique: 5, reaction: 5, soul: 5 },
    { profession:'Valkur',      physique: 5, reaction: 5, soul: 5 },
    { profession:'Guard',       physique: 5, reaction: 5, soul: 5 },
    { profession:'Gladiator',   physique: 5, reaction: 5, soul: 5 },
  ];  
  const profession = professions[professions.length * Math.random() |0];
  return ({...profession, level: 1});
}