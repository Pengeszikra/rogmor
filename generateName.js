export default (sour = 'proedmorainowerialaenderomanulnivosudanterill') => {    
  const name = Array.from({length:1+Math.random()*4|0}, (s=sour.length*Math.random()|0) => sour.slice(s, s + 2 + (3*Math.random()|0))).join('');
  const [capital, ...rest] = name;
  return [capital.toUpperCase(),...rest].join('');
}