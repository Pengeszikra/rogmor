export default (sour = 'proedmorainowerialaenderomanulnivosudanterill') => {    
  const name = Array.from({length:2+Math.random()*3|0}, (s=sour.length*Math.random()|0) => sour.slice(s, s + 2 + (3*Math.random()|0))).join('');
  const [capital, ...rest] = name;
  return [capital.toUpperCase(),...rest].join('');
}