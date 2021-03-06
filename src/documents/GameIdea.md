> kiindulás: vannak régi képek UI elemekről, 1 térkép, 100 karakter kép és egy tucat tárgy, ebből a felállásból kellene egy minnél ütősebb játékot létrehozni, ahol számos problémát le lehet kódolni a lehető leg cleanebb módszerrel.


## célok:
- könnyen alakítható moduláris GUI felület
  - modulokból összelegózható, letisztult kapcsolatokkal
- fast image load under PWA - preload phase no problem
- [slice 9 grid] (http://snapbuilder.com/code_snippet_generator/border_image_generator)
- [sprite sheet](https://www.codeandweb.com/free-sprite-sheet-packer)
- egyszerű játék a játékban megvalósítás minél letisztultabb kódolással


## role play game rules:

main abilities:
  - Physique
  - Reaction
  - Soul

main properities:
  - stamina
  - willpower

profession
  - level 
  - type
  - (option) combine multi profession

## játék menet

- Mennyi karaktert irányítson a játékos ?

5 karakter / autó csata

## hero dataset

```jsx
const hero = {
  level: { base, boost, curse },
  profession: { base, boost, curse },
  physique: { base, boost, curse },
  reaction: { base, boost, curse },
  soul: { base, boost, curse },
  stamina: { base, boost, curse },
  willpower: { base, boost, curse },
}

maxStamina = calculateStamina(hero) = {
}

maxWillpower = calculateWillpower(hero)
```

# Anomaly the interesting parameter of character

Az anomália mint érték bizonyos határig megfelelő profizmusoknál előny lehet, 
de hajlamosíthat a betegségekre, gyengíti az állóképességet és az akaraterőt,
szóval egyszerre buff és debuff. 

# Fight 6 vs 6 vagy 4 vs 4


# leveling <http://howtomakeanrpg.com/a/how-to-make-an-rpg-levels.html>

```jsx 
ll = (range = 10, mod = 0.5, pow = 4, add) => {
const leveling = (level, mod, ppp, add = 2 * level) => Math.round(
  mod * (level**ppp) + add
);

return Array.from({length:range}, (_, level) => add 
   ?  leveling(level, mod, pow, add).toLocaleString() 
   :  leveling(level, mod, pow).toLocaleString()
).join('\n')

}
```
